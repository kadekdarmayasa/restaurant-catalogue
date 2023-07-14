import RESTAURANT_API_ENDPOINT from '../../globals/api-endpoint';

const createRestaurantItemTemplate = (restaurant) => /* html */ `
  <article class="restaurant-item">
    <div class="restaurant-item__thumbnail">
      <img 
        class="lazyload"
        src=${RESTAURANT_API_ENDPOINT.IMAGE('small', restaurant.pictureId)} 
        alt="${restaurant.name}"
        crossorigin="anonymous"
      >
    </div>

    <div class="restaurant-item__title">
      <a href="#/detail/${restaurant.id}">
        <h3 class="restaurant-item__name">${restaurant.name || '-'}</h3>
      </a>
      <small>${restaurant.city}</small>
    </div>

    <div class="restaurant-item__description">
      <p>${restaurant.description}</p>
    </div>

    <div class="restaurant-item__rate">
      <star-items value="${restaurant.rating}" height="40" width="40"></star-items>
      <span>(${restaurant.rating})</span>
    </div>
  </article>
`;

const createRestaurantItemSkeletonTemplate = () => /* html */ `
  <article class="restaurant-item">
    <div class="restaurant-item__thumbnail">
      <div class="skeleton skeleton__image"></div>
    </div>

    <div class="restaurant-item__title">
      <div class="skeleton skeleton__title"></div>
    </div>

    <div class="restaurant-item__description">
      <div class="skeleton skeleton__description"></div>
      <div class="skeleton skeleton__description"></div>
    </div>

    <div class="restaurant-item__rate">
      <div class="skeleton skeleton__rate"></div>
    </div>
  </article>
`;

const createEmptyStateTemplate = () => /* html */ `
  <div class="empty-state">
    <img src="/images/no-data.svg" alt="empty favorite restaurant" />
    <h2 class="empty-state__headline">Seems you don't have any favorite restaurant</h2>
    <a href="#/restaurants" class="empty-state__button">Add Now</a>
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
  <div class="testimony-item glide__slide">
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
  <button type="button" id="likeButton" class="like" tabindex="-1">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
    <span class="like">Like</span>
  </button>
`;

const createUnlikeRestaurantButtonTemplate = () => /* html */ `
  <button type="button" id="unlikeButton" class="like" tabindex="-1">
    <i class="fa fa-heart" aria-hidden="true"></i>
    <span class="unlike">Unlike</span>
  </button>
`;

const createRestaruantDetailTemplate = (restaurant) => /* html */ `
  <div class="restaurant-detail__header">
    <h1 class="restaurant-detail__name">${restaurant.name}</h1>
    <p class="restaurant-detail__address">${restaurant.address}</p>
    <div class="restaurant-detail__image">
      <img 
        src="${RESTAURANT_API_ENDPOINT.IMAGE('large', restaurant.pictureId)}" 
        alt="${restaurant.name}" crossorigin="anonymous"
       />
    </div>
    <div class="restaurant-detail__rate" aria-label="restaurant rating">
      <star-items value="${restaurant.rating}" height="40" width="40"></star-items> 
      (${restaurant.rating})
    </div>
  </div>
  <div class="restaurant-detail__content">
    <div class="restaurant-detail__categories">
      <h2>Categories</h2>
      <p>${restaurant.categories}</p>
    </div>
    <div class="restaurant-detail__description">
      <p>${restaurant.description}</p>
    </div>
    <div class="restaurant-detail__menu">
      <div class="food-menu">
        <h2>Food Menus</h2>
        <ul class="menu-list" id="foodMenuList">${restaurant.foods}</ul>
      </div>
      <div class="drink-menu">
        <h2>Drink Menus</h2>
        <ul class="menu-list" id="drinkMenuList">${restaurant.drinks}</ul>
      </div>
    </div>
    <div class="restaurant-detail__testimony">
      <h2>Customer Reviews</h2>
      <div class="glide">
        <div data-glide-el="controls" class="glide__controls">
          <button data-glide-dir="<" class="glide__controls--prev" aria-label="Prev Slide">
            <i class="fa-solid fa-chevron-right"></i>
          </button>
          <button data-glide-dir=">" class="glide__controls--next" aria-label="Next Slide">
            <i class="fa-solid fa-chevron-right"></i>
          </button>
        </div>
        <div class="glide__track" data-glide-el="track">
          <ul class="glide__slides" id="testimonyList">
            ${restaurant.customerReviews}
          </ul>
        </div>
      </div>
    </div>
  </div>
`;

const createRestaruantDetailSkeletonTemplate = () => /* html */ `
  <div class="restaurant-detail__header">
    <div class="restaurant-detail__name--skeleton"></div>
    <div class="restaurant-detail__address--skeleton"></div>
    <div class="restaurant-detail__image--skeleton"></div>
  </div>
  <div class="restaurant-detail__content">
    <div class="restaurant-detail__categories--skeleton">
    </div>
    ${'<div class="restaurant-detail__description--skeleton"></div>'.repeat(5)}
  </div>
`;

const searchBarTemplate = () => /* html */ `
  <div class="search-bar">
    <button id="searchButton" aria-label="search button" class="search-bar__button">
      <i class="fa-solid fa-search"></i>
    </button>
    <input 
      type="search"
      id="query"
      class="search-bar__input"
      aria-label="search input" 
      placeholder="E.g. Kafe Kita"
    />
  </div>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantItemSkeletonTemplate,
  createTestimonyItemTemplate,
  createReviewFormTemplate,
  creaeteLikeRestaurantButtonTemplate,
  createUnlikeRestaurantButtonTemplate,
  createNotFoundTemplate,
  createEmptyStateTemplate,
  createRestaruantDetailTemplate,
  createRestaruantDetailSkeletonTemplate,
  searchBarTemplate,
};
