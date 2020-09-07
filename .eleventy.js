const pluginTOC = require("eleventy-plugin-toc");
const MarkdownIt = require("markdown-it");
const { format: formatDate, parseISO } = require("date-fns");

const now = new Date();

const md = new MarkdownIt({
  xhtmlOut: true,
  typographer: true,
}).use(require("markdown-it-anchor"));

const eleventy = (config) => {  
  config.setLibrary("md", md);

  config.addPlugin(pluginTOC);
  config.addFilter("markdown", (code) => (code ? md.render(code) : code));
  config.addFilter("isFuture", (code) => new Date(code) > now);
  config.addFilter("date", (code) =>
    formatDate(parseISO(code), "EEEE, MMMM do yyyy")
  );

  config.addPassthroughCopy("src/js");
  config.addPassthroughCopy("static");

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
    },
    passthroughFileCopy: true,
    templateFormats: ["njk", "md", "11ty.js"],
    htmlTemplate: "njk",
    markdownTemplateEngine: "njk",
  };
};

module.exports = eleventy;
