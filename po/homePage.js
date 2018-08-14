'use strict';

const BasePage = require('./basePage');

class HomePage extends BasePage {

    constructor() {
        super();

        this.contentBlocks = $$('.home-row');
        this.namesOfBlocks = this.contentBlocks.$$('.text-headline');

        this.startedButtons = $$('[href="guide/quickstart"]');
    }

    getBlock(index) {
        return this.namesOfBlocks.get(index);
    }
}

module.exports = HomePage;