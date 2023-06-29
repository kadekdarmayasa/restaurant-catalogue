import RESTAURANT_API_ENDPOINT from '../../globals/api-endpoint';
import '../components/star';

const createCatalogueItemTemplate = (restaurant) => /* html */ `
  <article class="catalogue-item">
    <div class="catalogue-item__thumbnail">
      <img 
        src=${RESTAURANT_API_ENDPOINT.IMAGE('small', restaurant.pictureId)} 
        alt=${restaurant.name}
        crossorigin="anonymous"
      >
    </div>

    <div class="catalogue-item__title">
      <a href="#/detail/${restaurant.id}">
        <h3>${restaurant.name}</h3>
      </a>
      <small>${restaurant.city}</small>
    </div>

    <div class="catalogue-item__description">
      <p>${restaurant.description}</p>
    </div>

    <div class="catalogue-item__rate">
      <star-items value="${restaurant.rating}" height="40" width="40"></star-items>
      <span>(${restaurant.rating})</span>
    </div>
  </article>
`;

const createCatalogueItemSkeletonTemplate = () => /* html */ `
  <article class="catalogue-item">
    <div class="catalogue-item__thumbnail">
      <div class="skeleton skeleton__image"></div>
    </div>

    <div class="catalogue-item__title">
      <div class="skeleton skeleton__title"></div>
    </div>

    <div class="catalogue-item__description">
      <div class="skeleton skeleton__description"></div>
      <div class="skeleton skeleton__description"></div>
    </div>

    <div class="catalogue-item__rate">
      <div class="skeleton skeleton__rate"></div>
    </div>
  </article>
`;

const createEmptyStateTemplate = () => /* html */ `
  <div class="empty-favorite">
    <img src="/images/no-data.svg" alt="empty favorite restaurant" />
    <h2 class="empty-favorite__headline">Seems you don't have any favorite restaurant</h2>
    <a href="#/restaurants" class="empty-favorite__tagline">Add Now</a>
  </div>
  `;

const createNotFoundTemplate = () => /* html */ `
  <div class="not-found">
    <img src="/images/not-found.svg" alt="not found" />
    <h2 class="not-found__headline">Oops, no restaurant found</h2>
    <p class="not-found__tagline">Try another keyword</p>
  </div>
`;

const createTestimonyItemTemplate = (customer) => /* html */ `
  <div class="testimony-item">
    <div class="testimony-item__header">
      <h3 class="testimony-item__name">${customer.name}</h3>
      <p class="testimony-item__date">${customer.date}</p>
    </div>
    <p class="testimony-item__review">${customer.review}</p>
  </div>
`;

const createReviewFormTemplate = () => /* html */ `
  <div class="review-form">
    <div class="form-group">
      <label for="name">Name</label>
      <input type="text" id="name" name="name" class="form-control" placeholder="Your name" required>
    </div>
    <div class="form-group">
      <label for="review">Review</label>
      <textarea id="review" name="review" class="form-control" placeholder="Your review" required></textarea>
    </div>
  </div>
`;

const creaeteLikeRestaurantButtonTemplate = () => /* html */ `
  <button aria-label="like this restaurant" id="likeButton" class="like" tabindex="-1">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
    <span class="like">Like</span>
  </button>
`;

const createUnlikeRestaurantButtonTemplate = () => /* html */ `
  <button aria-label="unlike this restaurant" id="likeButton" class="like" tabindex="-1">
    <i class="fa fa-heart" aria-hidden="true"></i>
    <span class="unlike">Unlike</span>
  </button>
`;

export {
  createCatalogueItemTemplate,
  createCatalogueItemSkeletonTemplate,
  createTestimonyItemTemplate,
  createReviewFormTemplate,
  creaeteLikeRestaurantButtonTemplate,
  createUnlikeRestaurantButtonTemplate,
  createNotFoundTemplate,
  createEmptyStateTemplate,
};
