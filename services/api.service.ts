import http from '../helpers/http';
import { auth } from './firebaseAuth.service';
import type { Api } from 'types/Api';
import config from 'config';

export default class ApiService {
  static async createNew(params) {
    const user = auth.currentUser;
    const env =
      typeof window !== 'undefined'
        ? localStorage.getItem(`${user?.uid}-mode`) || 'production'
        : 'production';
    const result: { app_id?: string } = await http.post('create-api', params, {
      baseURL:
        env === 'production' ? config.apiUrls.production : config.apiUrls.test
    });
    // Create the same api in the other environment as well
    await http.post('create-api', params, {
      baseURL: env === 'test' ? config.apiUrls.production : config.apiUrls.test
    });
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
