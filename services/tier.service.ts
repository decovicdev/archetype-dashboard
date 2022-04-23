import http from 'helpers/http';
import { CreateProductFormData } from 'types/CreateProductFormData';

export default class TierService {
  static async getList() {
    return http.get(`api/tiers`);
  }

  static async getById(id: string) {
    return http.get(`tier/${id}`);
  }

  static async addNew(params: CreateProductFormData) {
    return http.post(`create-tier`, params);
  }

  static async updateById(id: string, params: CreateProductFormData) {
    return await http.put(`tier/${id}`, params);
  }

  static async deleteById(id: string) {
    return await http.delete(`tier/${id}`);
  }
}
