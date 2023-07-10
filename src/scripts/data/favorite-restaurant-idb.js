import { openDB } from 'idb';
import CONFIG from '../globals/config';

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = CONFIG;

const db = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id' });
  },
});

const FavoriteRestaurantIdb = {
  async getRestaurant(id) {
    if (!id) return;
    return (await db).get(OBJECT_STORE_NAME, id);
  },

  async getAllRestaurants() {
    return (await db).getAll(OBJECT_STORE_NAME);
  },

  async putRestaurant(restaurant) {
    if (!restaurant.hasOwnProperty('id')) return;
    return (await db).put(OBJECT_STORE_NAME, restaurant);
  },

  async deleteRestaurant(id) {
    return (await db).delete(OBJECT_STORE_NAME, id);
  },

  async searchRestaurants(query) {
    return (await this.getAllRestaurants()).filter((restaurant) => {
      const jammedQuery = query.replace(/\s/g, '').toLowerCase();

      const restaurantName = restaurant.name || '-';
      const jammedRestaurantName = restaurantName.replace(/\s/g, '').toLowerCase();

      const restaurantCategories = restaurant.categories || [];
      const jammedRestaurantCategories = restaurantCategories
        .reduce((carry, category) => carry.concat(category.name), '')
        .toLowerCase()
        .replace(/\s/g, '');

      const restaurantMenus = restaurant.menus || [];
      const jammedRestaurantMenus = restaurantMenus
        .reduce((carry, menu) => carry.concat(menu.name), '')
        .toLowerCase()
        .replace(/\s/g, '');

      return (
        jammedRestaurantName.indexOf(jammedQuery) !== -1 ||
        jammedRestaurantCategories.indexOf(jammedQuery) !== -1 ||
        jammedRestaurantMenus.indexOf(jammedQuery) !== -1
      );
    });
  },
};

export default FavoriteRestaurantIdb;
