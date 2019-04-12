const postcss = require("postcss");
const postcssConfig = require("./postcss.config");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const MarkdownIt = require("markdown-it");
const formatDate = require('date-fns/format')

const md = new MarkdownIt({
  xhtmlOut: true,
  typographer: true
});

const eleventy = config => {
  config.addPlugin(pluginRss);

  config.addFilter("date", code => {
    const date = new Date(code);
    return formatDate(code, "dddd, MMMM Do")
  });

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
