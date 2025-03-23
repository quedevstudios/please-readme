export interface Shield {
  label: string
  image: string
  url?: string
}

export interface ShieldsStyle {
  align?: string
  dir?: "row" | "col"
}

export interface ShieldsOptions {
  items?: Shield[]
  style?: ShieldsStyle
}

export interface Shields {
  labels: string
}

function createShield(item: Shield): string {
  const imgTag = `<img src="${item.image}" alt="${item.label}">`
  return item.url ? `<a href="${item.url}">\n    ${imgTag}\n  </a>` : imgTag
}

export function createShields(options?: ShieldsOptions): string | undefined {
  if (!options?.items || !Array.isArray(options.items) || options.items.length === 0) {
    return undefined
  }

  const { style = { align: "center", dir: "row" } } = options
  const shieldsArray = options.items.map(createShield)

  let labels
  if (style.dir === "row") {
    labels = `<p align="${style.align}">
  ${shieldsArray.join("\n  ")}
</p>`
  }
  else {
    labels = shieldsArray.map(shield => `<p>${shield}</p>`).join("\n")
  }

  return labels
}
