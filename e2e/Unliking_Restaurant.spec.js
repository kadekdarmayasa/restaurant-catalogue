const assert = require('assert');

Feature('Unliking Restaurant');

Before(({ I }) => {
  for (let i = 1; i <= 3; i++) {
    I.amOnPage('/');
    I.waitForElement('.restaurant-item__title a');
    I.seeElement('.restaurant-item__title a');
    I.click(locate('.restaurant-item__title a').at(i));
    I.waitForElement('#optionButton');
    I.seeElement('#optionButton');
    I.click('#optionButton');

    I.seeElement('#actions');
    within('#actions', () => {
      I.waitForElement('#likeButton');
      I.see('Like', '#likeButton');
      I.click('Like', '#likeButton');
    });
  }

  I.amOnPage('/');
});

Scenario('Unliking one restaurant', async ({ I }) => {
  I.amOnPage('/#/favorites');
  I.waitForElement('.restaurant-item__title a');
  I.seeNumberOfElements('.restaurant-item__title a', 3);

  const favoriteRestaurant = locate('.restaurant-item__title a').first();
  const favoriteRestaurantTitle = await I.grabTextFrom(favoriteRestaurant);

  I.click(favoriteRestaurant);
  I.waitForElement('#optionButton');
  I.seeElement('#optionButton');
  I.click('#optionButton');

  I.seeElement('#actions');
  within('#actions', () => {
    I.waitForElement('#unlikeButton');
    I.see('Unlike', '#unlikeButton');
    I.click('Unlike', '#unlikeButton');
  });

  I.amOnPage('/#/favorites');
  I.waitForElement('.restaurant-item__title a');

  const firstRestaurant = locate('.restaurant-item__title a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);

  assert.notStrictEqual(favoriteRestaurantTitle, firstRestaurantTitle);
});
