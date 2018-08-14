class Search {

    constructor() {

        this.searchField = $('[aria-label="search"]');

        this.searchResult = $('aio-search-results');
        this.searchResultItem = this.searchResult.$$('.search-result-item');

        this.columnName = this.searchResult.$$('h3');

        this.loader = $(by.cssContainingText('.ng-star-inserted', 'Searching ...'));
    };
    
    waitSearchResultMenu() {
        browser.wait(
            EC.visibilityOf(this.searchResult),
            TIMEOUT.m,
            'The search menu is not visible'
        );
        browser.driver.sleep(1500)
        //browser.wait(
        //    EC.invisibilityOf(this.loader),
        //    TIMEOUT.m,
        //    "The loader in search menu still visible"
        //);
    };
}

module.exports = Search;