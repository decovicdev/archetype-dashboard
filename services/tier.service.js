import http from "../helpers/http";

export default class TierService {
  static async getList() {
    return http.get(`api/tiers`);
  }

  static async getById(id) {
    return http.get(`tiers/${id}`);
  }
}
