/* eslint-disable no-console */
import { writeFileSync } from "node:fs"
import { components } from "./components"
import { format } from "./utils/format"

function generateMarkdown(nodes: unknown[]): string {
  return nodes
    .map((node) => {
      if (typeof node === "string") {
        const key = node as keyof typeof components
        return components[key] ? components[key]() : node
      }

      if (!Array.isArray(node) && !components[node as keyof typeof components])
        return ""

      const [type, options = {}, children = []] = node as [string, any, unknown[]]
      const key = type as keyof typeof components
      const renderFunction = components[key]

      if (renderFunction) {
        if (key === "list") {
          const listChildren: string[] = children.map((child: any) => generateMarkdown([child]))
          return (renderFunction as (items: string[], options?: any) => string)(listChildren, options)
        }

        const hasChildren = renderFunction.length > 1
        return hasChildren
          ? (renderFunction as (content: string, options?: any) => string)(generateMarkdown(children), options)
          : renderFunction(options)
      }

      return generateMarkdown(children)
    })
    .join("")
};

async function main(): Promise<void> {
  const markdown = generateMarkdown([
    [
      "html",
      {
        as: "h1",
        id: "home",
        style: {
          textAlign: "center",
        },
      },
      [
        [
          "br",
          {
            prefixNewLine: false,
          },
        ],
        [
          "image",
          {
            src: "https://raw.githubusercontent.com/please-readme/please-readme/main/assets/logo.svg",
            alt: "Please Readme",
            to: "#home",
            type: "html",
          },
        ],
        "br",
        "Please Readme",
        [
          "br",
          {
            appendNewLine: false,
          },
        ],
      ],
    ],
    [
      "html",
      {
        as: "h4",
        style: {
          textAlign: "center",
        },
      },
      [
        "An easy-to-use Readme generator that quickly creates well-structured and ",
        [
          "link",
          {
            label: "professional",
            to: "#",
            type: "html",
          },
        ],
        " README files for your projects.",
      ],
    ],
    "b2t",
    [
      "nav",
      {
        links: [
          {
            label: "Home",
            to: "#home",
          },
          {
            label: "Features",
            to: "#features",
          },
          {
            label: "Usage",
            to: "#usage",
          },
          {
            label: "Installation",
            to: "#installation",
          },
          {
            label: "Configuration",
            to: "#configuration",
          },
          {
            label: "Contributing",
            to: "#contributing",
          },
          {
            label: "License",
            to: "#license",
          },
        ],
        type: "html",
      },
    ],
    "b2t",
    [
      "list",
      {},
      [
        "hello",
        [
          "link",
          {
            label: "hello link",
            to: "#",
            type: "markdown",
          },
        ],
        "hello again",
      ],
    ],
    "br",
    [
      "contributors",
      {
        repository: "quedevstudios/please-readme",
      },
    ],
  ])

  console.log(markdown)

  const formattedMarkdown = await format(markdown)

  console.log(`\n----------------------------------------\n`)
  console.log(formattedMarkdown)

  writeFileSync("test.md", formattedMarkdown)
}

main()
