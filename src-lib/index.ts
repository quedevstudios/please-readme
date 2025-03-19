import type { BackToTopOptions } from "./components/back-to-top"
import type { HeaderOptions } from "./components/header"
import type { ShieldsOptions } from "./components/shields"
import { writeFileSync } from "node:fs"
import { createBackToTop } from "./components/back-to-top"
import { createHeader } from "./components/header"
import { createShields } from "./components/shields"

export interface Options {
  repository: string
  backToTop: BackToTopOptions
  header: HeaderOptions
  shields: ShieldsOptions
}

const options: Options = {
  repository: "https://github.com/quedevstudios/please-readme", // extract fromm package.json or option (repository or if homepage is set to github)
  backToTop: {
    id: "readme-top",
    text: "back to top",
    style: {
      align: "right",
    },
  },
  header: {
    logo: "https://quedevstudios.com/emails/assets/logo-with-text.png",
    logoAlt: "QueDev Studios",
    title: "Please Readme", // extract from package.json or option
    description: "An easy-to-use Readme generator that quickly creates well-structured and professional README files for your projects.", // extract from package.json or option
    links: [
      {
        label: "View Demo",
        url: "/",
      },
      {
        label: "Report Bug",
        url: "/issues/new?labels=bug&template=bug-report---.md",
      },
      {
        label: "Request Feature",
        url: "/issues/new?labels=enhancement&template=feature-request---.md",
      },
    ],
  },
  shields: {
    input: [
      {
        label: "Contributors",
        image: "https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge",
        url: "https://github.com/othneildrew/Best-README-Template/graphs/contributors",
      },
      {
        label: "Forks",
        image: "https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge",
        url: "https://github.com/othneildrew/Best-README-Template/network/members",
      },
      {
        label: "Stars",
        image: "https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge",
        url: "https://github.com/othneildrew/Best-README-Template/stargazers",
      },
      {
        label: "Issues",
        image: "https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge",
        url: "https://github.com/othneildrew/Best-README-Template/issues",
      },
      {
        label: "License",
        image: "https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge",
        url: "https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt",
      },
    ],
    style: {
      dir: "row",
    },
  },
}

const backToTop = createBackToTop(options.backToTop)
const shields = createShields(options.shields)
const header = createHeader(options.header)

const document = `${backToTop.anchor}\n\n${shields.labels}\n\n${header}\n\n${shields.imagesWithUrl}`

writeFileSync("./test.md", document, { encoding: "utf-8" })
