const assert = require('assert');

const WAITING_TIME = 5;
const RESTAURANT_ITEM_COUNT = 3;

Feature('Unliking Restaurant');

Before(({ I }) => {
  I.amOnPage('/');

  for (let i = 1; i <= RESTAURANT_ITEM_COUNT; i++) {
    I.waitForVisible('.restaurant-item__title a', WAITING_TIME);
    I.seeElement('.restaurant-item__title a');
    I.click(locate('.restaurant-item__title a').at(i));

    I.waitForVisible('#activeBreadcrumb', WAITING_TIME);
    I.waitForVisible('#restaurantName', WAITING_TIME);
    I.waitForVisible('#restaurantAddress', WAITING_TIME);
    I.waitForVisible('#restaurantImage', WAITING_TIME);

    I.waitForVisible('#optionButton', WAITING_TIME);
    I.click('#optionButton');

    I.seeElement('#likeButton');
    I.click('#likeButton');

    I.amOnPage('/');
  }
});

Scenario('Unliking one restaurant', async ({ I }) => {
  I.amOnPage('/#/favorites');

  I.waitForVisible('.restaurant-item__title a', WAITING_TIME);
  I.seeElement('.restaurant-item__title a');

  const favoriteRestaurant = locate('.restaurant-item__title a').first();
  const favoriteRestaurantTitle = await I.grabTextFrom(favoriteRestaurant);

  I.click(favoriteRestaurant);

  I.waitForVisible('#optionButton', WAITING_TIME);
  I.seeElement('#optionButton');
  I.click('#optionButton');

  I.seeElement('#unlikeButton');
  I.click('#unlikeButton');

  I.amOnPage('/#/favorites');
  I.waitForVisible('.restaurant-item__title a', WAITING_TIME);

  const firstRestaurant = locate('.restaurant-item__title a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);

  assert.notStrictEqual(favoriteRestaurantTitle, firstRestaurantTitle);
});
