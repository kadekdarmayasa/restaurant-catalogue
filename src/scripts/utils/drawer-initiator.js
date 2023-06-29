const DrawerInitiator = {
  init({ button, drawer, appbar }) {
    this.appbar = appbar;

    button.addEventListener('click', (event) => {
      this.toggleDrawer(event, drawer);
      this.appbar.classList.toggle('drawer-open', drawer.classList.contains('open'));
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 670) this.closeDrawer(drawer);
    });
  },

  toggleDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.toggle('open');
  },

  closeDrawer(drawer) {
    drawer.classList.remove('open');
    this.appbar.classList.remove('drawer-open');
  },
};

export default DrawerInitiator;
