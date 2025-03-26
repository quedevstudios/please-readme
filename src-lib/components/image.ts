/// <reference lib="dom" />
import { camelToKebab } from "../utils/transform"

export interface ImageOptions {
  src?: string
  alt?: string
  to?: string
  type?: "html" | "markdown"
  as?: "a"
  id?: string
  style?: Partial<HTMLElement["style"]>
}

export function renderImage(options?: ImageOptions): string {
  const { src = "https://url-to-image", alt = "Image", to, type = "markdown", as = "a", id, style } = options ?? {}

  const imgTag = type === "html"
    ? `<img src="${src}" alt="${alt}">`
    : to
      ? `[![${alt}][${src}]](${to})`
      : `![${alt}](${src})`

  if (type === "html") {
    const idAttr = id ? `id="${id}"` : ""
    const styleAttr = style ? `style="${Object.entries(style).map(([key, value]) => `${camelToKebab(key)}: ${value}`).join("; ")}"` : ""
    const hrefAttr = to ? `href="${to}"` : ""
    const tagWithAttr = [as, idAttr, hrefAttr, styleAttr].filter(Boolean).join(" ")
    const content = to ? `<${tagWithAttr}>\n  ${imgTag}\n</${as}>` : imgTag

    return content
  }

  return imgTag
}
