import {
  AnalyticsService,
  AuthService,
  ApiService as RemoteApiService,
  EndpointService,
  PaymentService,
  TierService,
  UserService
} from './api';

import { HttpService } from './http';

class ApiService {
  constructor(private readonly _http: HttpService) {}

  /**
   * Auth routes and services
   */
  public auth = new AuthService(this._http);

  /**
   * Analytics routes
   */
  public analytics = new AnalyticsService(this._http);

  /**
   * Api routes
   */
  public api = new RemoteApiService(this._http);

  /**
   * Endpoint routes
   */
  public endpoint = new EndpointService(this._http);

  /**
   * Payment routes
   */
  public payment = new PaymentService(this._http);

  /**
   * Tier routes
   */
  public tier = new TierService(this._http);

  /**
   * User routes
   */
  public user = new UserService(this._http);
}

export { ApiService };
