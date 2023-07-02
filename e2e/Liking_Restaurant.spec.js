const assert = require('assert');

Feature('Liking Restaurant');

Scenario('Liking one restaurant', async ({ I }) => {
  I.amOnPage('/#/favorites');
  I.see("Seems you don't have any favorite restaurant", '.empty-state__headline');
  I.waitForElement('.empty-state__button');
  I.see('Add Now', '.empty-state__button');
  I.click('Add Now', '.empty-state__button');
  I.amOnPage('/#/restaurants');
  I.waitForElement('.restaurant-item__title a');
  I.seeElement('.restaurant-item__title a');

  const firstRestaurant = locate('.restaurant-item__title a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);

  I.click(firstRestaurant);
  I.waitForElement('#optionButton');
  I.seeElement('#optionButton');
  I.click('#optionButton');

  I.seeElement('#actions');
  within('#actions', () => {
    I.waitForElement('#likeButton');
    I.see('Like', '#likeButton');
    I.click('Like', '#likeButton');
  });

  I.amOnPage('/#/favorites');
  I.waitForElement('.restaurant-item__title a');
  I.seeElement('.restaurant-item__title a');

  const likedRestaurantTitle = await I.grabTextFrom('.restaurant-item__title a');

  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});
