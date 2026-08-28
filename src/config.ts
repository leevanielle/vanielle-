import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://vanielle.io/",
  author: "Vanielle Lee",
  desc: "Vanielle Lee is an AI engineer, founder, OdeCloud CTO, and author of Emperors, Prophets, and Product Managers.",
  title: "Vanielle Lee",
  ogImage: "og.png",
  lightAndDarkMode: true,
  postPerPage: 3,
};

export const LOCALE = {
  lang: "en", // html lang code. Set this empty and default will be "en"
  langTag: ["en-EN"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/leevanielle",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
    target: true,
  },
  {
    name: "Twitter",
    href: "https://x.com/lee_vanielle",
    linkTitle: `${SITE.title} on X`,
    active: true,
    target: true,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/vanielle",
    linkTitle: `${SITE.title} on LinkedIn`,
    active: true,
    target: true,
  },
  {
    name: "GitLab",
    href: "https://gitlab.com/leevanielle",
    linkTitle: `${SITE.title} on GitLab`,
    active: false,
    target: true,
  },
  {
    name: "Discord",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Discord`,
    active: false,
    target: true,
  },
  {
    name: "Reddit",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Reddit`,
    active: false,
    target: true,
  },
  {
    name: "Telegram",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Telegram`,
    active: false,
    target: true,
  },
];
