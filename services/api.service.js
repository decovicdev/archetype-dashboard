import http from "../helpers/http";

export default class ApiService {
  static async createNew(params) {
    const response = await http.post(`create-api`, params);

    if (response.app_id) {
      sessionStorage.setItem("appId", response.app_id);
    }
  }

  static async getCurrent() {
    return http.get(`api`);
  }

  static async stripeCheckout() {
    return await http.post(`api/checkout`);
  }
}
