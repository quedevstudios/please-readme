import { readdir } from "node:fs/promises"
import { join } from "node:path"
import { AetherBytes } from "aether-bytes"

const TEMPLATE_DIRS = ["templates/github", "templates/markdown"]

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
    console.info(`${data.message}: ${data.data}`)
  })
  aetherBytes.on("complete", (data) => {
    console.info(`${data.message}: File ${data.output} written`)
  })

  console.log(`Building templates from ${srcDir} to ${outputDir}/index.ts...`)
  await aetherBytes.load(srcDir, {
    excludeExt: ["ts"],
  })
  // await aetherBytes.compress()
  await aetherBytes.generate(outputDir, {
    filename: name,
  })
}

(async () => {
  try {
    for (const dir of TEMPLATE_DIRS) {
      const templates = await readdir(dir)

      for (const library of templates) {
        console.log(`Building ${library}...`)

        await convert(library, join(dir, library), "templates/markdown")
      }
    }
  }
  catch (error) {
    console.error(error)
  }
})()
