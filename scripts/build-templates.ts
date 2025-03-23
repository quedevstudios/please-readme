import { AetherBytes } from "aether-bytes"

const SOURCE_DIR = "templates"
const DESTINATION_DIR = "templates"

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
aetherBytes.on("complete", (data) => {
  console.info(`${data.message}: File ${data.output} written`)
})

console.log(`Building templates from ${SOURCE_DIR} to ${DESTINATION_DIR}/index.ts...`)
await aetherBytes.load(SOURCE_DIR, {
  excludeExt: ["ts"],
})
await aetherBytes.write(DESTINATION_DIR)
