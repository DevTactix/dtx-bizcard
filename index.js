const CFonts = require('cfonts');
const Inquirer = require('inquirer');
const Opn = require('opn');
const businessCard = require('./data/business-card.json');
// console.log(businessCard);

const Actions = {
    BitBucket() { Opn(businessCard.socialMedia.BitBucket.url); },
    Blog()      { console.log(businessCard.socialMedia.Blog.url); Opn(businessCard.socialMedia.Blog.url); },
    GitHub()    { Opn(businessCard.socialMedia.GitHub.url); },
    LinkedIn()  { Opn(businessCard.socialMedia.LinkedIn.url); },
    Twitter()   { Opn(businessCard.socialMedia.Twitter.url); },
    YouTube()   { Opn(businessCard.socialMedia.YouTube.url); },
};

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
