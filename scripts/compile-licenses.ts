import { access, mkdir, readdir, readFile, writeFile } from "node:fs/promises"
import { join, parse } from "node:path"
import AdmZip from "adm-zip"
import fetch from "node-fetch"

const REPOSITORY = "spdx/license-list-data"
const LICENSE_DIR = "templates/license"
const TEMP_DIR = `${LICENSE_DIR}/.temp`
const TEMP_JSON_DIR = `${TEMP_DIR}/json`

interface GitHubResponse {
  name: string
  tag_name: string
  zipball_url: string
}

async function getLatestRelease(): Promise<GitHubResponse> {
  const apiUrl = `https://api.github.com/repos/${REPOSITORY}/releases/latest`
  const response = await fetch(apiUrl)
  if (!response.ok)
    throw new Error(`Failed to fetch release data: ${response.statusText}`)
  return (await response.json()) as GitHubResponse
}

async function fileExists(path: string): Promise<boolean> {
  try {
    await access(path)
    return true
  }
  catch {
    return false
  }
}

async function downloadFile(url: string, outputPath: string): Promise<void> {
  if (await fileExists(outputPath)) {
    console.log("- Newest version already downloaded.")
    return
  }

  const response = await fetch(url)
  if (!response.ok)
    throw new Error(`Failed to download file: ${response.statusText}`)

  const buffer = await response.arrayBuffer()
  await writeFile(outputPath, Buffer.from(buffer))
}

async function extractArchive(filePath: string, outputDir: string): Promise<void> {
  if (await fileExists(outputDir)) {
    console.log("- Archive already extracted.")
    return
  }

  if (filePath.endsWith(".zip")) {
    const zip = new AdmZip(filePath)
    const entries = zip.getEntries()

    const rootDir = entries.find(entry => entry.isDirectory && entry.entryName.endsWith("/"))?.entryName
    if (!rootDir)
      throw new Error("Root directory not found in ZIP")

    const jsonDirs = [`${rootDir}json/details`, `${rootDir}text/exceptions`]

    for (const entry of entries) {
      if (jsonDirs.some(dir => entry.entryName.startsWith(dir))) {
        const relativePath = entry.entryName.replace(rootDir, "")
        if (relativePath) {
          zip.extractEntryTo(entry, outputDir, false, true)
        }
      }
    }
  }
  else {
    throw new Error("Unsupported file format")
  }
}

async function mergeJsonFiles(jsonDir: string, outputFilepath: string): Promise<Record<string, any>> {
  try {
    const files = await readdir(jsonDir)
    const mergedData: Record<string, any> = {}

    await Promise.all(
      files.map(async (file) => {
        const { ext, name } = parse(file)

        if (ext === ".json") {
          const filePath = join(jsonDir, file)
          const content = await readFile(filePath, "utf8")
          const parsed = JSON.parse(content)

          // Get url from parsed. Can be found in crossRef[].url. Prefer 'opensource.org' if available.
          const url = parsed.crossRef?.find((ref: any) => ref.url.includes("opensource"))?.url || parsed.crossRef?.[0]?.url

          try {
            mergedData[name] = {
              deprecated: parsed.isDeprecatedLicenseId,
              name: parsed.name,
              url,
              osiApproved: parsed.isOsiApproved,
              text: parsed.licenseText,
            }
          }
          catch (error) {
            console.error(`Error parsing JSON in file ${file}:`, error)
          }
        }
      }),
    )

    await writeFile(outputFilepath, JSON.stringify(mergedData, null, 2), "utf8")
    console.log(`Merged JSON saved to ${outputFilepath}`)

    return mergedData
  }
  catch (error) {
    console.error("Error processing files:", error)
    return []
  }
}

function generateTypeScriptInterface(data: Record<string, any>, interfaceName = "SPDXLicense"): string {
  const allKeys = new Set<string>()

  // Collect all keys across all objects in mergedData
  Object.values(data).forEach((entry) => {
    if (typeof entry === "object" && entry !== null) {
      Object.keys(entry).forEach(key => allKeys.add(key))
    }
  })

  function determineType(values: any[]): string {
    const types = new Set<string>()

    values.forEach((value) => {
      if (Array.isArray(value)) {
        const arrayType = determineType(value)
        types.add(`${arrayType}[]`)
      }
      else if (value && typeof value === "object") {
        types.add("Record<string, any>")
      }
      else {
        types.add(typeof value)
      }
    })

    return [...types].join(" | ")
  }

  const keyTypes: Record<string, any[]> = {}

  // Collect possible types for each key
  Object.values(data).forEach((entry) => {
    if (typeof entry === "object" && entry !== null) {
      allKeys.forEach((key) => {
        if (!keyTypes[key])
          keyTypes[key] = []
        if (key in entry)
          keyTypes[key]?.push(entry[key])
      })
    }
  })

  const interfaceBody = [...allKeys]
    .map(key => `  ${key}${keyTypes[key]?.some(v => v === undefined) ? "?" : ""}: ${determineType(keyTypes[key] as any[])};`)
    .join("\n")

  const fullInterface = `export interface ${interfaceName} {\n${interfaceBody}\n}`

  const keyInterface = `export type ${interfaceName}Id = ${Object.keys(data).map(id => `"${id}"`).join(" | ")};`

  return `${fullInterface}\n\n${keyInterface}`
}

async function saveTypeScriptDefinition(mergedData: Record<string, any>, outputFilepath: string): Promise<void> {
  if (!Object.keys(mergedData).length) {
    console.error("No data found to generate TypeScript definition.")
    return
  }

  const interfaceDefinition = generateTypeScriptInterface(mergedData)
  await writeFile(outputFilepath, interfaceDefinition, "utf8")
  console.log(`Generated TypeScript interface saved to ${outputFilepath}`)
}

(async () => {
  try {
    console.log("Downloading SPDX license list...")

    console.log("- Creating directories...")
    await mkdir(TEMP_DIR, { recursive: true })

    const release = await getLatestRelease()

    console.log(`- Found: ${release.name}`)
    const filePath = join(TEMP_DIR, `${release.tag_name}.zip`)
    await downloadFile(release.zipball_url, filePath)

    console.log(`- Extracting to: ${TEMP_JSON_DIR}`)
    await extractArchive(filePath, TEMP_JSON_DIR)

    console.log(`- Merging JSON files...`)
    const mergedData = await mergeJsonFiles(TEMP_JSON_DIR, `${LICENSE_DIR}/spdx-licenses.json`)

    console.log(`- Generating TypeScript interface...`)
    await saveTypeScriptDefinition(mergedData, `${LICENSE_DIR}/spdx-licenses.d.ts`)

    console.log("Complete.")
  }
  catch (error) {
    console.error("Error:", error)
  }
})()
