export type Options = "README"

export const entries = new Map<Options, { content: string, compressed: boolean }>([
  ["README", { content: "", compressed: false }],
])
