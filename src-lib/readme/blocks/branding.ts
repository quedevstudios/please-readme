export interface BrandingStyle {
  align?: string
  image?: {
    width?: string
    height?: string
  }
}

export interface BrandingOptions {
  anchor?: string
  image?: string
  imageAlt?: string
  imageHref?: string
  name?: string
  style?: BrandingStyle
}

export function createBranding(options?: BrandingOptions): string | undefined {
  const {
    anchor = "home",
    style = {
      align: "center",
      image: {
        width: "200px",
        height: "auto",
      },
    },
  } = options || {}

  const img = options?.image && options?.imageAlt
    ? `<img src="${options.image}" alt="${options.imageAlt}" width="${style.image?.width}" height="${style.image?.height}"/>`
    : undefined
  const link = options?.image && options?.imageHref ? `<a href="${options.imageHref}">\n    ${img}\n  </a>` : undefined
  const name = options?.name || undefined

  if (!img && !name) {
    return undefined
  }

  let content = `<h1 id="${anchor}" align="${style?.align}">\n`
  if (link)
    content += `  <br>\n  ${link}\n`
  else if (img)
    content += `  <br>\n  ${img}\n`
  if (name)
    content += `  <br>\n  ${name}\n`
  content += `  <br>\n</h1>`

  return content
}
