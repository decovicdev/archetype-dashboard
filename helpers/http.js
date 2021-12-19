import config from "../config";

import axios from "axios";

const $api = axios.create(config.axios);

$api.interceptors.request.use((config) => {
  console.log({ sessionStorage });

  if (typeof window === "undefined") {
    return config;
  }

  const token = sessionStorage.getItem("token");
  console.log({ sessionStorage });
  // const appID = sessionStorage.getItem();
  const appID = "4380c54d277b45589891115bef535d21";
  console.log({ appID });

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (appID) {
    config.headers["X-Archetype-AppID"] = appID;
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
