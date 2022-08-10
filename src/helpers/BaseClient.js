import axios from 'axios';
import Cookies from 'js-cookie';
import { API } from '../Variables/Variables';

const baseApiClient = axios.create({
  baseURL: API,
});

/**
 * Request interceptor.
 * Use to fulfill the request headers, depending on the URL.
 * Adding just auhtorization with access/refresh token
 */
baseApiClient.interceptors.request.use((request) => {
  const { url } = request;
  request.headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };
  if (!url.includes('login')) {
    request.headers = {
      ...request?.headers,
      Authorization: `Bearer ${localStorage.getItem('a_t')}`,
    };
  }

  return request;
});

let isRefreshing = false;
const subscribers = [];

// eslint-disable-next-line camelcase
// const onAccessTokenFetched = (access_token) => {
//   subscribers = subscribers.filter((callback) =>
//     callback(access_token)
//   );
// };

const addSubscriber = (callback) => {
  subscribers.push(callback);
};
/**
 * apiClient acting like response interceptors.
 * Handle the 401 error on any response (login doesn't need this validation)
 * Refresh access_token if refresh_token it's valid.
 * Also retry the unsuccessful request
 */
const apiClient = ({ ...options }) => {
  const onSuccess = (response) => response;

  const onError = async (error) => {
    console.log(error, 'hey...');
    const originalRequest = error.config;

    if (
      error.response.status === 422 &&
      originalRequest.url.includes('refresh')
    ) {
      console.log('Error 401. Redireccionar al login');
      sessionStorage.clear();
      localStorage.clear();
      window.location.replace('/login');
    }

    if (
      error.response.status === 401 &&
      !originalRequest.url.includes('login')
    ) {
      try {
        if (!isRefreshing) {
          isRefreshing = true;
          // eslint-disable-next-line no-underscore-dangle
          originalRequest._retry = true;
          // eslint-disable-next-line no-use-before-define
          // REFRESH_TOKEN(localStorage.getItem('refresh_token'))
          //   .then((response) => {
          //     const {
          //       // eslint-disable-next-line camelcase
          //       data: { access_token },
          //     } = response;
          //     localStorage.setItem('access_token', access_token);
          //     isRefreshing = false;
          //     onAccessTokenFetched(access_token);
          //     subscribers = [];
          //   })
          //   .catch((err) => console.log('Error de refresh: ', err));
        }
        // isRefreshing = true;
        // originalRequest._retry = true;
        // const { data: { access_token } } = await REFRESH_TOKEN(sessionStorage.getItem('refresh_token'));
        // sessionStorage.setItem('access_token', access_token);
        // baseApiClient.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        return new Promise((resolve) => {
          // eslint-disable-next-line camelcase
          addSubscriber((access_token) => {
            // eslint-disable-next-line camelcase
            // baseApiClient.defaults.headers.common.Authorization = `Bearer ${access_token}`;
            console.log(access_token);
            baseApiClient.defaults.withCredentials = true;
            resolve(apiClient(originalRequest));
          });
        });
        // eslint-disable-next-line no-shadow
      } catch (error) {
        console.log(error);
        // eslint-disable-next-line no-debugger
        /* // debugger; */
        sessionStorage.clear();
        localStorage.clear();
        window.location.replace('/login');
      }
    }

    if (
      error.response.status === 403 &&
      !originalRequest.url.includes('login')
    ) {
      console.log('Error 403. Redireccionar a login');
      // eslint-disable-next-line no-debugger
      /* // debugger; */
      sessionStorage.clear();
      localStorage.clear();
      Cookies.remove('session');
      window.location.replace('/auth');
    }

    throw error;
  };

  // eslint-disable-next-line no-console
  return baseApiClient(options).then(onSuccess).catch(onError);
};

// export const REFRESH_TOKEN = async () => {
//   try {
//     return await apiClient({
//       url: `/refresh`,
//       method: 'post',
//     });
//   } catch (e) {
//     throw new Error(e);
//   }
// };

export default apiClient;
