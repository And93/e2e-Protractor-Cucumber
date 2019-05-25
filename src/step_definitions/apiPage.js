'use strict';

const {Then, When, Given} = require('cucumber');
const logger = require('../../configs/winstone.conf').logger;

const ApiPage = require('../po/apiPage');
const apiPage = new ApiPage();

Given(/^the api page is opened$/, () => {
    return apiPage.open();
});

When(/^I fill (type|status|search) field with data: (.+)$/, async (value, data) => {

    let elem;

    switch (value) {
        case 'type':
            elem = apiPage.typeField;
            break;
        case 'status':
            elem = apiPage.statusField;
            break;
        case 'search':
            elem = apiPage.searchField;
            break;
        default:
            const errorMessage = 'Set the correct position of the "get started" button';
            logger.error(errorMessage);
            throw new Error(errorMessage);
    }

    await browser.wait(
        EC.visibilityOf(elem),
        TIMEOUT.m,
        `The element: ${value} is not visible`
    );
    await elem.click();
    await browser.element(by.buttonText(data)).click();
});

Then(/^the api filter should be visible$/, () => {
    return expect(apiPage.apiFilter.isDisplayed()).to.eventually.be.true;
});

Then(/^I get (.+) results$/, (number) => {
    return expect(apiPage.itemsOfResult.count()).to.eventually.be.equal(
        number,
        `The number of search result does not match the expected result: ${number}`
    );
});