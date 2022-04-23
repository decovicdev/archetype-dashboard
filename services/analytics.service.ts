import http from '../helpers/http';

export default class AnalyticsService {
  static async getAppStats() {
    const result = await http.get('api/charts/app_stats');
    return result;
  }

  static async getAppTierStats() {
    const result = await http.get('api/charts/app_tier_stats');
    return result;
  }

  static async getDailyAppOverview() {
    const result = await http.get('api/charts/daily_app_overview');
    return result;
  }

  static async getAppMrr() {
    const result = await http.get('api/charts/app_mrr');
    return result;
  }

  static async getEndpointOverview() {
    const result = await http.get('api/charts/endpoint_overview_1d');
    return result;
  }

  static async getAppErrorBreakdown() {
    const result = await http.get('api/charts/app_error_breakdown');
    return result;
  }

  static async getLatency180D() {
    const result = await http.get('api/charts/app_latency_180d');
    return result;
  }
}
