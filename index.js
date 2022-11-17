#!/usr/bin/env node

const CFonts = require("cfonts");
const Inquirer = require("inquirer");
const Open = require("open");
const businessCard = require("./data/business-card.json");

/**
 * Constants
 */
const Actions = {
    Blog() {
        Open(businessCard.socialMedia.Blog.url);
    },
    GitHub() {
        Open(businessCard.socialMedia.GitHub.url);
    },
    LinkedIn() {
        Open(businessCard.socialMedia.LinkedIn.url);
    },
    NPM() {
        Open(businessCard.socialMedia.NPM.url);
    },
    Twitter() {
        Open(businessCard.socialMedia.Twitter.url);
    },
    Website() {
        Open(businessCard.socialMedia.Website.url);
    },
    Work() {
        Open(businessCard.work.employee.url);
    },
    YouTube() {
        Open(businessCard.socialMedia.YouTube.url);
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

CFonts.say(
    `${businessCard.name}|${businessCard.geoLocation.city}, ${businessCard.geoLocation.country}|${businessCard.work.employee.role} @ ${businessCard.work.employee.organization}|${businessCard.work.assignee.role} @ ${businessCard.work.assignee.organization}`,
    {
        align: "center",
        font: "console",
        colors: ["yellowBright", "blue", "yellowBright"],
        background: "transparent",
    }
);

Inquirer.prompt([
    {
        type: "list",
        name: "choice",
        message: "Connect, follow or just check-me out:",
        choices: ["Blog", "GitHub", "LinkedIn", "NPM", "Twitter", "Website", "Work", "YouTube"],
    },
]).then((answer) => {
    console.log(answer.choice);
    Actions[answer.choice]();
    process.exitCode = 0;
});
