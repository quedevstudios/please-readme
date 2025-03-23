export interface DescriptionStyle {
  align?: string
}

export interface DescriptionOptions {
  markdown?: string
  style?: DescriptionStyle
}

export function createDescription(options?: DescriptionOptions): string | undefined {
  const {
    style = {
      align: "center",
    },
  } = options || {}

  if (!options?.markdown) {
    return undefined
  }

  return `<h4 align="${style.align}">
  ${options?.markdown}
</h4>`
}
