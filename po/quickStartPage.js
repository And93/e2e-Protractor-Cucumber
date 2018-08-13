"use strict";

const BasePage = require('./basePage');

class QuickStartPage extends BasePage {

    constructor() {
        super();

        this.guideQuickStar = $('#guide-quickstart');
    };

    open() {
        return super.open(
            'guide/quickstart',
            () => browser.wait(
                EC.visibilityOf(this.guideQuickStar),
                TIMEOUT.m,
                'The QuickStart page was not open'
            )
        );
    };
}

module.exports = QuickStartPage;