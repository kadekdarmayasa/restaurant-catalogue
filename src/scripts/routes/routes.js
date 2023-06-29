import Home from '../views/pages/home';
import Restaurants from '../views/pages/restaurants';
import Favorites from '../views/pages/favorites';
import Detail from '../views/pages/detail';

const routes = {
  '/': Home,
  '/home': Home,
  '/restaurants': Restaurants,
  '/favorites': Favorites,
  '/detail/:id': Detail,
};

export default routes;
