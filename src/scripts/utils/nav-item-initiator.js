const NavItemInitiator = {
  setActiveNavItem({ navItems, pathName }) {
    navItems.forEach((navItem) => {
      navItem.classList.toggle('active', navItem.classList.contains(pathName));
    });
  },

  getActiveNavItem({ navItems }) {
    return navItems.find((navItem) => navItem.classList.contains('active'));
  },
};
export default NavItemInitiator;
