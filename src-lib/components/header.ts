export interface HeaderLinks {
  label: string
  url: string
}

export interface HeaderOptions {
  logo: string
  logoAlt: string
  title: string
  description: string
  links: HeaderLinks[]
}

export function createHeader(options: HeaderOptions): string {
  const logo = `<a href="${options.logo}"><img src="${options.logo}" alt="${options.logoAlt}" width="80" height="80"></a>`
  const title = `<h3 align="center">${options.title}</h3>`
  const description = `<p align="center">${options.description}</p>`
  const links = options.links.map(link => `<a href="${link.url}">${link.label}</a>`).join("\n&middot;\n")
  const linksWrapper = `<p align="center">\n${links}\n</p>`
  const header = `<div align="center">\n${logo}\n${title}\n${description}\n${linksWrapper}\n</div>`

  return header
}
