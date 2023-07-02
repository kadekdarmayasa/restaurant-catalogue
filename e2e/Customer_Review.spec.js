Feature('Customer Review');

Before(({ I }) => {
  I.amOnPage('/#/detail/w9pga3s2tubkfw1e867');
  I.waitForElement('#optionButton');
  I.seeElement('#optionButton');
  I.click('#optionButton');

  I.seeElement('#actions');
  within('#actions', () => {
    I.waitForElement('#addReviewButton');
    I.see('Add Review', '#addReviewButton');
    I.click('Add Review', '#addReviewButton');
  });
});

Scenario('Add a review', ({ I }) => {
  within('.swal2-popup', () => {
    I.seeElement('#name');
    I.fillField('#name', 'John Doe');
    I.seeElement('#review');
    I.fillField('#review', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
    I.click('Submit Review', '.swal2-confirm');
  });

  I.waitForElement('.swal2-toast');
  within('.swal2-toast', () => {
    I.see('Your review has been submitted!', '.swal2-title');
  });
});

Scenario('Add a review with blank input field', ({ I }) => {
  within('.swal2-popup', () => {
    I.seeElement('#review');
    I.fillField('#review', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
    I.click('Submit Review', '.swal2-confirm');
  });

  I.waitForElement('.swal2-toast');
  within('.swal2-toast', () => {
    I.see('Please fill in all fields', '.swal2-title');
  });
});
