#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const figlet = require("figlet");

const load = (name) => {
  try {
    const m = require(name);
    return m.default || m;
  } catch {
    return null;
  }
};

const boxen = load("boxen");
const gradient = load("gradient-string");
const terminalLink = load("terminal-link") || ((t, u) => t);
const stripAnsi = load("strip-ansi") || ((s) => s.replace(/\u001b\[[0-9;]*m/g, ""));


const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data.json"), "utf8")
);


const icons = {
  rocket: "🚀",
  code: "💻",
  link: "🔗",
  trophy: "🏆",
  chart: "📊",
  mail: "📧",
  github: "🐙",
  linkedin: "💼",
  portfolio: "🌐",
  pin: "📍",
  sparkles: "✨",
  arrow: "➜"
};


const { palette, styles } = require("./ui.js");


const visualLen = (s) => stripAnsi(s).length;

const wrap = (text, width) => {
  const words = text.split(/\s+/);
  let line = "";
  const out = [];
  words.forEach((w) => {
    const test = line ? `${line} ${w}` : w;
    if (visualLen(test) > width) {
      if (line) out.push(line);
      line = w;
    } else line = test;
  });
  if (line) out.push(line);
  return out.join("\n");
};

const rainbow = (s) => {
  if (!gradient) return s;
  return gradient.rainbow(s);
};


const dbl = (width, color = palette.orangeDeep) =>
  chalk.hex(color)("═".repeat(Math.min(width, 120)));
const dblThin = (width, color = palette.orangeMid) =>
  chalk.hex(color)("─".repeat(Math.min(width, 120)));


const getConfig = () => {
  const width = process.stdout.columns || 80;
  const isSmall = width < 70;
  return {
    width,
    contentWidth: Math.max(width - 12, 36),
    isSmall
  };
};



const card = (title, content, config, icon = "") => {
  const header = `${icon} ${styles.title(title)}`;
  const body = `${dblThin(config.contentWidth)}\n${content}`;
  const text = `${header}\n${body}`;

  if (!boxen || config.isSmall) return text;

  return boxen(text, {
    padding: 1,
    borderStyle: "double",
    borderColor: "yellow"
  });
};


const header = (config) => {
  if (config.isSmall) {
    return styles.title(data.name);
  }

  const art = figlet.textSync(data.name, { font: "Slant" });

  return gradient
    ? gradient.instagram.multiline(art)
    : styles.title(art);
};


const intro = (config) => {
  const nameLine = styles.name(data.full_name);
  const tag = styles.muted(data.tagline);
  return `${nameLine}\n${tag}\n${icons.pin} ${styles.muted(data.location)}`;
};

const contact = () => {
  const items = [
    {
      icon: icons.mail,
      label: "Email",
      url: `${data.contact.email}`,
      color: palette.orangeMid
    },
    {
      icon: icons.github,
      label: "GitHub",
      url: data.contact.github,
      color: palette.purple
    },
    {
      icon: icons.linkedin,
      label: "LinkedIn",
      url: data.contact.linkedin,
      color: palette.cyan
    },
    {
      icon: icons.portfolio,
      label: "Portfolio",
      url: data.contact.portfolio,
      color: palette.green
    }
  ];

  return items
    .map(
      (c) =>
        `${c.icon} ${chalk.hex(c.color).bold(c.label)} ${icons.arrow} ${styles.link(
          c.url.replace(/^https?:\/\//, "").replace(/^mailto:/, "")
        )}`
    )
    .join("\n");
};


const skillColor = (skill) => {
  if (data.skills.frontend.includes(skill)) return palette.pink;
  if (data.skills.backend.includes(skill)) return palette.green;
  if (data.skills.database.includes(skill)) return palette.orangeMid;
  if (data.skills.languages.includes(skill)) return palette.blue;
  if (data.skills.tools.includes(skill)) return palette.amber;
  if (data.skills.ai.includes(skill)) return palette.purple;

  return palette.orangeLight;
};

const techStack = (config) => {
  const allSkills = Object.values(data.skills).flat();
  const badges = allSkills.map((s) =>
    styles.badge(s, skillColor(s))
  );

  const lines = [];
  let line = "";

  badges.forEach((b) => {
    const test = line ? `${line} ${b}` : b;
    if (visualLen(test) > config.contentWidth) {
      lines.push(line);
      line = b;
    } else {
      line = test;
    }
  });
  if (line) lines.push(line);

  return lines.join("\n");
};

const projects = (config) => {
  return data.projects
    .map((p) => {
      const head = `> ${styles.highlight(p.name)}`;
      const desc = wrap(styles.muted(p.desc), config.contentWidth - 2)
        .split("\n")
        .map((l) => `  ${l}`)
        .join("\n");
      return `${head}\n${desc}`;
    })
    .join(`\n${dblThin(config.contentWidth, palette.purple)}\n`);
};


const achievements = () => {
  return data.achievements
    .map((a) => `> ${styles.ok(a)}`)
    .join("\n");
};

const competitiveProgramming = (config) => {
  const cpData = data["competitive-programming"];
  return Object.entries(cpData)
    .map(([platform, rating]) => {
      const platformName = platform.charAt(0).toUpperCase() + platform.slice(1);
      return `${icons.chart} ${styles.highlight(platformName)}: ${styles.muted(
        rating
      )}`;
    })
    .join(`\n`);
};


//orange cat
const catFooter = (config) => {
  const cat = `
${chalk.hex("#FF8C42")("          /\\_/\\")}
${chalk.hex("#FFB347")("         (='.'=)")}
${chalk.hex("#FF7A18")('         (")_(")')}
`;

  const msg = chalk.bold.hex(palette.orangeMid)(
    "   Thanks for visiting my Terminal Portfolio :)"
  );

  return `${dbl(config.contentWidth)}\n${cat}\n${msg}`;
};


const render = () => {
  const config = getConfig();

  console.clear();

  console.log(header(config));
  console.log(dbl(config.contentWidth));
  console.log(intro(config));
  console.log(dblThin(config.contentWidth));

  const sections = [
    card("CONNECT", contact(), config, icons.link),
    card("TECH STACK", techStack(config), config, icons.code),
    card("PROJECTS", projects(config), config, icons.rocket),
    card("COMPETITIVE PROGRAMMING", competitiveProgramming(config), config, icons.chart),
    card("ACHIEVEMENTS", achievements(), config, icons.trophy)
  ];

  console.log(sections.join("\n\n"));
  console.log("\n" + catFooter(config) + "\n");
};


if (process.stdout.isTTY) {
  process.stdout.on("resize", render);
}

render();