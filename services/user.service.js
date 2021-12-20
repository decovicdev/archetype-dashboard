import http from "../helpers/http";

export default class UserService {
  static async getById(id) {
    return await http.get(`user/${id}`);
  }

  static async addNew(params) {
    return await http.get(`create-user`, params);
  }

  static async updateById(id, params) {
    return await http.put(`user/${id}`, params);
  }

  static async deleteById(id) {
    return await http.delete(`user/${id}`);
  }

  static async getList() {
    return await http.get(`api/users`);
  }
}
