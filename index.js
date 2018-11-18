#!/usr/bin/env node

const CFonts = require('cfonts');
const Inquirer = require('inquirer');
const Opn = require('opn');
const businessCard = require('./data/business-card.json');

/**
 * Constants
 */
const Actions = {
    BitBucket() { Opn(businessCard.socialMedia.BitBucket.url); },
    Blog()      { Opn(businessCard.socialMedia.Blog.url); },
    GitHub()    { Opn(businessCard.socialMedia.GitHub.url); },
    LinkedIn()  { Opn(businessCard.socialMedia.LinkedIn.url); },
    Twitter()   { Opn(businessCard.socialMedia.Twitter.url); },
    Work()      { Opn(businessCard.work.employee.url); },
    YouTube()   { Opn(businessCard.socialMedia.YouTube.url); },
};

const FontTypes = [
    'block',
    'chrome',
    'simple',
    'simple3d',
    'simpleBlock'
];


/**
 * Helpers
 */
function getFontType() {
    return FontTypes[
        Math.floor(Math.random() * FontTypes.length)
    ];
};


/**
 * Main
 */
// Banner
CFonts.say('DevTactix', {
    align: 'center',
    font: getFontType(),
    colors: ['candy'],
    background: 'transparent'
});

CFonts.say(`${businessCard.name}|${businessCard.geoLocation.city}, ${businessCard.geoLocation.country}|${businessCard.work.employee.role} @ ${businessCard.work.employee.organization}|${businessCard.work.assignee.role} @ ${businessCard.work.assignee.organization}`, {
    align: 'center',
    font: 'console',
    colors: ['yellowBright', 'blue', 'yellowBright'],
    background: 'transparent'
});

Inquirer
    .prompt([{
        type: 'list',
        name: 'choice',
        message: 'Connect, follow or just check-me out:',
        choices: [
            "BitBucket",
            "Blog",
            "GitHub",
            "LinkedIn",
            "Twitter",
            "Work",
            "YouTube"
        ]
    }])
    .then(answer => {
        console.log(answer.choice);
        Actions[answer.choice]();
        process.exitCode = 0;
    });
