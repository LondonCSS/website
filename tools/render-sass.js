const path = require("path");
const sass = require("sass");
const postcss = require("postcss");

const pcssConfig = require("./postcss.config");
const pcssCompiler = postcss(pcssConfig());

console.log("process.env.NODE_ENV:", process.env.NODE_ENV);

/**
 * Compile Sass and process with PostCSS
 *
 * @param {string} srcPath
 * @param {string} permalink
 */
function renderSass(srcPath, permalink) {
  return class {
    async data() {
      return {
        permalink,
        layout: null,
        eleventyExcludeFromCollections: true,
        scssPath: path.join(__dirname, `../${srcPath}`),
      };
    }

    async render({ scssPath }) {
      const { css: sassOutput } = sass.renderSync({ file: scssPath });
      const { css: pcssOutput } = await pcssCompiler.process(sassOutput, {
        from: scssPath,
      });

      return pcssOutput;
    }
  };
}

module.exports = { renderSass };
