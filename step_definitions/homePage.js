"use strict";

const {Then, When, Given, setDefaultTimeout} = require('cucumber');
const logger = require('../configs/winstone.conf').logger;
const HomePage = require('../po/homePage');
const homePage = new HomePage();

setDefaultTimeout(TIMEOUT.xl * 20);

function indexOfBlock(index) {
    return Number(index) - 1;
}

Given(/the home page is opened/, () => {
    return homePage.open();
});

Then(/the 'get started' button should be visible/, () => {
    return expect(homePage.startedButtons.get(1).isDisplayed()).to.eventually.be.true;
});

When(/click the button at the (.+) of the page/, (position) => {

    let index;

    if (position === 'top') {
        index = 1;
    } else if (position === 'bottom') {
        index = 2;
    } else {
        const errorMessage = 'Set the correct position of the "get started" button'
        logger.error(errorMessage);
        throw new Error(errorMessage);
    }

    return homePage.startedButtons.get(index).click();
});

When(/scroll to (.+) block/, (index) => {
    return homePage.scrollTo(homePage.getBlock(indexOfBlock(index)));
});

Then(/the block (.+) should be visible/, (index) => {
    return expect(homePage.getBlock(indexOfBlock(index)).isDisplayed()).to.eventually.be.true;
});

Then(/the name of (.+) block should be '(.+)'/, (index, name) => {
    return expect(homePage.getBlock(indexOfBlock(index)).getText()).to.eventually.be.equal(name, 'Block name is incoerrect');
});