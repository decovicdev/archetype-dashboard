import { HttpService } from 'services/http';
import { User } from 'types';

class UserService {
  constructor(private _http: HttpService) {}

  public getList() {
    return this._http.request<User[]>('api/users', { method: 'get' });
  }

  public getById(id: string) {
    return this._http.request<User>(`user/${id}`, { method: 'get' });
  }

  public addNew(params) {
    return this._http.request('create-user', { method: 'post', json: params });
  }

  public updateById(id: string, params: Partial<User>) {
    return this._http.request(`user/${id}`, { method: 'put', json: params });
  }

  public deleteById(id: string) {
    return this._http.request(`user/${id}`, { method: 'delete' });
  }

  public resetApiKey(id: string) {
    return this._http.request(`user/${id}/reset-api-key`, { method: 'post' });
  }

  public assignSandboxSubscription(data: {
    custom_uid: string;
    tier_id: string;
  }) {
    return this._http.request('user/create-promo', {
      method: 'post',
      json: data
    });
  }

  public generatePaymentLink(params: { custom_uid: string; tier_id: string }) {
    return this._http.request<{ url: string }>(
      `user/${params.custom_uid}/payment-link/${params.tier_id}`,
      { method: 'get' }
    );
  }

  public generatePaymentLinkEmail(params: {
    custom_uid: string;
    tier_id: string;
  }) {
    return this._http.request(
      `user/${params.custom_uid}/send-product-link-email/${params.tier_id}`
    );
  }

  public cancelSubscription(body: {
    custom_uid: string;
    cancel_immediately: boolean;
  }) {
    return this._http.request('user/cancel-subscription', {
      method: 'post',
      json: body
    });
  }
}

export { UserService };
