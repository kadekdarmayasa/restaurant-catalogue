import { DrawerInitiator } from '../utils';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
  constructor({ button, drawer, appbar, app }) {
    this.button = button;
    this.drawer = drawer;
    this.appbar = appbar;
    this.app = app;

    this.initialAppShell();
  }

  initialAppShell() {
    DrawerInitiator.init({
      button: this.button,
      drawer: this.drawer,
      appbar: this.appbar,
    });
  }

  async renderPage() {
    DrawerInitiator.closeDrawer(this.drawer);

    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];

    if (!page) {
      window.location.href = '/';
      return;
    }

    const content = await page.render();
    this.app.innerHTML = content;
    await page.afterRender();

    const skipLink = document.getElementById('skipLink');
    skipLink.addEventListener('click', (event) => {
      event.preventDefault();
      document.getElementById('mainContent').focus();
    });
  }
}

export default App;
