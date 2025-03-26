/**
 * Transforms a string from kebab-case to camelCase
 *
 * @param str - string to transform from camelCase to kebab-case
 * @returns string in kebab-case
 */
export function camelToKebab(str: string): string {
  return str.replace(/([A-Z])/g, "-$1").toLowerCase()
}

/**
 * Transforms a string from camelCase to kebab-case
 *
 * @param str - string to transform from kebab-case to camelCase
 * @returns string in camelCase
 */
export function KebabToCamel(str: string): string {
  return str.replace(/-([a-z])/g, (g) => {
    const letter = g[1]
    if (!letter)
      return ""
    return letter.toUpperCase()
  })
}
