import RestaurantCatalogueSource from '../../data/restaurant-catalogue-source';
import { NavItemInitiator, SearchBarInitiator } from '../../utils';
import {
  createRestaurantItemTemplate,
  createRestaurantItemSkeletonTemplate,
  searchBarTemplate,
} from '../templates/template-creator';

const Restaurants = {
  async render() {
    return /* html */ `
      <main id="mainContent" tabindex="0">
        <section class="restaurant-catalogues restaurant-catalogues--space-top" id="restaurantCatalogues">
          <div class="restaurant-catalogues__header  restaurant-catalogues__header--column">
            <h1>Search Restaurants</h1>
          </div>
          ${searchBarTemplate()}
          <div class="restaurant-catalogues__content" id="restaurantCataloguesContent">
            ${createRestaurantItemSkeletonTemplate().repeat(6)}
          </div>
        </section>
      </main>
    `;
  },

  async afterRender() {
    document.title = 'RestoUp | Restaurants';

    NavItemInitiator.setActiveNavItem({
      navItems: document.querySelectorAll('.app-bar__navigation a'),
      pathName: 'restaurants',
    });

    const restaurantCataloguesContent = document.querySelector('#restaurantCataloguesContent');
    SearchBarInitiator.init({
      searchButton: document.querySelector('#searchButton'),
      query: document.querySelector('#query'),
      content: restaurantCataloguesContent,
      source: RestaurantCatalogueSource,
    });

    const restaurants = await RestaurantCatalogueSource.listRestaurant();
    restaurantCataloguesContent.innerHTML = restaurants.reduce(
      (carry, restaurant) => carry.concat(createRestaurantItemTemplate(restaurant)),
      '',
    );
  },
};

export default Restaurants;
