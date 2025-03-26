/// <reference lib="dom" />
import { camelToKebab } from "../utils/transform"

export type HtmlAs =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"

export interface HtmlOptions {
  as?: HtmlAs
  id?: string
  style?: Partial<HTMLElement["style"]>
}

export function renderHtml(children?: string, options?: HtmlOptions): string {
  const { as = "p", id, style = { textAlign: "center" } } = options ?? {}

  const idAttr = id ? `id="${id}"` : ""
  const styleAttr = style ? `style="${Object.entries(style).map(([key, value]) => `${camelToKebab(key)}: ${value}`).join("; ")}"` : ""
  const tagWithAttr = [as, idAttr, styleAttr].filter(Boolean).join(" ")

  return `<${tagWithAttr}>\n${children}\n</${as}>\n\n`
}
