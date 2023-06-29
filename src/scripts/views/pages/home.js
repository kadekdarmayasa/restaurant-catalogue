import RestaurantCatalogueSource from '../../data/restaurant-catalogue-source';
import {
  createCatalogueItemTemplate,
  createCatalogueItemSkeletonTemplate,
} from '../templates/template-creator';
import NavItemInitiator from '../../utils/nav-item-initiator';

const Home = {
  async render() {
    return /* html */ `
      <section id="hero" class="hero">
        <div class="hero__inner">
          <img class="hero__image" src="./images/heros/hero-image_1.jpg"
          alt="The picture of Chief cook at kitchen">

          <div class="hero__content">
            <h1 class="hero__headline">
              Discover <span>Culinary Delights</span> That Elevate Your <span>Dining Experience</span>
            </h1>
            <button type="button" class="hero__cta" id="showMeNowBtn">Show Me Now</button>
          </div>
        </div>
      </section>

      <main id="mainContent" class="main-content" tabindex="0">
        <section class="restaurant-catalogues" id="restaurantCatalogues">
          <div class="restaurant-catalogues__header">  
            <h2>Featured Catalogues</h2>
            <p>
              Browse our comprehensive restaurant catalogue and discover a culinary paradise filled with 
              extraordinary flavors and culinary artistry
            </p>
          </div>
          <div class="restaurant-catalogues__content" id="restaurantCataloguesContent"></div>
          <a href="#/restaurants" id="showMoreButton">
            Show more
            <i class="fa-solid fa-arrow-right"></i>
          </a>
        </section>
      </main>
    `;
  },

  async afterRender() {
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
    restaurantCataloguesContent.innerHTML = createCatalogueItemSkeletonTemplate().repeat(6);

    const restaurants = await RestaurantCatalogueSource.listRestaurant();
    restaurants.length = 6;
    restaurantCataloguesContent.innerHTML = '';

    restaurants.forEach((restaurant) => {
      restaurantCataloguesContent.innerHTML += createCatalogueItemTemplate(restaurant);
    });
  },
};

export default Home;
