// const postcssImport = require("postcss-import");
const postcssPseudoEnter = require("postcss-pseudo-class-enter");
const postcssPresetEnv = require(`postcss-preset-env`);
const postcssClean = require(`postcss-clean`);

const { customMedia } = require("../src/theme.js");

module.exports = () => ({
  from: "src/_includes/css",
  plugins: [
    postcssPresetEnv({
      preserve: true,
      browsers: "last 2 versions",
      features: {
        "nesting-rules": true,
        "custom-media-queries": { importFrom: { customMedia } }
      }
    }),
    postcssPseudoEnter(),
    postcssClean()
  ]
});
