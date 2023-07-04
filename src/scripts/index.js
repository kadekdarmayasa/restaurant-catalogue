import 'regenerator-runtime';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import '../scss/index.scss';
import App from './views/app';
import swRegister from './utils/sw-register';

const app = new App({
  button: document.getElementById('hamburgerButton'),
  drawer: document.getElementById('navigationDrawer'),
  appbar: document.getElementById('appBar'),
  app: document.getElementById('app'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
  window.scrollTo({ top: 0 });
});

window.addEventListener('DOMContentLoaded', () => {
  app.renderPage();
  window.scrollTo({ top: 0 });
  swRegister();
});
