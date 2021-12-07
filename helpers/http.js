import config from "../config";

import axios from "axios";

const $api = axios.create(config.axios);

$api.interceptors.request.use((config) => {
  if (typeof window === "undefined") {
    return config;
  }

  const token = sessionStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

$api.interceptors.response.use(
  (res) => res.data,
  (err) => {
    if (err.response && err.response.status !== 200) {
      return Promise.reject({
        message: `Request status code: ${err.response.status}`,
      });
    }

    return Promise.reject(
      err.response ? err.response.data : JSON.parse(JSON.stringify(err))
    );
  }
);

export default $api;
