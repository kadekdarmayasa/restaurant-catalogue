class FavoriteRestaruantShowPresenter {
  constructor({ favoriteRestaurant, view }) {
    this.view = view;
    this.favoriteRestaurant = favoriteRestaurant;
    this.showFavoriteRestaurants();
  }

  async showFavoriteRestaurants() {
    const restaurants = await this.favoriteRestaurant.getAllRestaurants();
    this.displayRestaurants(restaurants);
  }

  displayRestaurants(restaurants) {
    this.view.showFavoriteRestaurants({ restaurants, firstRender: true });
  }
}

export default FavoriteRestaruantShowPresenter;
