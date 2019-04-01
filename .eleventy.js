const postcssPresetEnv = require("postcss-preset-env");
const CleanCSS = require("clean-css");

const { customMedia } = require("./src/theme");

const eleventy = config => {
  // Get upcoming events
  config.addCollection("events", collection => {
    const dateNow = new Date();
    const events = collection.getFilteredByGlob("static/events/*.md");

    return events.filter(event => event.data.date >= dateNow);
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
