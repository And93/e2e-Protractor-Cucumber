"use strict";

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
        
        this.logo = $('#intro');
    }

    open(path = '', condition) {
        browser.get('/' + path);
        logger.info(`I have visited: ${browser.baseUrl}/${path}`);
        const page = path ? path : 'home';

        if (condition) {
            return condition();
        }
        
        return browser.wait(
            EC.visibilityOf(this.logo),
            TIMEOUT.m,
            `The logo in ${page} page is not visible`
        );
    };

    scrollTo(element) {
        return browser.executeScript('arguments[0].scrollIntoView();', element);
    }

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