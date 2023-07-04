Feature('Unliking Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/restaurants');
  I.waitForElement('.restaurant-item__title a');
  I.seeElement('.restaurant-item__title a');
  I.click(locate('.restaurant-item__title a').first());
  I.waitForElement('#optionButton');
  I.seeElement('#optionButton');
  I.click('#optionButton');

  I.seeElement('#actions');
  within('#actions', () => {
    I.waitForElement('#likeButton');
    I.see('Like', '#likeButton');
    I.click('Like', '#likeButton');
  });
});

Scenario('Unliking one restaurant', async ({ I }) => {
  I.amOnPage('/#/favorites');
  I.waitForElement('.restaurant-item__title a');
  I.click(locate('.restaurant-item__title a').first());
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
  I.see("Seems you don't have any favorite restaurant", '.empty-state__headline');
});
