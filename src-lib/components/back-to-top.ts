import { camelToKebab } from "../utils/transform"

export interface BackToTopOptions {
  label?: string
  id?: string
  style?: Partial<HTMLElement["style"]>
}

export function renderBackToTopAnchor(options?: BackToTopOptions): string {
  const { id = "home" } = options ?? {}

  return `<a id="${id}"></a>\n\n`
}

export function renderBackToTop(options?: BackToTopOptions): string {
  const { label = "Back to top", id = "home", style = { textAlign: "right" } } = options ?? {}

  const styleAttr = `style="${Object.entries(style).map(([key, value]) => `${camelToKebab(key)}: ${value}`).join("; ")}"`

  return `<p ${styleAttr}>(<a href="#${id}">${label}</a>)</p>\n\n`
}
