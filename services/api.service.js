import http from "../helpers/http";

export default class ApiService {
  static async createNew(params) {
    const response = await http.post(`create-api`, params);

    if (response.app_id) {
      sessionStorage.setItem("appId", response.app_id);
    }
  }

  static async getCurrent() {
    const appId = sessionStorage.getItem("appId");
    if (!appId) {
      return null;
    }

    return http.get(`api/${appId}`);
  }
}
