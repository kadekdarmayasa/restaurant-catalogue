import 'wicg-inert';

const OptionButtonInitiator = {
  init({ optionButton, actionsButton }) {
    actionsButton.inert = true;

    optionButton.addEventListener('click', () => {
      this.toggleActionsButton(actionsButton);
    });

    window.addEventListener('click', (event) => {
      if (!optionButton.contains(event.target)) this.closeActionsButton(actionsButton);
    });
  },

  toggleActionsButton(actionsButton) {
    actionsButton.inert = !actionsButton.inert;
    actionsButton.classList.toggle('open');
  },

  closeActionsButton(actionsButton) {
    actionsButton.inert = true;
    actionsButton.classList.remove('open');
  },
};

export default OptionButtonInitiator;
