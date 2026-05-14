#!/usr/bin/env node

import CFonts from "cfonts";
import Inquirer from "inquirer";
import businessCard from "./data/business-card.json" with { type: "json" };
import pkg from "./package.json" with { type: "json" };
import openUrl from "./utils/open-url.js";

/**
 * Constants
 */
const Actions = {
  Blog() {
    return openUrl(businessCard.socialMedia.Blog.url);
  },
  GitHub() {
    return openUrl(businessCard.socialMedia.GitHub.url);
  },
  LinkedIn() {
    return openUrl(businessCard.socialMedia.LinkedIn.url);
  },
  NPM() {
    return openUrl(businessCard.socialMedia.NPM.url);
  },
  Twitter() {
    return openUrl(businessCard.socialMedia.Twitter.url);
  },
  Website() {
    return openUrl(businessCard.socialMedia.Website.url);
  },
  Work() {
    return openUrl(businessCard.work.employee.url);
  },
  YouTube() {
    return openUrl(businessCard.socialMedia.YouTube.url);
  },
};

const FontTypes = ["block", "chrome", "simple", "simple3d", "simpleBlock"];

/**
 * Helpers
 */
function getFontType() {
  return FontTypes[Math.floor(Math.random() * FontTypes.length)];
}

/**
 * Main
 */
// Banner
CFonts.say("DevTactix", {
  align: "center",
  font: getFontType(),
  colors: ["candy"],
  background: "transparent",
});

const YELLOW = "\x1b[93m";
const RESET = "\x1b[0m";
const termWidth = process.stdout.columns || 80;
const infoLines = [
  businessCard.name,
  `${businessCard.geoLocation.city}, ${businessCard.geoLocation.country}`,
  `${businessCard.work.employee.role} @ ${businessCard.work.employee.organization}`,
  `${businessCard.work.assignee.role} @ ${businessCard.work.assignee.organization}`,
];
for (const line of infoLines) {
  const pad = Math.max(0, Math.floor((termWidth - line.length) / 2));
  console.log(`${" ".repeat(pad)}${YELLOW}${line}${RESET}`);
}

console.log();

CFonts.say(`dtx-bizcard v${pkg.version}`, {
  align: "center",
  font: "console",
  colors: ["gray"],
  background: "transparent",
  spaceless: true,
});

Inquirer.prompt([
  {
    type: "select",
    name: "choice",
    message: "Connect, follow or just check-me out:",
    choices: ["Blog", "GitHub", "LinkedIn", "NPM", "Twitter", "Website", "Work", "YouTube"],
  },
]).then(async (answer) => {
  await Actions[answer.choice]();
  process.exitCode = 0;
}).catch((error) => {
  console.error("dtx-bizcard:", error);
  process.exitCode = 1;
});
