import { HttpService } from 'services/http';

class PaymentService {
  constructor(private _http: HttpService) {}

  public generateCheckoutLink(params: { checkout_session_id: string }) {
    return this._http.request<{ url: string; [key: string]: unknown }>(
      `payments/${params.checkout_session_id}`,
      { method: 'get' }
    );
  }
}

export { PaymentService };
