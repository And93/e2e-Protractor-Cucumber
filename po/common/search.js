class Search {

    constructor() {

        this.searchField = $('[aria-label="search"]');

        this.searchResult = $('aio-search-results');
        this.searchResultItem = this.searchResult.$$('.search-result-item');

        this.columnName = this.searchResult.$$('h3');

        this.loader = element(by.cssContainingText('.ng-star-inserted', 'Searching ...'));
    };

    waitSearchResultMenu() {
        const _searchRes = EC.visibilityOf(this.searchResult);
        const _loader = EC.invisibilityOf(this.loader);

        return browser.wait(EC.and(_searchRes, _loader), TIMEOUT.m,);
    };
}

module.exports = Search;