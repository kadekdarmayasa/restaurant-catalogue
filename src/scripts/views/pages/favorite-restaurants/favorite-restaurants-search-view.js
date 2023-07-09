import {
  createNotFoundTemplate,
  createEmptyStateTemplate,
  createRestaurantItemTemplate,
} from '../../templates/template-creator';

class FavoriteRestaruantSearchView {
  getTemplate() {
    return `
      <div class="search-bar">
        <button id="searchButton" aria-label="search button" class="search-bar__button">
          <i class="fa-solid fa-search"></i>
        </button>
        <input 
          type="search"
          id="query"
          class="search-bar__input"
          aria-label="search input" 
          placeholder="Search by name..."
        />
      </div>
      <div class="restaurant-catalogues__content" id="restaurantCataloguesContent">
      </div>
    `;
  }

  showFavoriteRestaurants({ restaurants = [], firstRender = true }) {
    let html;

    if (restaurants.length) {
      html = restaurants.reduce(
        (carry, restaurant) => carry.concat(createRestaurantItemTemplate(restaurant)),
        '',
      );
    } else {
      html = firstRender ? createEmptyStateTemplate() : createNotFoundTemplate();
    }

    document.getElementById('restaurantCataloguesContent').innerHTML = html;
    document
      .getElementById('restaurantCataloguesContent')
      .dispatchEvent(new Event('restaurants:updated'));
  }

  runWhenUserIsSearching(callback) {
    const queryElement = document.getElementById('query');
    const searchButton = document.getElementById('searchButton');

    queryElement.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') callback(queryElement.value);
    });

    searchButton.addEventListener('click', () => {
      callback(queryElement.value);
    });
  }
}

export default FavoriteRestaruantSearchView;
