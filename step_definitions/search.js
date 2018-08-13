"use strict";

const {Then, When, Given, setDefaultTimeout} = require('cucumber');
const logger = require('../configs/winstone.conf').logger;

const Search = require('../po/common/search');
const search = new Search();

setDefaultTimeout(TIMEOUT.xl * 20);

When(/input (.+) into the search field$/, (data) => {
    logger.info(`I have filled search field with data ${data}`);
    return search.searchField.sendKeys(data);
});

Then(/the search field is visible/, () => {
    return browser.wait(
        EC.visibilityOf(search.searchField),
        TIMEOUT.m,
        'The search field is not visible'
    );
});

Then(/list of search results is empty/, () => {
    search.waitSearchResultMenu();
    return expect(search.searchResultItem.count()).to.eventually.equal(0);
});

Then(/list of search results has (.+)/, async (results) => {
    search.waitSearchResultMenu();

    if (results === 'No results found.') {
        return expect(search.searchResult.getText()).to.eventually.equal(
            'No results found.',
            'There is no inscription "No results found." In the list of search results'
        );
    }

    browser.wait(
        search.searchResultItem.count()
            .then(count => count > 0)
            .catch(err => {throw new Error(err)}),
        TIMEOUT.m,
        'The number of items in the list of search result is 0'
    );

    const text = await search.columnName.getText();

    if (!text.join("; ").includes(results)) {
        throw new Error(`Did not found match name of column. Expected: ${results}`);
    }
    return;
});