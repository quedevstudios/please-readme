/// <reference lib="dom" />
import { camelToKebab } from "../utils/transform"

export interface LinkOptions {
  label?: string
  to?: string
  type?: "html" | "markdown"
  as?: "a"
  style?: Partial<HTMLElement["style"]>
}

export function renderLink(options?: LinkOptions): string {
  const { label = "Label", to = "https://url-link", type = "markdown", as = "a", style } = options ?? {}

  if (type === "html") {
    const styleAttr = style ? `style="${Object.entries(style).map(([key, value]) => `${camelToKebab(key)}: ${value}`).join("; ")}"` : ""
    const hrefAttr = `href="${to}"`
    const tagWithAttr = [as, hrefAttr, styleAttr].filter(Boolean).join(" ")

    return `<${tagWithAttr}>${label}</${as}>`
  }

  return `[${label}](${to})`
}
