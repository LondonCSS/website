const postcssPseudoEnter = require("postcss-pseudo-class-enter");
const postcssPresetEnv = require(`postcss-preset-env`);
const postcssInset = require(`postcss-inset`);
const cssnano = require("cssnano");

const { customMedia } = require("../src/theme.js");

/**
 * @param {boolean} isProd
 * @returns {any[]}
 */
function getPlugins(isProd) {
  const plugins = [
    postcssPresetEnv({
      features: {
        "custom-media-queries": { importFrom: { customMedia } },
      },
    }),
    postcssInset(),
    postcssPseudoEnter(),
  ];

  if (isProd) {
    return plugins.concat([cssnano({ preset: "advanced" })]);
  }

  return plugins;
}

module.exports = getPlugins(process.env.NODE_ENV === "production");
