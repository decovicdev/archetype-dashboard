import config from 'config';
import { HttpService } from 'services/http';
import type { Api } from 'types/Api';

class ApiService {
  constructor(private _http: HttpService) {}

  public async createNew(params) {
    const promises = [
      this._http.request<Api>('create-api', {
        method: 'post',
        json: params,
        prefixUrl: config.apiUrls.production
      }),
      this._http.request<Api>('create-api', {
        method: 'post',
        json: params,
        prefixUrl: config.apiUrls.test
      })
    ];

    try {
      const [prodApp, testApp] = await Promise.all(promises);

      sessionStorage.setItem('appId', prodApp.app_id);
    } catch (error) {
      console.info(error);
    }
  }

  public getCurrent() {
    return this._http.request<Api>('api', { method: 'get' });
  }

  public stripeCheckout() {
    return this._http.request<{ connect_url: string }>('api/checkout', {
      method: 'post'
    });
  }

  public update(params) {
    return this._http.request('api', { method: 'put', json: params });
  }
}

export { ApiService };
