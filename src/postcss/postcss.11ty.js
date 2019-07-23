

const fs = require("fs");
const path = require("path");
const postcss = require("postcss");

const postcssConfig = require("../../tools/postcss.config");

// the file name as an entry point for postcss compilation
// also used to define the output filename in our output /css folder.
const fileName = "styles.css";

module.exports = class {
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
