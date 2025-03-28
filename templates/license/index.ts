import type { SPDXLicense, SPDXLicenseId } from "./spdx-licenses"
import licensesJson from "./spdx-licenses.json"

export function getLicense(id: SPDXLicenseId): SPDXLicense | undefined {
  const licenses = licensesJson as Record<SPDXLicenseId, SPDXLicense>
  return licenses[id]
}

export function getLicensesByFilter(filters: keyof SPDXLicense | keyof SPDXLicense[]): SPDXLicense[] {
  const licenses = licensesJson as Record<SPDXLicenseId, SPDXLicense>
  const filterArray = Array.isArray(filters) ? filters : [filters]

  return Object.values(licenses).filter(license => filterArray.every(filter => license[filter as keyof SPDXLicense]))
}
