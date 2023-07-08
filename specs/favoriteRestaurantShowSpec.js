import FavoriteRestaruantSearchView from '../src/scripts/views/pages/favorite-restaurants/favorite-restaurants-search-view';
import FavoriteRestaurantShowPresenter from '../src/scripts/presenters/favorite-restaurant-show-presenter';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';

describe('Showing all favorite movies', () => {
  let view;
  let favoriteRestaurant;

  const renderTemplate = () => {
    view = new FavoriteRestaruantSearchView();
    document.body.innerHTML = view.getTemplate();
  };

  const constructSpy = () => {
    favoriteRestaurant = spyOnAllFunctions(FavoriteRestaurantIdb);
  };

  beforeEach(() => {
    renderTemplate();
    constructSpy();
  });

  describe('When no restaurants have been liked', () => {
    it('should ask for the Favorite Restaurants', () => {
      new FavoriteRestaurantShowPresenter({ favoriteRestaurant, view });
      expect(favoriteRestaurant.getAllRestaurants).toHaveBeenCalledTimes(1);
    });

    it('should show the information that no restaurants have been liked', (done) => {
      favoriteRestaurant.getAllRestaurants.and.returnValues([]);
      new FavoriteRestaurantShowPresenter({ favoriteRestaurant, view });
      document
        .getElementById('restaurantCataloguesContent')
        .addEventListener('restaurants:updated', () => {
          expect(document.querySelector('.empty-state')).toBeTruthy();
          expect(document.querySelector('.empty-state__headline').innerText).toEqual(
            "Seems you don't have any favorite restaurant",
          );
          done();
        });
    });
  });

  describe('When favorite restaurants exist', () => {
    it('should show the restaurants found by Favorite Restaurants', (done) => {
      favoriteRestaurant.getAllRestaurants.and.returnValues([
        { id: 121, name: 'Kopi Kita' },
        { id: 122, name: 'Kopi Magic' },
      ]);
      new FavoriteRestaurantShowPresenter({ favoriteRestaurant, view });
      document
        .getElementById('restaurantCataloguesContent')
        .addEventListener('restaurants:updated', () => {
          expect(document.querySelectorAll('.restaurant-item').length).toEqual(2);
          done();
        });
    });
  });
});
