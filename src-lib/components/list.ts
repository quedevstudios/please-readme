import { camelToKebab } from "../utils/transform"

export interface ListOptions {
  type?: "html" | "markdown"
  dir?: "col" | "row"
  style?: Partial<HTMLElement["style"]>
}

export function renderList(children: string[] = [], options?: ListOptions): string {
  const { type = "markdown", dir = "col", style = {} } = options ?? {}

  const styleAttr = style
    ? `style="${Object.entries(style)
      .map(([key, value]) => `${camelToKebab(key)}: ${value}`)
      .join("; ")}"`
    : ""

  if (children.length === 0) {
    if (type === "html") {
      const tag = dir === "row" ? "ul" : "ol"
      return `<${tag} ${styleAttr}></${tag}>`
    }
    return ""
  }

  if (type === "html") {
    const tag = dir === "row" ? "ul" : "ol"
    const listItems = children.map(child => `<li>${child}</li>`).join("\n")
    return `<${tag} ${styleAttr}>\n${listItems}\n</${tag}>`
  }

  const listMarker = dir === "row" ? "-" : "1."
  const listItems = children.map(child => `${listMarker} ${child}`).join("\n")

  return listItems
}
