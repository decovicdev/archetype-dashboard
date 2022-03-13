import http from '../helpers/http';

export default class EndpointService {
  static async getList() {
    return http.get(`api/endpoints`);
  }

  static async getById(id) {
    return http.get(`endpoint/${id}`);
  }

  static async addNew(params) {
    return http.post(`create-endpoint`, params);
  }

  static async updateById(id, params) {
    return await http.put(`endpoint/${id}`, params);
  }

  static async deleteById(id) {
    return await http.delete(`endpoint/${id}`);
  }
}
