import RestaurantCatalogueSource from '../../data/restaurant-catalogue-source';
import UrlParser from '../../routes/url-parser';
import {
  createTestimonyItemTemplate,
  createRestaruantDetailTemplate,
  createRestaruantDetailSkeletonTemplate,
} from '../templates/template-creator';
import LikeButtonPresenter from '../../presenters/like-button-presenter';
import { NavItemInitiator, OptionButtonInitiator, ReviewButtonInitiator } from '../../utils';
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';

const Detail = {
  async render() {
    return /* html */ `
      <nav class="breadcrumb" aria-label="breadcrumb">
        <a href="#/restaurants">Restaurants</a> <span id="activeBreadcrumb"></span> 
      </nav>  

      <main id="mainContent" tabindex="0">
        <section class="restaurant-detail" id="restaurantDetail">
          ${createRestaruantDetailSkeletonTemplate()}
        </section>
      </main>

      <div class="action-button-container">
        <div class="actions" id="actions">
          <div class="action-button" id="likeButtonContainer"></div>
          <div class="action-button" id="addReviewButtonContainer">
            <button type="button" id="addReviewButton" tabindex="-1">
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
    const { id: restaurantId } = UrlParser.parseActiveUrlWithoutCombiner();
    const { restaurant } = await RestaurantCatalogueSource.detailRestaurant(restaurantId);

    if (restaurant === undefined) {
      window.location.href = '#/restaurants';
      return;
    }

    NavItemInitiator.setActiveNavItem({
      navItems: document.querySelectorAll('.app-bar__navigation a'),
      pathName: '/detail',
    });

    const activeBreadcrumb = document.getElementById('activeBreadcrumb');
    document.title = `Restaurant ${restaurant.name}`;
    activeBreadcrumb.innerHTML = `/ ${restaurant.name}`;
    this.renderRestaurantDetailContent(restaurant);

    ReviewButtonInitiator.init({
      reviewButton: document.getElementById('addReviewButton'),
      restaurantId,
    });

    OptionButtonInitiator.init({
      optionButton: document.getElementById('optionButton'),
      actionsButton: document.getElementById('actions'),
    });

    await LikeButtonPresenter.init({
      likeButtonContainer: document.getElementById('likeButtonContainer'),
      favoriteRestaurant: FavoriteRestaurantIdb,
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        description: restaurant.description,
        pictureId: restaurant.pictureId,
        rating: restaurant.rating,
        city: restaurant.city,
        menus: [...restaurant.menus.foods, ...restaurant.menus.drinks],
        categories: restaurant.categories,
      },
    });
  },

  renderRestaurantDetailContent(restaurant) {
    const restaurantDetail = document.getElementById('restaurantDetail');

    restaurantDetail.innerHTML = createRestaruantDetailTemplate({
      ...restaurant,
      categories: restaurant.categories.map((category) => category.name).join(', '),
      foods: restaurant.menus.foods.map((food) => `<li>${food.name}</li>`).join(''),
      drinks: restaurant.menus.drinks.map((drink) => `<li>${drink.name}</li>`).join(''),
      customerReviews: restaurant.customerReviews
        .map((customer) => createTestimonyItemTemplate(customer))
        .join(''),
    });
  },
};

export default Detail;
