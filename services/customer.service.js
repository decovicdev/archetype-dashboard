import http from "../helpers/http";

export default class CustomerService {
  static async getList() {
    return http.get(`api/users`);
  }

  static async getById(id) {
    return http.get(`user/${id}`);
  }

  static async addNew(params) {
    return http.post(`create-user`, params);
  }

  static async updateById(id, params) {
    return http.put(`user/${id}`, params);
  }

  static async deleteById(id) {
    return http.delete(`user/${id}`);
  }
}
