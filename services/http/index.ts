import ky, { Options } from 'ky';

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
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE;

    const token = await auth.currentUser.getIdToken();
    try {
      const response = await ky(url, {
        prefixUrl: baseUrl,
        headers: {
          Authorization: `Bearer ${token}`,
          'X-Archetype-AppID': this.getAppId()
        },
        ...kyConfig
      }).json<V>();

      return response;
    } catch (error) {
      console.info(error.message);
      throw new Error(error);
    }
  }

  public getAppId() {
    return sessionStorage.getItem('appId');
  }
}

export { HttpService };
