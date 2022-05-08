import { User } from 'types/Users';
import http from '../helpers/http';

type PathParams = { custom_uid: string; tier_id: string };

export default class CustomerService {
  static async getList() {
    return http.get(`api/users`);
  }

  static async getById(id): Promise<User> {
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

  static async resetApiKey(id) {
    return http.post(`user/${id}/reset-api-key`);
  }

  static assignSandboxSubscription(data) {
    return http.post('user/create-promo', data);
  }

  static generatePaymentLink(params: PathParams): Promise<{ url: string }> {
    return http.get(`user/${params.custom_uid}/payment-link/${params.tier_id}`)
  }

  static generatePaymentLinkEmail(params: PathParams): Promise<unknown> {
    return http.get(`user/${params.custom_uid}/send-product-link-email/${params.tier_id}`);
  }
}
