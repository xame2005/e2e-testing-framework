const { Given, When, Then } = require('@wdio/cucumber-framework');

const HomePage = require('../page-objects/home.page');
const NavBar = require('../page-objects/global/navbar');

const pages = {
    home: HomePage
}

Given(/^I am on the (\w+) page$/, 
    async (page) => await pages[page].open());

When(/^on the navbar I select category "(All|Titles|TV Episodes)"$/, 
    async (category) => await NavBar.searchBar.selectCategory(category));

Then(/^I should see the category dropdown now matches "(All|Titles|TV Episodes)"$/, 
    async (category) => {
        // This is a destructuring asignment
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
        const { categoryDropdown} = NavBar.searchBar;
        await categoryDropdown.waitForDisplayed({
            timeout: 1000,
            timeoutMsg: 'The Category dropdown was not displayed'
        });
        const text = await categoryDropdown.getText();
        // Assertions docs: https://jestjs.io/docs/using-matchers
        /**
        * Why does this line doesn't use await?
        * Answer: when selenium is consumed we send a HTTP request to the selenium API
        *         this force the callback to go to the callback stack, forcing us to use async/await
        * https://medium.com/@Rahulx1/understanding-event-loop-call-stack-event-job-queue-in-javascript-63dcd2c71ecd
        */
        expect(text).toMatch(category);
    });