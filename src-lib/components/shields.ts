export interface Shield {
  label: string
  image: string
  url: string
}

export interface ShieldsOptions {
  input: Shield[]
  style: {
    dir: "row" | "col"
  }
}

export interface Shields {
  labels: string
  imagesWithUrl: string
}

function createShield(input: Shield): Shield {
  const cleanLabel = input.label.toLowerCase()

  const url = `[${cleanLabel}-url]: ${input.url}`
  const image = `[${cleanLabel}-shield]: ${input.image}`
  const label = `[![${input.label}][${cleanLabel}-shield]][${cleanLabel}-url]`

  return {
    label,
    image,
    url,
  }
}

export function createShields(options: ShieldsOptions): Shields {
  const shieldsArray: Shield[] = []

  for (const input of options.input) {
    shieldsArray.push(createShield(input))
  }

  let labels

  if (options.style.dir === "row") {
    labels = shieldsArray.map(shield => shield.label).join("\n")
  }
  else {
    labels = shieldsArray.map(shield => `* ${shield.label}`).join("\n")
  }

  const imagesWithUrl = shieldsArray.map(shield => `${shield.image}\n${shield.url}`).join("\n")

  return {
    labels,
    imagesWithUrl,
  }
}
