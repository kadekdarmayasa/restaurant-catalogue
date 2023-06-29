const OptionButtonInitiator = {
  init({ optionButton, actionsButton }) {
    optionButton.addEventListener('click', () => {
      this.toggleActionsButton(actionsButton);
    });

    window.addEventListener('click', (event) => {
      if (!optionButton.contains(event.target)) this.closeActionsButton(actionsButton);
    });
  },

  toggleActionsButton(actionsButton) {
    actionsButton.classList.toggle('open');
  },

  closeActionsButton(actionsButton) {
    actionsButton.classList.remove('open');
  },
};

export default OptionButtonInitiator;
