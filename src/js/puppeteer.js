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

CSS.registerProperty({
  name: '--extra-sparkleNumber',
  syntax: '<number>',
  inherits: false,
  initialValue: 30,
});

CSS.registerProperty({
  name: '--extra-sparkleHue',
  syntax: '<number>',
  inherits: false,
  initialValue: 60,
});

// Sparkles
//------------------------------------------------------------------------------
CSS.registerProperty({
  name: '--extra-sparkleHeightVariance',
  syntax: '<number>',
  inherits: false,
  initialValue: 9,
});

CSS.registerProperty({
  name: '--extra-sparkleWidthVariance',
  syntax: '<number>',
  inherits: false,
  initialValue: 12,
});

CSS.registerProperty({
  name: '--extra-sparkleWeightVariance',
  syntax: '<number>',
  inherits: false,
  initialValue: 2,
});

// Confetti
//------------------------------------------------------------------------------
CSS.registerProperty({
  name: '--extra-confettiNumber',
  syntax: '<number>',
  inherits: false,
  initialValue: 30,
});

CSS.registerProperty({
  name: '--extra-confettiLengthVariance',
  syntax: '<number>',
  inherits: false,
  initialValue: 15,
});

CSS.registerProperty({
  name: '--extra-confettiWeightVariance',
  syntax: '<number>',
  inherits: false,
  initialValue: 4,
});

async function init() {
  try {
    CSS.paintWorklet.addModule("/static/paintlets/extra.css/confetti.js");
    CSS.paintWorklet.addModule("/static/paintlets/malchata/circles.js");
  } catch (err) {
    console.log(err);
  }
}

init();
