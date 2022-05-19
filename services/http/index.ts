import config from 'config';
import ky, { Options, HTTPError } from 'ky';

import { auth } from '../firebaseAuth.service';

class HttpService {
  constructor() {
    this.ky = ky;
  }

  /**
   * Expose ky default module
   */
  public readonly ky: typeof ky;

  public async request<V = unknown>(
    url: string,
    kyConfig: Options = {}
  ): Promise<V> {
    const token = await auth.currentUser.getIdToken();

    const baseUrl =
      this.getMode(auth.currentUser.uid) === 'production'
        ? config.apiUrls.production
        : config.apiUrls.test;

    const response = await ky(url, {
      prefixUrl: baseUrl,
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Archetype-AppID': this.getAppId()
      },
      ...kyConfig
    }).json<V>();

    return response;
  }

  public getAppId() {
    return sessionStorage.getItem('appId');
  }

  /**
   * NOTE: By default we use test mode url
   */
  public getMode(uid: string) {
    const mode = localStorage.getItem(`${uid}-mode`) || 'test';

    return mode as 'test' | 'production';
  }
}

export { HttpService };
