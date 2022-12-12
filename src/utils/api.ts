import { BASE_API } from '@/constants/common';
import cookies from '@/utils/cookies';
import axios from 'axios';
import jwt from './jwt';

const configRequest = (config, _token) => {
  //   const lang = localStorage.getItem('lang');

  const setup = {
    ...config,
    headers: {
      ...config.headers,
      //   'X-localization': lang,
    },
  };
  if (_token) setup.headers.Authorization = `Bearer ${_token}`;
  return setup;
};

const enCodingResponse = (config) => ({
  ...config,
  data: jwt.encodeJWT(config.data),
});
const handleError = (error) => {
  if (error?.response) {
    return Promise.reject(error.response.data || error.response);
  }
  if (error.request) return Promise.reject(error.request);
  return Promise.reject(error.message || error);
};
/* Config axios call public api  */
const publicRequest = axios.create({
  baseURL: BASE_API,
  // headers: {
  //   'content-type': 'application/json',
  // },
  timeout: 5000,

  // withCredentials: true,
});
publicRequest.interceptors.request.use((config) => configRequest(enCodingResponse(config), null));
publicRequest.interceptors.response.use(
  (response) => response.data || response,
  (error) => handleError(error),
);

/* Config axios call private api  */
const privateRequest = axios.create({
  baseURL: BASE_API,
  headers: {
    'content-type': 'application/json',
  },
  timeout: 5000,
  withCredentials: true,
});

privateRequest.interceptors.request.use((config) => {
  const _token = cookies.get('_token');
  return configRequest(config, _token);
});

privateRequest.interceptors.response.use(
  (response) => response.data || response,
  (error) => handleError(error),
);

/* Config axios call origin request api  */
const originRequest = axios.create({
  baseURL: 'http://oneibccom.abc:3000/api',
  timeout: 5000,
});
originRequest.interceptors.request.use((config) => configRequest(config, null));
originRequest.interceptors.response.use(
  (response) => response.data || response,
  (error) => handleError(error),
);

/* Config axios for service request api  */
const serverRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
});
serverRequest.interceptors.request.use((config) => configRequest(enCodingResponse(config), null));
serverRequest.interceptors.response.use(
  (response) => response.data || response,
  (error) => handleError(error),
);

export { publicRequest, privateRequest, originRequest, serverRequest };
