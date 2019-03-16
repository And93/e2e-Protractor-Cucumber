'use strict';

const {Then, When, Given, setDefaultTimeout} = require('cucumber');
const logger = require('../configs/winstone.conf').logger;
const HomePage = require('../po/homePage');
const homePage = new HomePage();

setDefaultTimeout(TIMEOUT.xl * 20);

function indexOfBlock(index) {
    return Number(index) - 1;
}

Given(/^the home page is opened$/, () => {
    return homePage.open();
});

When(/^click the button at the (top|bottom) of the page$/, (position) => {

    let index;

    switch (position) {
        case 'top':
            index = 1;
            break;
        case 'bottom':
            index = 2;
            break;
        default:
            const errorMessage = 'Set the correct position of the "get started" button';
            logger.error(errorMessage);
            throw new Error(errorMessage);
    }

    return homePage.startedButtons.get(index).click();
});

When(/^scroll to (.+) block$/, (index) => {
    return homePage.scrollTo(homePage.getBlock(indexOfBlock(index)));
});

Then(/^the 'get started' button should be visible$/, () => {
    return expect(homePage.startedButtons.get(1).isDisplayed()).to.eventually.be.false;
});

Then(/^the block (.+) should be visible$/, (index) => {
    return expect(homePage.getBlock(indexOfBlock(index)).isDisplayed()).to.eventually.be.true;
});

Then(/the name of (.+) block should be '(.+)'/, (index, name) => {
    return expect(homePage.getBlock(indexOfBlock(index)).getText()).to.eventually.be.equal(
        name,
        'Block name is incorrect'
    );
});