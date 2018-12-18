'use strict';

const Header = require('./common/header');
const Footer = require('./common/footer');
const Search = require('./common/search');

const header = new Header();
const footer = new Footer();
const search = new Search();
const logger = require('../configs/winstone.conf').logger;

class BasePage {

    constructor() {
        this.header = header;
        this.footer = footer;
        this.search = search;
    };

    open(path, expectedElement) {
        return browser.get('/' + path)
            .then(() => logger.info(`I have visited: ${browser.baseUrl}/${path}`))
            .then(() => {
                return browser.wait(
                    EC.visibilityOf(expectedElement),
                    TIMEOUT.m,
                    `The ${expectedElement.name} page was not open`
                );
            });
    };

    scrollTo(element) {
        return browser.executeScript('arguments[0].scrollIntoView();', element);
    };

    checkPageTitle(title) {
        return expect(this.getPageTitle()).to.eventually.equal(
            title,
            `The title of the page does not have the expected title: ${title}`
        );
    };

    getPageTitle() {
        return browser.getTitle();
    };
}

module.exports = BasePage;