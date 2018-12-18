'use strict';

const {Then, When, Given, setDefaultTimeout} = require('cucumber');
const logger = require('../configs/winstone.conf').logger;

const Search = require('../po/common/search');
const search = new Search();

setDefaultTimeout(TIMEOUT.xl * 20);

When(/^input (.+) into the search field$/, (data) => {
    logger.info(`I have filled search field with data ${data}`);
    return search.searchField.sendKeys(data);
});

Then(/^the search field is visible$/, () => {
    return browser.wait(
        EC.visibilityOf(search.searchField),
        TIMEOUT.m,
        'The search field is not visible'
    );
});

Then(/^list of search results is empty$/, () => {
    return search.waitSearchResultMenu()
        .then(() => expect(search.searchResultItem.count()).to.eventually.equal(0))
});

Then(/^list of search results has (.+)$/, (results) => {
    return search.waitSearchResultMenu().then(() => {
        const noResultsFound = 'No results found.';

        if (results === noResultsFound) {
            return expect(search.searchResult.getText()).to.eventually.equal(
                noResultsFound,
                'There is no inscription "No results found." In the list of search results'
            );
        }

        return browser.wait(
            () => search.searchResultItem.count().then(count => count > 0),
            TIMEOUT.m,
            'The number of items in the list of search result is 0'
        )
            .then(() => search.columnName.getText())
            .then(text => {
                if (!text.join('; ').includes(results)) {
                    throw new Error(`Did not found match name of column. Expected: ${results}`);
                }
            });
    });
});