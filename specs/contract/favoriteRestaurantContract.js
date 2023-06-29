const itsActAsFavoriteRestaurantModel = (favoriteRestaurantModel) => {
  it('should return the restaurant that has been added', async () => {
    await favoriteRestaurantModel.putRestaurant({ id: 1 });
    await favoriteRestaurantModel.putRestaurant({ id: 2 });

    expect(await favoriteRestaurantModel.getRestaurant(1)).toEqual({ id: 1 });
    expect(await favoriteRestaurantModel.getRestaurant(2)).toEqual({ id: 2 });
  });

  it('should refuse a restaurant from being added if it does not have the correct property', async () => {
    await favoriteRestaurantModel.putRestaurant({ aProperty: 'aValue' });

    expect(await favoriteRestaurantModel.getAllRestaurants()).toEqual([]);
  });

  it('can return all of the restaurants that have been added', async () => {
    await favoriteRestaurantModel.putRestaurant({ id: 1 });
    await favoriteRestaurantModel.putRestaurant({ id: 2 });

    expect(await favoriteRestaurantModel.getAllRestaurants()).toEqual([{ id: 1 }, { id: 2 }]);
  });

  it('should remove favorite restaurant', async () => {
    await favoriteRestaurantModel.putRestaurant({ id: 1 });
    await favoriteRestaurantModel.putRestaurant({ id: 2 });
    await favoriteRestaurantModel.putRestaurant({ id: 3 });

    await favoriteRestaurantModel.deleteRestaurant(1);

    expect(await favoriteRestaurantModel.getAllRestaurants()).toEqual([{ id: 2 }, { id: 3 }]);
  });

  it('should handle request to remove a restaurant even though the restaurant has not been added', async () => {
    await favoriteRestaurantModel.putRestaurant({ id: 1 });
    await favoriteRestaurantModel.putRestaurant({ id: 2 });
    await favoriteRestaurantModel.putRestaurant({ id: 3 });

    await favoriteRestaurantModel.deleteRestaurant(4);

    expect(await favoriteRestaurantModel.getAllRestaurants()).toEqual([
      { id: 1 },
      { id: 2 },
      { id: 3 },
    ]);
  });
};

export { itsActAsFavoriteRestaurantModel };
