import http from "../helpers/http";

export default class EndpointService {
  static async getList() {
    return http.get(`api/endpoints`);
  }
}
