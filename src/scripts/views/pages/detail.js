import RestaurantCatalogueSource from '../../data/restaurant-catalogue-source';
import RESTAURANT_API_ENDPOINT from '../../globals/api-endpoint';
import UrlParser from '../../routes/url-parser';
import { createTestimonyItemTemplate } from '../templates/template-creator';
import {
  LikeButtonPresenter,
  NavItemInitiator,
  OptionButtonInitiator,
  ReviewButtonInitiator,
} from '../../utils';
import '../components/star';
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';

const Detail = {
  async render() {
    return /* html */ `
      <nav class="breadcrumb" aria-label="breadcrumb">
        <a href="#/restaurants">Restaurants</a> / <span id="activeBreadcrumb"></span> 
      </nav>  

      <main class="main-content" id="mainContent"  tabindex="0">
        <section class="restaurant-detail">
          <div class="restaurant-detail__header">
            <h1 class="restaurant-detail__name" id="restaurantName"></h1>
            <p class="restaurant-detail__address" id="restaurantAddress"></p>
            <div class="restaurant-detail__image">
              <img src="" alt="" id="restaurantImage" crossorigin="anonymous" />
            </div>
            <div class="restaurant-detail__rate" id="restaurantRate" aria-label="restaurant rating"></div>
          </div>

          <div class="restaurant-detail__content">
            <div class="restaurant-detail__categories">
              <h2>Categories</h2>
              <p></p>
            </div>
            <div class="restaurant-detail__description">
              <p></p>
            </div>
            <div class="restaurant-detail__menu">
              <div class="food-menu">
                <h2>Food Menus</h2>
                <ul class="menu-list" id="foodMenuList"></ul>
              </div>
              <div class="drink-menu">
                <h2>Drink Menus</h2>
                <ul class="menu-list" id="drinkMenuList"></ul>
              </div>
            </div>
            <div class="restaurant-detail__testimony">
              <h2>Customer Reviews</h2>
              <div class="testimony-list" id="testimonyList"></div>
            </div>
          </div>
        </section>
      </main>

      <div class="action-button-container">
        <div class="actions" id="actions">
          <div class="action-button" id="likeButtonContainer"></div>
          <div class="action-button" id="addReviewButtonContainer">
            <button id="addReviewButton" tabindex="-1">
              <i class="fa-regular fa-comment"></i>
              <span>Add Review</span>
            </button>
          </div>
        </div>

        <button class="option-button" id="optionButton" aria-label="show action options">
          <i class="fa-solid fa-ellipsis-vertical"></i>
        </button>
      </div>
    `;
  },

  async afterRender() {
    NavItemInitiator.setActiveNavItem({
      navItems: document.querySelectorAll('.app-bar__navigation a'),
      pathName: '/detail',
    });

    const activeBreadcrumb = document.getElementById('activeBreadcrumb');
    const { id: restaurantId } = UrlParser.parseActiveUrlWithoutCombiner();
    const { restaurant } = await RestaurantCatalogueSource.detailRestaurant(restaurantId);

    if (restaurant === undefined) {
      window.location.href = '#/restaurants';
      return;
    }

    activeBreadcrumb.innerHTML = restaurant.name;
    this.renderRestaurantDetailHeader(restaurant);
    this.renderRestaurantDetailContent(restaurant);

    OptionButtonInitiator.init({
      optionButton: document.getElementById('optionButton'),
      actionsButton: document.getElementById('actions'),
    });

    LikeButtonPresenter.init({
      likeButtonContainer: document.getElementById('likeButtonContainer'),
      favoriteRestaurant: FavoriteRestaurantIdb,
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        description: restaurant.description,
        pictureId: restaurant.pictureId,
        rating: restaurant.rating,
        city: restaurant.city,
      },
    });

    ReviewButtonInitiator.init({
      reviewButton: document.getElementById('addReviewButton'),
      restaurantId,
    });
  },

  renderRestaurantDetailHeader(restaurant) {
    const { rating, name, address, city, pictureId } = restaurant;

    const starItems = document.createElement('star-items');
    starItems.setAttribute('value', rating);
    starItems.setAttribute('height', 40);
    starItems.setAttribute('width', 40);

    const restaurantName = document.getElementById('restaurantName');
    const restaurantAddress = document.getElementById('restaurantAddress');
    const restaurantImage = document.getElementById('restaurantImage');
    const restaurantRate = document.getElementById('restaurantRate');

    restaurantName.innerHTML = name;
    restaurantAddress.innerHTML = `${address}, ${city}`;
    restaurantImage.src = RESTAURANT_API_ENDPOINT.IMAGE('large', pictureId);
    restaurantImage.alt = name;
    restaurantRate.innerHTML = starItems.outerHTML;
    restaurantRate.innerHTML += `(${rating})`;
  },

  renderRestaurantDetailContent(restaurant) {
    const {
      categories,
      description,
      menus: { foods, drinks },
      customerReviews,
    } = restaurant;

    const restaurantCategories = document.querySelector('.restaurant-detail__categories > p');
    const restaurantDescription = document.querySelector('.restaurant-detail__description > p');
    const foodMenuList = document.getElementById('foodMenuList');
    const drinkMenuList = document.getElementById('drinkMenuList');
    const testimonyList = document.getElementById('testimonyList');

    restaurantCategories.innerHTML = categories.map((category) => category.name).join(', ');
    restaurantDescription.innerHTML = description;
    foodMenuList.innerHTML = foods.map((food) => `<li>${food.name}</li>`).join('');
    drinkMenuList.innerHTML = drinks.map((drink) => `<li>${drink.name}</li>`).join('');
    testimonyList.innerHTML = customerReviews
      .map((customer) => createTestimonyItemTemplate(customer))
      .join('');
  },
};

export default Detail;
