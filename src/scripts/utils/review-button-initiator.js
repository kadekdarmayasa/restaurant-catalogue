import Swal from 'sweetalert2';
import { createReviewFormTemplate } from '../views/templates/template-creator';
import RestaurantCatalogueSource from '../data/restaurant-catalogue-source';

const ReviewButtonInitiator = {
  init({ reviewButton, restaurantId }) {
    reviewButton.addEventListener('click', async (event) => {
      event.preventDefault();

      const formValues = await this.showReviewForm();
      if (formValues === undefined) return;
      if (formValues.name === '' || formValues.review === '') {
        this.showErrorAlert('Please fill in all fields!');
        return;
      }

      const response = await this.postReview({ restaurantId, ...formValues });
      response.error ? this.showErrorAlert(response.message) : this.showSuccessAlert();
    });
  },

  async showReviewForm() {
    const { value: formValues } = await Swal.fire({
      title: 'Add Your Own Review',
      html: createReviewFormTemplate(),
      confirmButtonText: 'Submit Review',
      buttonsStyling: false,
      focusConfirm: false,
      showCloseButton: true,
      closeButtonHtml: '<i class="fa-solid fa-xmark"></i>',
      preConfirm: () => ({
        name: document.getElementById('name').value,
        review: document.getElementById('review').value,
      }),
    });

    return formValues;
  },

  async postReview({ restaurantId, name, review }) {
    const response = await RestaurantCatalogueSource.addCustomerReview({
      restaurantId,
      name,
      review,
    });

    return response;
  },

  showSuccessAlert() {
    Swal.fire({
      icon: 'success',
      title: 'Your review has been submitted!',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });
  },

  showErrorAlert(message) {
    Swal.fire({
      icon: 'error',
      title: message,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });
  },
};

export default ReviewButtonInitiator;
