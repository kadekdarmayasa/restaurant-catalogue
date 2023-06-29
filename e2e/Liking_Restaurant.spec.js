const assert = require('assert');

Feature('Liking Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorites');
});

Scenario('showing empty liked restaurants', ({ I }) => {
  I.seeElement('#restaurantCataloguesContent');
  I.see("Seems you don't have any favorite restaurant", '.empty-favorite__headline');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see("Seems you don't have any favorite restaurant", '.empty-favorite__headline');

  I.amOnPage('/');

  I.waitForElement('.catalogue-item__title a', 5);
  I.seeElement('.catalogue-item__title a');

  const firstRestaurant = locate('.catalogue-item__title a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.waitForElement('#activeBreadcrumb', 5);
  I.seeElement('#activeBreadcrumb');

  I.waitForElement('#restaurantName', 5);
  I.seeElement('#restaurantName');

  I.waitForElement('#restaurantAddress', 5);
  I.seeElement('#restaurantAddress');

  I.waitForElement('#restaurantImage', 5);
  I.seeElement('#restaurantImage');

  I.waitForElement('#optionButton', 5);
  I.seeElement('#optionButton');
  I.click('#optionButton');

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorites');
  I.seeElement('.catalogue-item');
  const likedRestaurantTitle = await I.grabTextFrom('.catalogue-item__title a');

  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});
