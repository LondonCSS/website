const postcssPseudoEnter = require("postcss-pseudo-class-enter");
const postcssPresetEnv = require(`postcss-preset-env`);
const postcssInset = require(`postcss-inset`);
const postcssImport = require("postcss-import");
const cssnano = require("cssnano");

const { customMedia } = require("../src/theme.js");

module.exports = () => [
  postcssImport(),
  postcssPresetEnv({
    features: {
      "custom-media-queries": { importFrom: { customMedia } },
    },
  }),
  postcssInset(),
  postcssPseudoEnter(),
  cssnano({ preset: "advanced" }),
]

