
import axios from 'axios';

const baseURL = import.meta.env.VITE_APP_BASE_URL

const httpRequest = axios.create({
  baseURL: baseURL,
});

httpRequest.interceptors.request.use(
  (config) => {
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

httpRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {

    const status = error.response ? error.response.status : null;

    switch (status) {
      case 400:
        console.error('Bad Request', error.response.data);
        break;

      case 401:
        console.error('Unauthorized', error.response.data);

        break;

      case 403:
        console.error('Forbidden', error.response.data);
        break;

      case 404:

        console.error('Not Found', error.response.data);
        break;

      case 500:
        console.error('Server Error', error.response.data);
        break;

      default:
        console.error('Error', error.response ? error.response.data : error.message);
    }

    return Promise.reject(error);
  }
);

export default httpRequest;
