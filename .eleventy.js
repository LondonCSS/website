const postcss = require("postcss");
const postcssConfig = require("./postcss.config");

const eleventy = config => {
  // Get upcoming events
  config.addCollection("events", collection => {
    const dateNow = new Date();
    const events = collection.getFilteredByGlob("static/events/*.md");

    return events.filter(event => event.data.date >= dateNow);
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
