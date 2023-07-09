import NavItemInitiator from '../../utils/nav-item-initiator';
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import FavoriteRestaruantSearchPresenter from '../../presenters/favorite-restaurant-search-presenter';
import FavoriteRestaruantShowPresenter from '../../presenters/favorite-restaurant-show-presenter';
import FavoriteRestaruantSearchView from './favorite-restaurants/favorite-restaurants-search-view';

const view = new FavoriteRestaruantSearchView();

const Favorites = {
  async render() {
    return /* html */ `
      <main id="mainContent" tabindex="0">
        <section 
          class="restaurant-catalogues restaurant-catalogues--space-top" id="restaurantCatalogues"
        >
          <div class="restaurant-catalogues__header  restaurant-catalogues__header--column">
            <h1>Search Restaurants</h1>
          </div>
          ${view.getTemplate()}
        </section>
      </main>
    `;
  },

  async afterRender() {
    document.title = 'RestoUp | Favorites';

    NavItemInitiator.setActiveNavItem({
      navItems: document.querySelectorAll('.app-bar__navigation a'),
      pathName: 'favorites',
    });

    new FavoriteRestaruantSearchPresenter({
      favoriteRestaurant: FavoriteRestaurantIdb,
      view,
    });

    new FavoriteRestaruantShowPresenter({
      favoriteRestaurant: FavoriteRestaurantIdb,
      view,
    });
  },
};

export default Favorites;
