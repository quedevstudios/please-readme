export interface NavStyle {
  align?: string
}

export interface NavOptions {
  links?: {
    label: string
    href: string
  }[] | "auto"
  style?: NavStyle
}

export function createNav(options?: NavOptions): string | undefined {
  if (!options?.links || !Array.isArray(options?.links) || options?.links.length === 0) {
    return undefined
  }

  const {
    style = {
      align: "center",
    },
  } = options || {}

  return `<p align="${style?.align}">
${options?.links?.map(link => `  <a href="${link.href}">${link.label}</a>`).join(" • \n")}
</p>`
}
