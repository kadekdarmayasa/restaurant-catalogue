import RestaurantCatalogueSource from '../../data/restaurant-catalogue-source';
import {
  createRestaurantItemTemplate,
  createRestaurantItemSkeletonTemplate,
} from '../templates/template-creator';
import NavItemInitiator from '../../utils/nav-item-initiator';

const Home = {
  async render() {
    return /* html */ `
      <section id="hero" class="hero">
        <div class="hero__content">
          <picture>
            <source media="(min-width: 640px)" srcset="./images/heros/hero-image-large.jpg">
            <source media="(min-width: 480px)" srcset="./images/heros/hero-image-medium.jpg">
            <img class="hero__image" src="./images/heros/hero-image-small.jpg"
            alt="The picture of Chief cook at kitchen">
          </picture>

          <div class="hero__description">
            <h1 class="hero__headline">
              Discover <span>Culinary Delights</span> That Elevate Your <span>Dining Experience</span>
            </h1>
            <button type="button" class="hero__cta" id="showMeNowBtn">Show Me Now</button>
          </div>
        </div>
      </section>

      <main id="mainContent" tabindex="0">
        <section class="restaurant-catalogues" id="restaurantCatalogues">
          <div class="restaurant-catalogues__header">  
            <h2>Featured Catalogues</h2>
            <p>
              Browse our comprehensive restaurant catalogue and discover a culinary paradise filled with 
              extraordinary flavors and culinary artistry
            </p>
          </div>
          <div class="restaurant-catalogues__content" id="restaurantCataloguesContent"></div>
        </section>
      </main>
    `;
  },

  async afterRender() {
    document.title = 'RestoUp | Home';

    NavItemInitiator.setActiveNavItem({
      navItems: document.querySelectorAll('.app-bar__navigation a'),
      pathName: 'home',
    });

    const showMeNowBtn = document.getElementById('showMeNowBtn');
    const restaurantCatalogues = document.getElementById('restaurantCatalogues');

    showMeNowBtn.addEventListener('click', () => {
      window.scrollTo({
        top: restaurantCatalogues.offsetTop - 50,
        behavior: 'smooth',
      });
    });

    const restaurantCataloguesContent = document.getElementById('restaurantCataloguesContent');
    restaurantCataloguesContent.innerHTML = createRestaurantItemSkeletonTemplate().repeat(6);

    const restaurants = await RestaurantCatalogueSource.listRestaurant();
    restaurants.length = 8;
    restaurantCataloguesContent.innerHTML = '';

    restaurants.forEach((restaurant) => {
      restaurantCataloguesContent.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },
};

export default Home;
