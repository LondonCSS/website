const postcssPseudoEnter = require("postcss-pseudo-class-enter");
const postcssPresetEnv = require(`postcss-preset-env`);
const postcssClean = require(`postcss-clean`);
const postcssInset = require(`postcss-inset`);
// const postcssImport = require("postcss-import");

const { customMedia } = require("../src/theme.js");

module.exports = () => [
  // postcssImport(),
  postcssPresetEnv({
    preserve: true,
    browsers: "last 2 versions",
    features: {
      "nesting-rules": true,
      "custom-media-queries": { importFrom: { customMedia } },
    },
  }),
  postcssInset(),
  postcssPseudoEnter(),
  postcssClean(),
];
