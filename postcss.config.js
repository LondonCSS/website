const postcssPresetEnv = require(`postcss-preset-env`);

const { customMedia } = require("./src/theme.js");

module.exports = () => ({
  plugins: [
    postcssPresetEnv({
      preserve: true,
      browsers: "last 2 versions",
      features: {
        "nesting-rules": true,
        "custom-media-queries": { importFrom: { customMedia } }
      }
    })
  ]
});
