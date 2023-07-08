import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
import FavoriteRestaruantSearchPresenter from '../src/scripts/presenters/favorite-restaurant-search-presenter';
import FavoriteRestaruantSearchView from '../src/scripts/views/pages/favorite-restaurants/favorite-restaurants-search-view';

describe('Searching restaurants', () => {
  let presenter;
  let view;
  let favoriteRestaurant;

  const searchRestaurants = (query) => {
    const queryElement = document.getElementById('query');
    const searchButton = document.getElementById('searchButton');

    queryElement.value = query;
    searchButton.dispatchEvent(new Event('click'));
  };

  const setSearchRestaurantContainer = () => {
    view = new FavoriteRestaruantSearchView();
    document.body.innerHTML = view.getTemplate();
  };

  const constructPresenter = () => {
    favoriteRestaurant = spyOnAllFunctions(FavoriteRestaurantIdb);
    presenter = new FavoriteRestaruantSearchPresenter({ favoriteRestaurant, view });
  };

  beforeEach(() => {
    setSearchRestaurantContainer();
    constructPresenter();
  });

  describe('When query is not empty', () => {
    it('should be able to capture query typed by the user', () => {
      searchRestaurants('Kopi Kita');
      expect(presenter.latestQuery).toEqual('Kopi Kita');
    });

    it('should ask the model to search for restaurants', () => {
      searchRestaurants('Kopi Kita');
      expect(favoriteRestaurant.searchRestaurants).toHaveBeenCalledWith('Kopi Kita');
    });

    it('should show the restaurants found by Favorite Restaurants', (done) => {
      favoriteRestaurant.searchRestaurants.withArgs('Kopi').and.returnValues([
        { id: 111, name: 'Kopi Kita' },
        { id: 112, name: 'Kopi Magic' },
      ]);
      searchRestaurants('Kopi');
      document
        .getElementById('restaurantCataloguesContent')
        .addEventListener('restaurants:updated', () => {
          expect(document.querySelectorAll('.restaurant-item').length).toEqual(2);
          done();
        });
    });

    it('should show the name of restaurants found by Favorite Restaurants', (done) => {
      favoriteRestaurant.searchRestaurants.withArgs('Kopi').and.returnValues([
        { id: 111, name: 'Kopi Kita' },
        { id: 112, name: 'Kopi Magic' },
      ]);
      searchRestaurants('Kopi');
      document
        .getElementById('restaurantCataloguesContent')
        .addEventListener('restaurants:updated', () => {
          const restaurantItemsName = document.querySelectorAll('.restaurant-item__name');
          expect(restaurantItemsName.item(0).innerText).toEqual('Kopi Kita');
          expect(restaurantItemsName.item(1).innerText).toEqual('Kopi Magic');
          done();
        });
    });

    it('should show - when restaurants found by Favorite Restaurants have no name', (done) => {
      favoriteRestaurant.searchRestaurants.withArgs('restaurant a').and.returnValues([{ id: 111 }]);
      searchRestaurants('restaurant a');
      document
        .getElementById('restaurantCataloguesContent')
        .addEventListener('restaurants:updated', () => {
          const restaurantItemsName = document.querySelectorAll('.restaurant-item__name');
          expect(restaurantItemsName.item(0).innerText).toEqual('-');
          done();
        });
    });
  });

  describe('When no restaurants could be found by Favorite Restaurants', () => {
    it('should show the information that no restaurants found', (done) => {
      favoriteRestaurant.searchRestaurants.withArgs('abcdefg').and.returnValues([]);
      searchRestaurants('abcdefg');
      document
        .getElementById('restaurantCataloguesContent')
        .addEventListener('restaurants:updated', () => {
          expect(document.querySelector('.not-found')).toBeTruthy();
          expect(document.querySelector('.not-found__headline').innerText).toEqual(
            'Oops, no restaurant found',
          );
          done();
        });
    });

    it('should not show any restaurant', (done) => {
      favoriteRestaurant.searchRestaurants.withArgs('abcdefg').and.returnValues([]);
      searchRestaurants('abcdefg');
      document
        .getElementById('restaurantCataloguesContent')
        .addEventListener('restaurants:updated', () => {
          expect(document.querySelectorAll('.restaurant-item').length).toEqual(0);
          done();
        });
    });
  });

  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
      searchRestaurants(' ');
      expect(presenter.latestQuery.length).toEqual(0);
    });

    it('should show all favorite restaurants', () => {
      searchRestaurants(' ');
      expect(favoriteRestaurant.getAllRestaurants).toHaveBeenCalled();
    });
  });
});
