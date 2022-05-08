import http from 'helpers/http';

class PaymentService {

  static generateCheckoutLink(params: { checkout_session_id: string }): Promise<{ url: string;[key: string]: unknown }> {
    return http.get(`payments/${params.checkout_session_id}`)
  }
}

export default PaymentService;