import http from "../helpers/http";

export default class ApiService {
  static async createOne(params) {
    return http.post(`create-api`, params);
  }

  static async getOne(appId) {
    return http.get(`api/${appId}`);
  }

  static async updateOne(appId, params) {
    return http.put(`api/${appId}`, params);
  }

  static async deleteOne(appId) {
    return http.delete(`api/${appId}`);
  }
}
