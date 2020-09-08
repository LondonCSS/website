const critical = require("critical");
const { breakpoints } = require("../src/theme");

process.setMaxListeners(Infinity); // <== Sorry generating critical CSS is a resource hog!

const dimensions = Object.values(breakpoints).map((value) => ({
  width: value + 1,
  height: 1000,
}));

module.exports = async (value, outputPath) => {
  if (outputPath.endsWith(".html")) {
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
