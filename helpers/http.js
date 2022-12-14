/* eslint-disable no-undef */
import axios from 'axios';
import config from '../config';
import { auth } from 'services/firebaseAuth.service';

const getMode = () => {
  if (typeof window !== 'undefined') {
    const user = auth.currentUser;
    if (!user) return 'production';

    return (
      localStorage.getItem(`${user.uid}-mode`) ||
      (localStorage.setItem(`${user.uid}-mode`, 'production') && 'production')
    );
  }

  return 'production';
};

const baseUrl = config.apiUrls.base;

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
