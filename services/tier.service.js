import http, { getAppId } from "../helpers/http";

export default class TierService {
  static async getList() {
    const appId = getAppId();
    return http.get(`tiers/${appId}`);
  }

  static async getById(id) {
    return http.get(`tiers/${id}`);
  }
}
