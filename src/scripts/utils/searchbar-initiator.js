import {
  createCatalogueItemTemplate,
  createNotFoundTemplate,
  createCatalogueItemSkeletonTemplate,
} from '../views/templates/template-creator';

const SearchBarInitiator = {
  init({ searchButton, query, content, source }) {
    this.content = content;
    this.source = source;

    searchButton.addEventListener('click', (event) => {
      this.searchRestaurants(event, query);
    });

    query.addEventListener('keyup', (event) => {
      if (event.keyCode === 13) this.searchRestaurants(event, query);
    });
  },

  async searchRestaurants(event, query) {
    event.preventDefault();
    this.content.innerHTML = createCatalogueItemSkeletonTemplate().repeat(6);

    if (query.value === '') {
      this.renderAllRestaurants();
      return;
    }

    const restaurants = await this.source.searchRestaurants(query.value);
    this.renderSearchResults(restaurants);
  },

  async renderAllRestaurants() {
    this.content.innerHTML = '';

    const restaurants = await this.source.listRestaurant();
    restaurants.forEach((restaurant) => {
      this.content.innerHTML += createCatalogueItemTemplate(restaurant);
    });
  },

  async renderSearchResults(restaurants) {
    this.content.innerHTML = '';

    if (restaurants.length === 0) this.renderNotFound();
    restaurants.forEach((restaurant) => {
      this.content.innerHTML += createCatalogueItemTemplate(restaurant);
    });
  },

  renderNotFound() {
    this.content.innerHTML = '';
    this.content.innerHTML = createNotFoundTemplate();
  },
};

export default SearchBarInitiator;
