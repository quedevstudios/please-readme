export interface BrOptions {
  prefixNewLine?: boolean
  appendNewLine?: boolean
}

export function renderBr(options?: BrOptions): string {
  const { prefixNewLine = true, appendNewLine = true } = options || {}

  return `${prefixNewLine ? "\n" : ""}<br>${appendNewLine ? "\n" : ""}`
}
