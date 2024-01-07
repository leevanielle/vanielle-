import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://vanielle.lee/", // replace this with your deployed domain
  author: "Vanielle LEE",
  desc: "Vanielle LEE's personal blog",
  title: "Vanielle LEE",
  ogImage: "astropaper-og.jpg",
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
    name: "LinkedIn",
    href: "https://github.com/leevanielle",
    linkTitle: `${SITE.title} on LinkedIn`,
    active: true,
    target: true,
  },
  {
    name: "GitLab",
    href: "https://gitlab.com/leevanielle",
    linkTitle: `${SITE.title} on GitLab`,
    active: true,
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
