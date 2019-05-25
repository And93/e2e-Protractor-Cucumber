const TIMEOUT = {
    xs: 1000,
    s: 5 * 1000,
    m: 10 * 1000,
    l: 15 * 1000,
    xl: 20 * 1000
};

const SIZE_OF_WINDOW = {
    fullHD: {
        width: 1920,
        height: 1080
    }
};

exports.config = {

    baseUrl: 'https://angular.io/',
    directConnect: false,
    globalTimeout: TIMEOUT.xl * 10,
    pageTimeout: TIMEOUT.xl * 10,
    allScriptsTimeout: TIMEOUT.xl * 10,
    ignoreUncaughtExceptions: true,
    SELENIUM_PROMISE_MANAGER: false,

    specs: [
        '../src/features/**/*.feature'
    ],

    capabilities: {
        browserName: 'chrome',
        loggingPrefs: {
            driver: 'ALL',
            server: 'ALL',
            browser: 'ALL'
        },
        count: 1,
        shardTestFiles: false,
        maxInstances: 1
    },

    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),

    cucumberOpts: {
        require: ['../src/step_definitions/**/*.js'],
        tags: ['@suite', '~@wip'],
        format: ['json:./artifacts/reports/json/report.json']
    },

    onPrepare: async () => {
        const chai = require('chai');

        global.TIMEOUT = TIMEOUT;
        global.EC = protractor.ExpectedConditions;

        chai.use(require('chai-as-promised'));
        global.expect = chai.expect;
        global.assert = chai.assert;
        global.should = chai.should;

        await browser.waitForAngularEnabled(true);
        await browser.driver.manage().window().setSize(SIZE_OF_WINDOW.fullHD.width, SIZE_OF_WINDOW.fullHD.height);
    }
};
