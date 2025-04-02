import { access, mkdir, writeFile } from "node:fs/promises"
import { join } from "node:path"
import AdmZip from "adm-zip"
import fetch from "node-fetch"

const TEMP_DIR = `./.temp`

const REPOSITORY = "spdx/license-list-data"
const LICENSE_DIR = "./templates/license"

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
  if (filePath.endsWith(".zip")) {
    const zip = new AdmZip(filePath)
    const entries = zip.getEntries()

    const rootDir = entries.find(entry => entry.isDirectory && entry.entryName.endsWith("/"))?.entryName
    if (!rootDir)
      throw new Error("Root directory not found in ZIP")

    const extractDirs = [
      `${rootDir}json/details`,
      `${rootDir}json/exceptions`,
      `${rootDir}text`,
    ]

    for (const entry of entries) {
      if (extractDirs.some(dir => entry.entryName.startsWith(dir))) {
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

(async () => {
  try {
    console.log("Downloading SPDX license list...")

    console.log("- Creating directories...")
    await mkdir(TEMP_DIR, { recursive: true })

    const release = await getLatestRelease()

    console.log(`- Found: ${release.name}`)
    const filePath = join(TEMP_DIR, `${release.tag_name}.zip`)
    await downloadFile(release.zipball_url, filePath)

    console.log(`- Extracting to: ${LICENSE_DIR}`)
    await extractArchive(filePath, LICENSE_DIR)

    console.log("Complete.")
  }
  catch (error) {
    console.error("Error:", error)
  }
})()
