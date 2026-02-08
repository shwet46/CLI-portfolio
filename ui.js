const chalk = require("chalk");

const palette = {
  rosewater: "#F5E0DC",
  flamingo: "#F2CDCD",
  pink: "#F5C2E7",
  mauve: "#CBA6F7",
  red: "#F38BA8",
  maroon: "#EBA0AC",
  peach: "#FAB387",
  yellow: "#F9E2AF",
  green: "#A6E3A1",
  teal: "#94E2D5",
  sky: "#89DCEB",
  sapphire: "#74C7EC",
  blue: "#89B4FA",
  lavender: "#B4BEFE",

  text: "#CDD6F4",
  subtext1: "#BAC2DE",
  subtext0: "#A6ADC8",
  overlay2: "#9399B2",
  overlay1: "#7F849C",
  overlay0: "#6C7086",
  surface2: "#585B70",
  surface1: "#45475A",
  surface0: "#313244",
  base: "#1E1E2E",
  mantle: "#181825",
  crust: "#11111B",
  
  ubuntuOrange: "#FAB387",
  ubuntuDarkOrange: "#F38BA8",
  ubuntuLightOrange: "#F9E2AF",
  ubuntuAubergine: "#CBA6F7",
  ubuntuWarmGrey: "#A6ADC8",
  
  archBlue: "#89B4FA",
  archLightBlue: "#89DCEB",
  archDarkBlue: "#74C7EC",
  
  terminalGreen: "#A6E3A1",
  terminalRed: "#F38BA8",
  terminalYellow: "#F9E2AF",
  terminalBlue: "#89B4FA",
  terminalMagenta: "#CBA6F7",
  terminalCyan: "#94E2D5",
  terminalWhite: "#CDD6F4",
  terminalGrey: "#6C7086",

  orange: "#FAB387",
  orangeMid: "#F9E2AF",
  orangeDeep: "#EBA0AC",
  orangeLight: "#F5E0DC",
  purple: "#CBA6F7",
  cyan: "#89DCEB",
  amber: "#F9E2AF"
};


const styles = {
  title: (s) => chalk.bold.hex(palette.peach)(s),
  name: (s) => chalk.bold.hex(palette.mauve)(s),
  muted: (s) => chalk.hex(palette.overlay0)(s),
  highlight: (s) => chalk.bold.hex(palette.green)(s),
  ok: (s) => chalk.hex(palette.green)(s),
  link: (s) => chalk.underline.hex(palette.sky)(s),
  badge: (text, color) => {
    const bg = chalk.bgHex(color).hex(palette.base);
    const content = ` ${text} `;
    return bg.bold(content);
  },
  prompt: (s) => chalk.bold.hex(palette.green)(s),
  error: (s) => chalk.bold.hex(palette.red)(s),
  warning: (s) => chalk.bold.hex(palette.yellow)(s)
};

module.exports = { palette, styles };