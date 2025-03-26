import type { Options as FormatOptions } from "prettier"
import { format as prettierFormat } from "prettier"

export async function formatHtml(content: string, options?: FormatOptions): Promise<string> {
  return format(content, {
    parser: "html",
    ...options,
  })
}

export async function formatMarkdown(content: string, options?: FormatOptions): Promise<string> {
  return format(content, {
    parser: "markdown",
    ...options,
  })
}

export async function format(content: string, options?: FormatOptions): Promise<string> {
  const markdown = await prettierFormat(content, { ...options, parser: "markdown" })
  const html = await prettierFormat(markdown, { ...options, parser: "html" })

  return html

  // return markdown
}
