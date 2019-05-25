'use strict';

const BasePage = require('./basePage');

class QuickStartPage extends BasePage {

    constructor() {
        super();

        this.guideQuickStar = $('#guide-quickstart');
    };

    open() {
        return super.open('guide/quickstart', this.guideQuickStar);
    };
}

module.exports = QuickStartPage;