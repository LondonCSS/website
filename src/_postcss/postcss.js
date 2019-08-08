const fs = require("fs");
const path = require("path");
const postcss = require("postcss");

const theme = require("./theme.js");
const postcssConfig = require("../../tools/postcss.config");

const postcssPlugins = postcssConfig(theme);

module.exports = fileName =>
  class {
    async data() {
      const rawFilepath = path.join(__dirname, `../_includes/css/${fileName}`);
      return {
        permalink: fileName,
        rawFilepath,
        rawCss: await fs.readFileSync(rawFilepath)
      };
    }

    async render({ rawCss, rawFilepath }) {
      return await postcss([postcssPlugins])
        .process(rawCss, { from: rawFilepath })
        .then(result => result.css);
    }
  };
