import { camelToKebab } from "../utils/transform"

export interface NavLink {
  label?: string
  to?: string
}

export interface NavOptions {
  links?: NavLink[]
  type?: "html" | "markdown"
  as?: "p"
  style?: Partial<HTMLElement["style"]>
}

export function renderNav(options?: NavOptions): string {
  const { links = [], type = "markdown", as = "p", style = { textAlign: "center" } } = options ?? {}

  if (links.length === 0) {
    return ""
  }

  if (type === "html") {
    const linkItems = links.map(({ label = "Label", to = "https://url-link" }) => {
      const hrefAttr = `href="${to}"`

      return `<a ${hrefAttr}>${label}</a>`
    }).join(" - \n  ")

    const styleAttr = style ? `style="${Object.entries(style).map(([key, value]) => `${camelToKebab(key)}: ${value}`).join("; ")}"` : ""
    const tagWithAttr = [as, styleAttr].filter(Boolean).join(" ")

    return `<${tagWithAttr}>\n  ${linkItems}\n</${as}>\n\n`
  }

  const linkItems = links.map(({ label = "Label", to = "https://url-link" }) => `[${label}](${to})`).join(" - \n")

  return `${linkItems}\n\n`
}
