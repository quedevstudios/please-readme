import antfu from "@antfu/eslint-config"

export default antfu({
  type: "lib",

  stylistic: {
    indent: 2,
    quotes: "double",
  },

  ignores: ["templates/**/*.json"],

  rules: {
    "node/prefer-global/buffer": "off",
  },
})
