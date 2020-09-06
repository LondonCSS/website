const path = require("path");
const sass = require("sass");
const postcss = require("postcss");

const pcssConfig = require("./postcss.config");
const pcssCompiler = postcss(pcssConfig);

/**
 * Compile Sass and process with PostCSS
 *
 * @param {string} srcPath
 */
function renderCSS(srcPath) {
  return class {
    async data() {
      return {
        permalink: ({ page }) => `${page.filePathStem}.css`,
        scssPath: path.join(__dirname, `../${srcPath}`),
        layout: null,
        eleventyExcludeFromCollections: true,
      };
    }

    async render(data) {
      const { css: sassOutput } = sass.renderSync({ file: data.scssPath });
      const { css: pcssOutput } = await pcssCompiler.process(sassOutput, {
        from: data.scssPath,
      });

      return pcssOutput;
    }
  };
}

module.exports = { renderCSS };
