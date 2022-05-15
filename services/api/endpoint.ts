import { HttpService } from 'services/http';

class EndpointService {
  constructor(public readonly _http: HttpService) {}

  public getList() {
    return this._http.request<unknown[]>('api/endpoints', { method: 'get' });
  }

  public getById(id: string) {
    return this._http.request(`endpoint/${id}`);
  }

  public addNew(params) {
    return this._http.request('create-endpoint', {
      method: 'post',
      json: params
    });
  }

  public updateById(id: string, params) {
    return this._http.request(`endpoint/${id}`, {
      method: 'put',
      json: params
    });
  }

  public deleteById(id: string) {
    return this._http.request(`endpoint/${id}`, { method: 'delete' });
  }
}

export { EndpointService };
