const pluginTOC = require("eleventy-plugin-toc");

const MarkdownIt = require("markdown-it");
const formatDate = require("date-fns/format");

const now = new Date();

const md = new MarkdownIt({
  xhtmlOut: true,
  typographer: true
}).use(require("markdown-it-anchor"));

const eleventy = config => {
  config.addPlugin(pluginTOC);

  config.addFilter("date", code => formatDate(code, "dddd, MMMM Do"));

  config.addFilter("markdown", code => {
    return code ? md.render(code) : code;
  });

  config.addFilter("isFuture", code => {
    return new Date(code) > now;
  });

  config.setLibrary("md", md);

  config.addPassthroughCopy("src/js");
  config.addPassthroughCopy("static");

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes"
    },
    passthroughFileCopy: true,
    templateFormats: ["njk", "md", "11ty.js"],
    htmlTemplate: "njk",
    markdownTemplateEngine: "njk"
  };
};

module.exports = eleventy;
