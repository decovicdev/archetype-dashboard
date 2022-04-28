/* eslint-disable no-undef */
import axios from 'axios';
import config from '../config';

const mode =
  typeof window !== 'undefined'
    ? localStorage.getItem('mode') ||
      (localStorage.setItem('mode', 'production') && 'production')
    : 'production';

const baseUrl =
  mode === 'production'
    ? config.apiUrls.production
    : config.apiUrls.test;

export const $api = axios.create({
  ...config.axios,
  baseURL: baseUrl
});

$api.interceptors.request.use((config) => {
  if (typeof window === 'undefined') {
    return config;
  }

  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const appId = getAppId();
  if (appId) {
    config.headers['X-Archetype-AppID'] = appId;
  }

  return config;
});

$api.interceptors.response.use(
  (res) => res.data,
  (err) => {
    if (err.response) {
      if (err.response.status === 404) {
        if (err.response.request.responseURL !== `${baseUrl}lost-api`) {
          window.dispatchEvent(new CustomEvent('apiNotFoundErr'));
        }
      }

      if (err.response.status !== 200) {
        return Promise.reject({
          message: `Request status code: ${err.response.status}`
        });
      }
    }

    return Promise.reject(
      err.response ? err.response.data : JSON.parse(JSON.stringify(err))
    );
  }
);

export function getAppId() {
  return sessionStorage.getItem('appId') || null;
}

export default $api;
