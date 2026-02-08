const chalk = require("chalk");

const palette = {
  orangeDeep: "#FF7A18",
  orangeMid: "#FFA94D",
  orangeLight: "#FFB347",
  cyan: "#00D9FF",
  purple: "#A855F7",
  green: "#10B981",
  blue: "#60A5FA",
  pink: "#F472B6",
  amber: "#F59E0B",
  slate: "#94A3B8"
};



const styles = {
  title: (s) => chalk.bold.hex(palette.orangeDeep)(s),
  highlight: (s) => chalk.bold.hex(palette.orangeMid)(s),
  name: (s) => chalk.bold.hex(palette.purple)(s),
  muted: chalk.hex(palette.slate),
  link: (s) => chalk.hex(palette.cyan).underline(s),
  ok: (s) => chalk.hex(palette.green)(s),
  badge: (t, c = palette.orangeLight) =>
    chalk.bgHex(c).black.bold(` ${t} `)
};

module.exports = {
    palette,
    styles
}
