const fs = require("fs");
const path = require("path");
const util = require("util");
const sass = require("sass");
const postcss = require("postcss");

const postcssConfig = require("./postcss.config");

const mkdir = util.promisify(fs.mkdir);
const writeFile = util.promisify(fs.writeFile);

/**
 * Compile Sass
 *
 * @param {string} scssPath
 * @param {string} dest
 */
async function renderSass(scssPath, dest) {
  try {
    if (!fs.existsSync(path.dirname(dest))) {
      await mkdir(path.dirname(dest), { recursive: true });
    }

    const sassBuffer = sass.renderSync({ file: scssPath });
    const postCSS = await postcss(postcssConfig()).process(sassBuffer.css, {
      from: scssPath,
    });
    await writeFile(dest, postCSS.css);
  } catch (err) {
    console.log({ err });
  }
}

module.exports = { renderSass };
