const CFonts = require('cfonts');
const Inquirer = require('inquirer');
const Opn = require('opn');
const businessCard = require('./data/business-card.json');
// console.log(businessCard);
console.log(Opn);
const Actions = {
    BitBucket() { Opn(businessCard.socialMedia.BitBucket.url); },
    Blog()      { console.log(businessCard.socialMedia.Blog.url); 
        console.log( Opn(businessCard.socialMedia.Blog.url).then(console.log('Done!')) ); },
    GitHub()    { Opn(businessCard.socialMedia.GitHub.url); },
    LinkedIn()  { Opn(businessCard.socialMedia.LinkedIn.url); },
    Twitter()   { Opn(businessCard.socialMedia.Twitter.url); },
    YouTube()   { Opn(businessCard.socialMedia.YouTube.url); },
};

const FontTypes = [
    'block',
    'chrome',
    'simple',
    'simple3d',
    'simpleBlock'
];

function getFontType() {
    return FontTypes[
        Math.floor(Math.random() * FontTypes.length)
    ];
};

CFonts.say('DevTactix', {
    font: getFontType(),
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
            "YouTube"
        ]
    }])
    .then(answer => {
        console.log(answer.choice);
        Actions[answer.choice]();
        process.exit(1);
    });
