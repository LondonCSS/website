const critical = require("critical");
const { breakpoints } = require("../src/theme");
const { wallpapers } = require("../src/_data/config.js");

process.setMaxListeners(Infinity); // <== Sorry generating critical CSS is a resource hog!

const omitList = ["dist/events/puppeteer.html"];
for (const wallpaper of wallpapers) {
  omitList.push(`dist/wallpapers/${wallpaper.url}/index.html`);
}

const dimensions = Object.values(breakpoints).map((value) => ({
  width: value + 1,
  height: 1000,
}));

module.exports = async function (value, outputPath) {
  if (outputPath.endsWith(".html") && omitList.indexOf(outputPath) < 0) {
    const { html } = await critical.generate(
      {
        base: "dist/",
        html: value,
        penthouse: { timeout: 120000 },
        dimensions,
        inline: true,
      },
      null
    );

    return html;
  }

  return value;
};
