import type { BrandingOptions } from "./blocks/branding"
import type { DescriptionOptions } from "./blocks/description"
import type { NavOptions } from "./blocks/nav"
import type { ScreenshotsOptions } from "./blocks/screenshots"
import type { ShieldsOptions } from "./blocks/shields"
import { writeFileSync } from "node:fs"
import { createBranding } from "./blocks/branding"
import { createDescription } from "./blocks/description"
import { createNav } from "./blocks/nav"
import { createScreenshots } from "./blocks/screenshots"
import { createShields } from "./blocks/shields"

export interface ReadMeOptions {
  branding?: BrandingOptions
  description?: DescriptionOptions
  shields?: ShieldsOptions
  nav?: NavOptions
  screenshots?: ScreenshotsOptions
}

export function createReadMe(options?: ReadMeOptions): string {
  const blocks: string[] = []

  // Header

  const branding = createBranding(options?.branding)

  if (branding) {
    blocks.push(branding)
  }

  const description = createDescription(options?.description)

  if (description) {
    blocks.push(description)
  }

  const shields = createShields(options?.shields)

  if (shields) {
    blocks.push(shields)
  }

  const nav = createNav(options?.nav)

  if (nav) {
    blocks.push(nav)
  }

  // Content

  const screenshots = createScreenshots(options?.screenshots)

  if (screenshots) {
    blocks.push(screenshots.labels)
  }

  // Resources

  if (screenshots) {
    blocks.push(screenshots.resources)
  }

  return blocks.join("\n\n")
}

const markdown = createReadMe({
  branding: {
    image: "https://raw.githubusercontent.com/amitmerchant1990/electron-markdownify/master/app/img/markdownify.png", // "/.github/media/branding.png",
    imageAlt: "please-readme",
    imageHref: "https://github.com/quedevstudios/please-readme",
    name: "Please Readme",
  },
  description: {
    markdown: "An easy-to-use Readme generator that quickly creates well-structured and professional README files for your projects.",
  },
  shields: {
    items: [
      {
        label: "gitter-1",
        image: "https://badge.fury.io/js/electron-markdownify.svg",
        url: "https://badge.fury.io/js/electron-markdownify",
      },
      {
        label: "gitter-2",
        image: "https://badges.gitter.im/amitmerchant1990/electron-markdownify.svg",
        url: "https://gitter.im/amitmerchant1990/electron-markdownify",
      },
      {
        label: "gitter-3",
        image: "https://img.shields.io/badge/SayThanks.io-%E2%98%BC-1EAEDB.svg",
        url: "https://saythanks.io/to/bullredeyes@gmail.com",
      },
      {
        label: "gitter-4",
        image: "https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&amp;style=flat",
        url: "https://www.paypal.me/AmitMerchant",
      },
    ],
  },
  nav: {
    links: "auto",
    // links: [
    //   { label: "Key Features", href: "#key-features" },
    //   { label: "How To Use", href: "#how-to-use" },
    //   { label: "Download", href: "#download" },
    //   { label: "FAQ", href: "#faq" },
    //   { label: "Contributing", href: "#contributing" },
    //   { label: "Support", href: "#support" },
    //   { label: "Credits", href: "#credits" },
    //   { label: "Related", href: "#related" },
    //   { label: "License", href: "#license" },
    // ],
  },
  screenshots: {
    items: [{
      label: "Screenshot-1",
      image: "https://raw.githubusercontent.com/amitmerchant1990/electron-markdownify/master/app/img/markdownify.gif",
    }],
  },
})

console.warn(markdown)

writeFileSync("./sample.md", markdown, "utf-8")
