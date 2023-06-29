import RestaurantCatalogueSource from '../../data/restaurant-catalogue-source';
import { NavItemInitiator, SearchBarInitiator } from '../../utils';
import {
  createCatalogueItemTemplate,
  createCatalogueItemSkeletonTemplate,
} from '../templates/template-creator';

const Restaurants = {
  async render() {
    return /* html */ `
      <main class="main" id="mainContent" tabindex="0">
        <section class="restaurant-catalogues space-top" id="restaurantCatalogues">
          <div class="restaurant-catalogues__header column">
            <h1>Search Restaurants and Add Them To Your Favorites</h1>
            <p>Search quickly by restaurant name, category, or menu</p>
          </div>

          <div class="search-bar">
            <button id="searchButton" aria-label="search button" class="search-bar__button">
              <i class="fa-solid fa-search"></i>
            </button>
            <input 
              type="search"
              id="query"
              aria-label="search input" 
              placeholder="Search restaurant..."
              autofocus
            />
          </div>

          <div class="restaurant-catalogues__content" id="restaurantCataloguesContent">
          </div>
        </section>
      </main>
    `;
  },

  async afterRender() {
    NavItemInitiator.setActiveNavItem({
      navItems: document.querySelectorAll('.app-bar__navigation a'),
      pathName: 'restaurants',
    });

    const restaurantCataloguesContent = document.querySelector('#restaurantCataloguesContent');
    restaurantCataloguesContent.innerHTML = createCatalogueItemSkeletonTemplate().repeat(6);

    const restaurants = await RestaurantCatalogueSource.listRestaurant();
    restaurantCataloguesContent.innerHTML = '';

    restaurants.forEach((restaurant) => {
      restaurantCataloguesContent.innerHTML += createCatalogueItemTemplate(restaurant);
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
