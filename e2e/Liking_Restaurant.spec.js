const assert = require('assert');

const WAITING_TIME = 5;

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

  I.waitForVisible('.restaurant-item__title a', WAITING_TIME);
  I.seeElement('.restaurant-item__title a');

  const firstRestaurant = locate('.restaurant-item__title a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.waitForVisible('#activeBreadcrumb', WAITING_TIME);
  I.waitForVisible('#restaurantName', WAITING_TIME);
  I.waitForVisible('#restaurantAddress', WAITING_TIME);
  I.waitForVisible('#restaurantImage', WAITING_TIME);
  I.waitForVisible('#optionButton', WAITING_TIME);

  I.seeElement('#optionButton');
  I.click('#optionButton');

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorites');

  I.waitForVisible('.restaurant-item__title a');
  I.seeElement('.restaurant-item__title a');
  const likedRestaurantTitle = await I.grabTextFrom('.restaurant-item__title a');

  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});
