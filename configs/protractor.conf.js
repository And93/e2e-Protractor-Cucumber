const TIMEOUT = {
    xs: 1 * 1000,
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
    seleniumAddress: 'http://localhost:4444/wd/hub',
    directConnect: true,
    globalTimeout: TIMEOUT.xl * 10,
    pageTimeout: TIMEOUT.xl * 10,
    allScriptsTimeout: TIMEOUT.xl * 10,
    ignoreUncaughtExceptions: true,

    specs: [
        '../features/**/*.feature'
    ],
    
    capabilities: {
        browserName: 'chrome',
        loggingPrefs: {
            driver: 'ALL',
            server: 'ALL',
            browser: 'ALL'
        }
    },
    
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),

    cucumberOpts: {
        require: ['../step_definitions/**/*.js'],
        tags: ['~@wip'],
        format: ['json:./artifacts/reports/json/report.json']
    },
    
    onPrepare: () => {
        global.TIMEOUT = TIMEOUT;
        global.EC = protractor.ExpectedConditions;

        const chai = require('chai');

        chai.use(require('chai-as-promised'));
        global.expect = chai.expect;
        global.assert = chai.assert;
        global.should = chai.should();

        browser.waitForAngularEnabled(true);
        return browser.driver.manage().window().setSize(SIZE_OF_WINDOW.fullHD.width, SIZE_OF_WINDOW.fullHD.height);
    }
};
