import http from '../helpers/http';
import type { Api } from 'types/Api';

export default class ApiService {
  static async createNew(params) {
    const result: { app_id?: string } = await http.post('create-api', params);
    if (result.app_id) {
      sessionStorage.setItem('appId', result.app_id);
    }
  }

  static async getCurrent() {
    const result: Api = await http.get('api');
    return result;
  }

  static async stripeCheckout() {
    const result: { connect_url?: string } = await http.post('api/checkout');
    return result;
  }

  static async update(params) {
    return http.put('api', params);
  }
}
