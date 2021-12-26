import http from "../helpers/http";

export default class CustomerService {
  static async getList() {
    return http.get(`api/users`);
  }

  static async getDetails(uid) {
    return http.get(`user/${uid}`);
  }

  static async addNew(params) {
    return http.post(`create-user`, params);
  }

  static async update(uid, params) {
    return http.put(`user/${uid}`, params);
  }

  static async delete(uid) {
    return http.delete(`user/${uid}`);
  }
}
