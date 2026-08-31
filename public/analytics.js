(() => {
  const config = document.querySelector("[data-analytics-consent]");
  const measurementId = config?.dataset.measurementId;
  if (!measurementId || window.__vanielleAnalyticsInstalled) return;
  window.__vanielleAnalyticsInstalled = true;

  const consentKey = "vanielle_analytics_consent";
  const granted = "granted";
  const denied = "denied";
  let googleTagConfigured = false;
  let googleTagLoaded = false;
  let lastLocation = "";
  let previousLocation = document.referrer;
  const reportedIssues = new Set();
  const reportedNotFoundLocations = new Set();

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function () {
      window.dataLayer.push(arguments);
    };

  window.gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    functionality_storage: "granted",
    security_storage: "granted",
    wait_for_update: 500,
  });

  const getConsent = () => {
    try {
      return localStorage.getItem(consentKey);
    } catch {
      return null;
    }
  };

  const setConsent = value => {
    try {
      localStorage.setItem(consentKey, value);
    } catch {
      // Tracking still respects this page-level choice if storage is blocked.
    }
  };

  const updatePreferenceStatus = () => {
    const value = getConsent();
    document.querySelectorAll("[data-analytics-status]").forEach(node => {
      node.textContent =
        value === granted
          ? "Analytics is currently allowed."
          : value === denied
          ? "Analytics is currently declined."
          : "No analytics choice has been saved yet.";
    });
  };

  const setBannerVisibility = visible => {
    const banner = document.querySelector("[data-analytics-consent]");
    if (banner) banner.hidden = !visible;
  };

  const removeAnalyticsCookies = () => {
    document.cookie.split(";").forEach(cookie => {
      const name = cookie.split("=")[0]?.trim();
      if (!name?.startsWith("_ga")) return;
      document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.${window.location.hostname}; SameSite=Lax`;
    });
  };

  const loadGoogleAnalytics = () => {
    if (!googleTagConfigured) {
      googleTagConfigured = true;
      window.gtag("consent", "update", {
        analytics_storage: "granted",
      });
      window.gtag("js", new Date());
      window.gtag("config", measurementId, {
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
        send_page_view: false,
      });
    }

    if (
      googleTagLoaded ||
      document.querySelector("script[data-vanielle-google-tag]")
    ) {
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.dataset.vanielleGoogleTag = "";
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
      measurementId
    )}`;
    script.addEventListener("load", () => {
      googleTagLoaded = true;
    });
    script.addEventListener("error", () => {
      script.remove();
    });
    document.head.appendChild(script);
  };

  const sendPageView = () => {
    if (getConsent() !== granted) return;
    loadGoogleAnalytics();

    const currentLocation = window.location.href;
    if (currentLocation === lastLocation) return;

    window.gtag("event", "page_view", {
      page_title: document.title,
      page_location: currentLocation,
      page_path: `${window.location.pathname}${window.location.search}`,
      page_referrer: previousLocation,
    });
    previousLocation = currentLocation;
    lastLocation = currentLocation;
  };

  const sendEvent = (eventName, properties = {}) => {
    if (getConsent() !== granted) return;
    if (!/^[a-z][a-z0-9_]{0,39}$/.test(eventName)) return;
    loadGoogleAnalytics();
    window.gtag("event", eventName, properties);
  };

  const classifyAssetOrigin = source => {
    if (!source) return "unknown";
    try {
      return new URL(source, window.location.href).origin ===
        window.location.origin
        ? "same_origin"
        : "third_party";
    } catch {
      return "unknown";
    }
  };

  const reportTechnicalIssue = (issueType, details = {}) => {
    if (getConsent() !== granted) return;
    const properties = {
      issue_type: issueType,
      page_path: window.location.pathname,
      error_name: details.errorName || "unknown",
      asset_type: details.assetType || "not_applicable",
      asset_origin: details.assetOrigin || "not_applicable",
    };
    const issueKey = Object.values(properties).join("|");
    if (reportedIssues.has(issueKey) || reportedIssues.size >= 20) return;
    reportedIssues.add(issueKey);
    sendEvent("site_technical_error", properties);
  };

  window.addEventListener(
    "error",
    event => {
      const target = event.target;
      if (target instanceof HTMLElement && !(event instanceof ErrorEvent)) {
        const source = target.currentSrc || target.src || target.href || "";
        reportTechnicalIssue("resource_load_error", {
          assetType: target.tagName.toLowerCase(),
          assetOrigin: classifyAssetOrigin(source),
        });
        return;
      }

      reportTechnicalIssue("javascript_error", {
        errorName:
          event instanceof ErrorEvent && event.error instanceof Error
            ? event.error.name.slice(0, 60)
            : "Error",
      });
    },
    true
  );

  window.addEventListener("unhandledrejection", event => {
    reportTechnicalIssue("unhandled_promise_rejection", {
      errorName:
        event.reason instanceof Error
          ? event.reason.name.slice(0, 60)
          : "NonErrorReason",
    });
  });

  const syncAnalytics = () => {
    const choice = getConsent();
    setBannerVisibility(choice !== granted && choice !== denied);
    updatePreferenceStatus();
    if (choice !== granted) return;

    const currentLocation = window.location.href;
    const currentReferrer = previousLocation;
    sendPageView();
    if (
      document.body.dataset.pageType === "not_found" &&
      !reportedNotFoundLocations.has(currentLocation)
    ) {
      reportedNotFoundLocations.add(currentLocation);
      sendEvent("page_not_found", {
        page_path: window.location.pathname,
        page_referrer: currentReferrer,
      });
    }
  };

  document.addEventListener("click", event => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    if (target.closest("[data-analytics-accept]")) {
      setConsent(granted);
      setBannerVisibility(false);
      updatePreferenceStatus();
      sendPageView();
      return;
    }

    if (target.closest("[data-analytics-decline]")) {
      setConsent(denied);
      window.gtag("consent", "update", {
        analytics_storage: "denied",
      });
      removeAnalyticsCookies();
      setBannerVisibility(false);
      updatePreferenceStatus();
      return;
    }

    if (target.closest("[data-analytics-preferences]")) {
      setBannerVisibility(true);
      return;
    }

    const link = target.closest("a[href]");
    if (!(link instanceof HTMLAnchorElement)) return;

    const destination = new URL(link.href, window.location.href);
    const eventName = link.dataset.analyticsEvent;
    const properties = {
      link_text: (link.textContent || "")
        .trim()
        .replace(/\s+/g, " ")
        .slice(0, 100),
      link_url: destination.href,
      link_domain: destination.hostname,
      link_location:
        link.dataset.analyticsLocation ||
        link.closest("section[id]")?.id ||
        "page",
      link_label:
        (link.dataset.analyticsLabel || "").slice(0, 100) || undefined,
    };

    if (eventName) {
      sendEvent(eventName, properties);
    } else if (
      destination.protocol.startsWith("http") &&
      destination.hostname !== window.location.hostname
    ) {
      sendEvent("outbound_link_clicked", properties);
    }
  });

  window.addEventListener("vanielle:analytics", event => {
    const detail = event.detail || {};
    sendEvent(detail.event, detail.properties);
  });

  document.addEventListener("astro:page-load", syncAnalytics);
  syncAnalytics();
})();
