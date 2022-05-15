import { HttpService } from 'services/http';
import { CreateProductFormData, Tier } from 'types';

class TierService {
  constructor(private _http: HttpService) {}

  public getList() {
    return this._http.request<Tier[]>('api/tiers', { method: 'get' });
  }

  public getById(id: string) {
    return this._http.request(`tier/${id}`, { method: 'get' });
  }

  public addNew(params: CreateProductFormData) {
    return this._http.request('create-tier', { method: 'post', json: params });
  }

  public updateById(id: string, params: CreateProductFormData) {
    return this._http.request(`tier/${id}`, { method: 'put', json: params });
  }

  public deleteById(id: string) {
    return this._http.request(`tier/${id}`, { method: 'delete' });
  }
}

export { TierService };
