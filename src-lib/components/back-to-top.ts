export interface BackToTopOptions {
  id: string
  text: string
  style: {
    align: string
  }
}

export interface BackToTop {
  anchor: string
  button: string
}

export function createBackToTop(options: BackToTopOptions): BackToTop {
  const anchor = `<a id="${options.id}"></a>`
  const button = `<p align="${options.style?.align}">(<a href="#${options.id}">${options.text}</a>)</p>`

  return {
    anchor,
    button,
  }
}
