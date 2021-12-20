import http from "../helpers/http";

export default class ApiService {
  static async createOne(params) {
    return http.post(`create-api`, params);
  }
}
