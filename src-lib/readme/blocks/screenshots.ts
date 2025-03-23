export interface Screenshot {
  label: string
  image: string
  url?: string
}

// export interface ScreenshotsStyle {}

export interface ScreenshotsOptions {
  items?: Screenshot[]
  // style?: ScreenshotsStyle
}

export interface Screenshots {
  labels: string
  resources: string
}

function createScreenshot(item: Screenshot): Screenshot {
  const cleanLabel = item.label.toLowerCase()

  const url = item.url ? `[${cleanLabel}-url]: ${item.url}` : undefined
  const image = `[${cleanLabel}-image]: ${item.image}`
  const label = url
    ? `[![${item.label}][${cleanLabel}-image]][${cleanLabel}-url]`
    : `![${item.label}][${cleanLabel}-image]`

  return {
    label,
    image,
    url,
  }
}

export function createScreenshots(options?: ScreenshotsOptions): Screenshots | undefined {
  if (!options?.items || !Array.isArray(options?.items) || options?.items.length === 0) {
    return undefined
  }

  // const {
  //   style = {},
  // } = options || {}

  const screenshotsArray: Screenshot[] = []

  for (const item of options.items) {
    screenshotsArray.push(createScreenshot(item))
  }

  const labels = `${screenshotsArray.map(screenshot => screenshot.label).join("\n")}`

  const resources = screenshotsArray.map(
    screenshot => screenshot.url
      ? `${screenshot.image}\n${screenshot.url}`
      : `${screenshot.image}`,
  ).join("\n")

  return {
    labels,
    resources,
  }
}
