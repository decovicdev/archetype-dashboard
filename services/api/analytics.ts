import { HttpService } from 'services/http';

class AnalyticsService {
  constructor(private _http: HttpService) {}

  public getAppStats() {
    return this._http.request('api/charts/app_stats', { method: 'get' });
  }

  public getAppTierStats() {
    return this._http.request('api/charts/app_tier_stats', { method: 'get' });
  }

  public getDailyAppOverview() {
    return this._http.request('api/charts/daily_app_overview', {
      method: 'get'
    });
  }

  public getAppMrr() {
    return this._http.request('api/charts/app_mrr', { method: 'get' });
  }

  public getEndpointOverview() {
    return this._http.request('api/charts/endpoint_overview_1d', {
      method: 'get'
    });
  }

  public getAppErrorBreakdown() {
    return this._http.request('api/charts/app_error_breakdown', {
      method: 'get'
    });
  }

  public getLatency180D() {
    return this._http.request('api/charts/app_latency_180d', { method: 'get' });
  }
}

export { AnalyticsService };
