import RestaurantCatalogueSource from '../../data/restaurant-catalogue-source';
import { NavItemInitiator, SearchBarInitiator } from '../../utils';
import {
  createRestaurantItemTemplate,
  createRestaurantItemSkeletonTemplate,
} from '../templates/template-creator';

const Restaurants = {
  async render() {
    return /* html */ `
      <main id="mainContent" tabindex="0">
        <section 
          class="restaurant-catalogues restaurant-catalogues--space-top" id="restaurantCatalogues"
        >
          <div class="restaurant-catalogues__header  restaurant-catalogues__header--column">
            <h1>Search Restaurants</h1>
          </div>

          <div class="search-bar">
            <button id="searchButton" aria-label="search button" class="search-bar__button">
              <i class="fa-solid fa-search"></i>
            </button>
            <input 
              type="search"
              id="query"
              class="search-bar__input"
              aria-label="search input" 
              placeholder="search by name or menu..."
            />
          </div>

          <div class="restaurant-catalogues__content" id="restaurantCataloguesContent">
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
    restaurantCataloguesContent.innerHTML = createRestaurantItemSkeletonTemplate().repeat(6);

    const restaurants = await RestaurantCatalogueSource.listRestaurant();
    restaurantCataloguesContent.innerHTML = '';

    restaurants.forEach((restaurant) => {
      restaurantCataloguesContent.innerHTML += createRestaurantItemTemplate(restaurant);
    });

    SearchBarInitiator.init({
      searchButton: document.querySelector('#searchButton'),
      query: document.querySelector('#query'),
      content: restaurantCataloguesContent,
      source: RestaurantCatalogueSource,
    });
  },
};

export default Restaurants;
