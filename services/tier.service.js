import http from "../helpers/http";

export default class TierService {
  static async getList() {
    return http.get(`api/tiers`);
  }

  static async getById(id) {
    return http.get(`tier/${id}`);
  }

  static async addNew(params) {
    return http.post(`create-tier`, params);
  }

  static async updateById(id, params) {
    return await http.put(`tier/${id}`, params);
  }

  static async deleteById(id) {
    return await http.delete(`tier/${id}`);
  }
}
