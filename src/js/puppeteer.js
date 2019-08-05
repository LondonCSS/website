CSS.registerProperty({
  name: "--circles-tile-size",
  syntax: "<integer>",
  inherits: false,
  initialValue: 8
});

CSS.registerProperty({
  name: "--circles-colors",
  syntax: "<color>+",
  inherits: false,
  initialValue: "#e59eff #0094ff #ff8a7f"
});

CSS.registerProperty({
  name: "--circles-amplitude",
  syntax: "<number>",
  inherits: false,
  initialValue: 2.25
});

CSS.registerProperty({
  name: "--circles-blend-mode",
  syntax: "<custom-ident>",
  inherits: false,
  initialValue: "multiply"
});

async function init() {
  try {
    CSS.paintWorklet.addModule("/static/paintlets/malchata/circles.js");
  } catch (err) {
    console.log(err);
  }
}

init();
