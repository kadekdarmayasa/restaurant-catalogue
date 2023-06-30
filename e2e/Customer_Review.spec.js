const WAITING_TIME = 5;

Feature('Customer Review');

Before(({ I }) => {
  I.amOnPage('/');

  I.waitForVisible('.restaurant-item__title a', WAITING_TIME);
  I.click(locate('.restaurant-item__title a').first());

  I.waitForVisible('#activeBreadcrumb', WAITING_TIME);
  I.waitForVisible('#restaurantName', WAITING_TIME);
  I.waitForVisible('#restaurantAddress', WAITING_TIME);
  I.waitForVisible('#restaurantImage', WAITING_TIME);

  I.waitForVisible('#optionButton', WAITING_TIME);
  I.seeElement('#optionButton');
  I.click('#optionButton');

  I.seeElement('#addReviewButton');
  I.click('#addReviewButton');
});

Scenario('Add a new customer review', async ({ I }) => {
  within('.swal2-popup', () => {
    I.seeElement('#name');
    I.fillField('#name', 'John Doe');

    I.seeElement('#review');
    I.fillField('#review', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.');

    I.click('.swal2-confirm');
  });

  I.waitForVisible('.swal2-toast', WAITING_TIME);
  within('.swal2-toast', () => {
    I.see('Your review has been submitted!', '.swal2-title');
  });
});

Scenario('Add a new customer review with blank input field', ({ I }) => {
  within('.swal2-popup', () => {
    I.seeElement('#review');
    I.fillField('#review', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.');

    I.click('.swal2-confirm');
  });

  I.waitForVisible('.swal2-toast', WAITING_TIME);
  within('.swal2-toast', () => {
    I.see('Please fill in all fields', '.swal2-title');
  });
});
