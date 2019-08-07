

const fs = require("fs");
const path = require("path");
const postcss = require("postcss");

const postcssConfig = require("../../tools/postcss.config");

module.exports = (fileName) => class {
  async data() {
    const rawFilepath = path.join(__dirname, `../_includes/css/${fileName}`);
    return {
      permalink: fileName,
      rawFilepath,
      rawCss: await fs.readFileSync(rawFilepath)
    };
  }

  async render({ rawCss, rawFilepath }) {
    return await postcss([postcssConfig()])
      .process(rawCss, { from: rawFilepath })
      .then(result => result.css);
  }
};
