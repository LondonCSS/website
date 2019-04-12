const postcss = require("postcss");
const postcssConfig = require("./postcss.config");
const pluginRss = require("@11ty/eleventy-plugin-rss");

const eleventy = config => {
  config.addPlugin(pluginRss);

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
