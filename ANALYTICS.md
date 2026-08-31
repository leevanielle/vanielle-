# Vanielle.io tracking plan

## Overview

- Tool: Google Analytics 4 via the Google tag
- Scope: site usage and acquisition only
- Consent: analytics loads only after the visitor selects **Allow analytics**
- Privacy defaults: advertising storage, ad personalization, and Google Signals are disabled
- Configuration: `PUBLIC_GA_MEASUREMENT_ID` is supplied as a GitHub Actions repository variable
- Last updated: 31 August 2026

## Questions this answers

1. How many visits and page views does the site receive?
2. Which pages and articles attract attention?
3. Which referrers, social posts, and tagged campaigns bring visitors?
4. Do visitors continue to the book, advisory booking, newsletter, and social profiles?
5. Which countries, devices, and browsers make up the audience?
6. Are visitors encountering missing pages, failed signups, or client-side technical errors?

## Events

| Event name | Description | Properties | Trigger |
| --- | --- | --- | --- |
| `page_view` | A consented page view | `page_title`, `page_location`, `page_path`, `page_referrer` | Initial load and Astro client-side navigation |
| `article_opened` | A homepage article card is selected | Standard link properties, `link_label` | Homepage article click |
| `book_link_clicked` | The Amazon book link is selected | Standard link properties | Homepage book CTA click |
| `advisory_booking_clicked` | An advisory booking option is selected | Standard link properties, `link_label` | 30- or 60-minute booking click |
| `newsletter_signup_completed` | The newsletter API confirms a subscription | `form_variant` | Successful API response only |
| `newsletter_signup_failed` | A newsletter request fails after submission | `form_variant`, `failure_type` | Failed or invalid API response |
| `social_profile_clicked` | A social profile is selected | Standard link properties, `link_label` | Homepage social-card click |
| `company_site_clicked` | The OdeCloud link is selected | Standard link properties | Homepage company link click |
| `press_feature_clicked` | The Forbes feature is selected | Standard link properties | Homepage press link click |
| `outbound_link_clicked` | Any other external link is selected | Standard link properties | External link click |
| `page_not_found` | A visitor reaches the site's 404 page | `page_path`, `page_referrer` | Consented 404 page view |
| `site_technical_error` | A browser reports an uncaught JavaScript, resource-load, or unhandled promise error | `issue_type`, `page_path`, `error_name`, `asset_type`, `asset_origin` | First occurrence of a technical issue signature per page load |

Standard link properties are `link_text`, `link_url`, `link_domain`, `link_location`, and optional `link_label`. No email address or form value is included.

Technical-error events deliberately omit messages, stack traces, query strings, and full asset URLs. They are useful for identifying patterns, but cannot report a hard browser or device crash that prevents JavaScript from running.

## Acquisition and UTM convention

GA4 automatically groups referrers and campaign parameters. For links shared intentionally, use lowercase values:

```text
https://vanielle.io/?utm_source=linkedin&utm_medium=social&utm_campaign=book_launch&utm_content=founder_story
```

- `utm_source`: platform or partner, such as `linkedin`, `x`, or `newsletter`
- `utm_medium`: channel, such as `social`, `email`, or `referral`
- `utm_campaign`: initiative, such as `book_launch`
- `utm_content`: post or CTA variation, such as `founder_story`

## Reports to use

- **Reports → Acquisition → Traffic acquisition** for source and medium
- **Reports → Engagement → Pages and screens** for page and article views
- **Reports → Engagement → Events** for book, newsletter, advisory, and social actions
- **Reports → User attributes → Demographic details** for country and city
- **Reports → Tech → Tech details** for device category, browser, and operating system
- **Realtime** for release validation

## Weekly report coverage

The scheduled weekly report compares the latest completed seven days with the preceding seven days. It includes audience size, views, sessions, acquisition channels and referrers, campaigns, landing pages, top content, countries and cities, device and browser mix, engagement, tracked interactions, and recorded site issues. Interpretations must distinguish recorded zeroes from unavailable or still-processing data.

## Validation checklist

- Consent banner appears when no preference exists.
- Google’s tag is not requested before consent or after declining.
- One `page_view` fires per initial load and client-side route change after consent.
- Event properties contain no email addresses or newsletter form values.
- Error events contain no messages, stack traces, query strings, or full asset URLs.
- Key CTA events fire once per click.
- A synthetic error produces one deduplicated `site_technical_error` event after consent.
- The 404 page produces one `page_not_found` event after consent.
- UTM parameters appear in Traffic acquisition.
