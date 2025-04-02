import type {
  EntryData,
  // EntryMap,
  EntryOptions,
} from "../../templates/license"
import { entries } from "../../templates/license"

export function getEntry(key: EntryOptions): EntryData | undefined {
  return entries.get(key)
}

export function getEntries(filter?: (entry: [EntryOptions, EntryData]) => boolean): [EntryOptions, EntryData][] {
  return filter ? Array.from(entries).filter(filter) : Array.from(entries)
}

// export function useEntry<K extends keyof EntryMap>(key: K | EntryOptions, _options?: EntryMap[K]) {
//   /* Add functionality */
//   return entries.get(key)
// }
