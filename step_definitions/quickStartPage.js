"use strict";

const {Then, When, Given, setDefaultTimeout} = require('cucumber');
const logger = require('../configs/winstone.conf').logger;
const QuickStartPage = require('../po/quickStartPage');
const quickStartPage = new QuickStartPage();

setDefaultTimeout(TIMEOUT.xl * 20);

Given(/the QuickStart page is opened$/, () => {
    return quickStartPage.open();
});

Then(/the QuickStart page is opened \(assert\)/, () => {
    return browser.wait(
        EC.visibilityOf(quickStartPage.guideQuickStar),
        TIMEOUT.m,
        'The "QuickStart" container is not visible'
    );
});