const postcss = require("postcss");
const postcssConfig = require("./tools/postcss.config");

const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginTOC = require("eleventy-plugin-toc");

const MarkdownIt = require("markdown-it");
const formatDate = require("date-fns/format");

const md = new MarkdownIt({
  xhtmlOut: true,
  typographer: true
}).use(require("markdown-it-anchor"));

const eleventy = config => {
  config.addPlugin(pluginRss);
  config.addPlugin(pluginTOC);

  config.addFilter("date", code => formatDate(code, "dddd, MMMM Do"));

  config.addFilter("markdown", code => {
    return code ? md.render(code) : code;
  });

  config.addNunjucksAsyncFilter("postcss", async (code, callback) => {
    const { css } = await postcss([postcssConfig()]).process(code);

    return callback(null, css);
  });

  config.addPassthroughCopy("src/script");
  config.addPassthroughCopy("static/images");

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes"
    },
    passthroughFileCopy: true,
    templateFormats: ["njk", "md", "css", "html", "yml"],
    htmlTemplate: "njk",
    markdownTemplateEngine: "njk"
  };
};

module.exports = eleventy;
