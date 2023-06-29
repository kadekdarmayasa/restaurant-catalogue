import RESTAURANT_API_ENDPOINT from '../globals/api-endpoint';

class RestaurantCatalogueSource {
  static async listRestaurant() {
    const response = await fetch(RESTAURANT_API_ENDPOINT.LIST);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async detailRestaurant(restaurantId) {
    const response = await fetch(RESTAURANT_API_ENDPOINT.DETAIL(restaurantId));
    return response.json();
  }

  static async searchRestaurants(query) {
    const response = await fetch(RESTAURANT_API_ENDPOINT.SEARCH(query));
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async addCustomerReview({ restaurantId, name, review }) {
    const response = await fetch(RESTAURANT_API_ENDPOINT.ADD_REVIEW, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: restaurantId, name, review }),
    });

    return response.json();
  }
}

export default RestaurantCatalogueSource;
