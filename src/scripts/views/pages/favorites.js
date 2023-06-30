import NavItemInitiator from '../../utils/nav-item-initiator';
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import {
  createRestaurantItemTemplate,
  createEmptyStateTemplate,
} from '../templates/template-creator';

const Favorites = {
  async render() {
    return /* html */ `
      <main id="mainContent" class="main-content" tabindex="0">
        <section class="restaurant-catalogues space-top" id="restaurantCatalogues">
          <div class="restaurant-catalogues__content" id="restaurantCataloguesContent">
          </div>
        </section>
      </main>
    `;
  },

  async afterRender() {
    NavItemInitiator.setActiveNavItem({
      navItems: document.querySelectorAll('.app-bar__navigation a'),
      pathName: 'favorites',
    });

    const restaurantCataloguesContent = document.querySelector('#restaurantCataloguesContent');
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();

    if (restaurants.length === 0) {
      restaurantCataloguesContent.innerHTML = createEmptyStateTemplate();
      return;
    }

    restaurants.forEach((restaurant) => {
      restaurantCataloguesContent.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },
};

export default Favorites;
