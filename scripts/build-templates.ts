import { exists, readdir, readFile } from "node:fs/promises"
import { join, parse } from "node:path"
import { AetherBytes } from "aether-bytes"

const TEMPLATE_DIR = "./templates"

async function convert(name: string, srcDir: string, outputDir: string): Promise<void> {
  const aetherBytes = new AetherBytes()

  aetherBytes.on("error", (data) => {
    console.error(data.message)
  })
  aetherBytes.on("loaded", (data) => {
    if (data.files === 0) {
      console.warn(`${data.message}: No files found`)
    }
    else {
      console.info(`${data.message}: ${data.files} files loaded`)
    }
  })
  aetherBytes.on("compression", (data) => {
    console.info(`${data.message}`)
  })
  aetherBytes.on("complete", (data) => {
    console.info(`${data.message}: File ${data.output} written`)
  })

  console.log(`Building templates from ${srcDir} to ${outputDir}/index.ts...`)
  await aetherBytes.load(srcDir, {
    excludeExt: ["json", "ts"],
    genTypes: false,
  })

  if (name === "license") {
    await aetherBytes.addExtra(async (entry) => {
      const { name } = parse(entry.path)
      const filepath = join(srcDir, `${name}.json`)

      if (!await exists(filepath)) {
        return
      }

      const jsonFile = await readFile(join(srcDir, `${name}.json`), "utf8")
      const json = JSON.parse(jsonFile)

      const url: string | undefined = json.crossRef?.find((ref: any) => ref.url.includes("opensource"))?.url || json.crossRef?.[0]?.url

      const extra: {
        deprecated?: boolean
        url?: string
        osiApproved?: boolean
      } = {
        deprecated: json.isDeprecatedLicenseId ?? undefined,
        url,
        osiApproved: json.isOsiApproved ?? undefined,
      }

      return extra
    })
  }

  await aetherBytes.compress()
  await aetherBytes.generate(outputDir, {
    indexFilename: name,
    exportHelpers: false,
    mergeFiles: true,
  })
}

(async () => {
  try {
    const templates = await readdir(TEMPLATE_DIR, { withFileTypes: true })

    for (const library of templates) {
      if (!library.isDirectory()) {
        continue
      }

      console.log(`Building ${library.name}...`)

      await convert(library.name, join(TEMPLATE_DIR, library.name), TEMPLATE_DIR)
    }
  }
  catch (error) {
    console.error(error)
  }
})()
