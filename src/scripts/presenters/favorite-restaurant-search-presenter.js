class FavoriteRestaruantSearchPresenter {
  constructor({ favoriteRestaurant, view }) {
    this.view = view;
    this.favoriteRestaurant = favoriteRestaurant;
    this.listenToSearchRequestByUser();
  }

  listenToSearchRequestByUser() {
    this.view.runWhenUserIsSearching((query) => {
      this.searchRestaurants(query);
    });
  }

  showFoundRestaurants({ restaurants, firstRender }) {
    this.view.showFavoriteRestaurants({ restaurants, firstRender });
  }

  async searchRestaurants(latestQuery) {
    this._latestQuery = latestQuery.trim();
    let foundRestaurants;

    if (this.latestQuery.length === 0) {
      foundRestaurants = await this.favoriteRestaurant.getAllRestaurants();
      this.showFoundRestaurants({ restaurants: foundRestaurants, firstRender: true });
    } else {
      foundRestaurants = await this.favoriteRestaurant.searchRestaurants(this.latestQuery);
      this.showFoundRestaurants({ restaurants: foundRestaurants, firstRender: false });
    }
  }

  get latestQuery() {
    return this._latestQuery;
  }
}

export default FavoriteRestaruantSearchPresenter;
