const fs = require("fs");
const path = require("path");
const util = require("util");
const sass = require("sass");
// const postcss = require("postcss");

const mkdir = util.promisify(fs.mkdir);
const writeFile = util.promisify(fs.writeFile);

/**
 * Compile Sass
 *
 * @param {string} scssPath
 * @param {string} cssPath
 */
async function renderSass(scssPath, cssPath) {
  try {
    if (!fs.existsSync(path.dirname(cssPath))) {
      await mkdir(path.dirname(cssPath), { recursive: true });
    }

    const result = sass.renderSync({ file: scssPath });
    await writeFile(cssPath, result.css.toString());
  } catch (err) {
    console.log({ err });
  }
}

module.exports = { renderSass };
