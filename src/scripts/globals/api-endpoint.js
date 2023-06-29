import CONFIG from './config';

const RESTAURANT_API_ENDPOINT = {
  LIST: `${CONFIG.BASE_URL}/list`,
  DETAIL: (restoId) => `${CONFIG.BASE_URL}/detail/${restoId}`,
  SEARCH: (query) => `${CONFIG.BASE_URL}/search?q=${query}`,
  ADD_REVIEW: `${CONFIG.BASE_URL}/review`,
  IMAGE: (resolution, imageId) => `${CONFIG.BASE_IMAGE_URL}/${resolution}/${imageId}`,
};

export default RESTAURANT_API_ENDPOINT;
