'use strict';

const { Then, Given } = require('cucumber');
const logger = require('../../configs/winstone.conf').logger;
const QuickStartPage = require('../po/quickStartPage');
const quickStartPage = new QuickStartPage();

Given(/^the QuickStart page is opened$/, () => {
    return quickStartPage.open();
});

Then(/^the QuickStart page is opened \(assert\)$/, () => {
    return browser.wait(
        EC.visibilityOf(quickStartPage.guideQuickStar),
        TIMEOUT.m,
        'The "QuickStart" container is not visible'
    );
});