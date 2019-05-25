'use strict';

const BasePage = require('./basePage');

class ApiPage extends BasePage {
    
    constructor() {
        super();

        this.api = $('#api');

        // Filter elements
        this.apiFilter = $('.l-flex-wrap.api-filter');
        this.typeField = $('[label="Type:"]');
        this.statusField = $('[label="Status:"]');
        this.searchField = $('.form-search');

        this.itemsOfResult = $$('article .api-item.ng-star-inserted');
    };

    open() {
        return super.open('api', this.api);
    };
}

module.exports = ApiPage;