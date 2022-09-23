import { SendPushNotificationOptions, SendPushNotificationResult } from './types/push.types';
import { JSONValue } from './types/types';

export default class Pushy {
  static API_END_POINT = 'https://api.pushy.me';

  private apiKey: string;

  /**
   * Validate API Key
   * @param apiKey Your Pushy API key
   * @returns boolean
   */
  static isValideApiKey(apiKey: string) {
    return apiKey.match(/^[0-9a-zA-Z]+$/) !== null;
  }

  constructor(apiKey: string) {
    if (!Pushy.isValideApiKey(apiKey)) {
      throw new Error('Invalid API Key');
    }

    this.apiKey = apiKey;
  }

  /**
   * Send push notification
   * @see {@link https://pushy.me/docs/api/send-notifications}
   *
   * @param data JSON notification data object
   * @param recipient one or array of device token OR one or array of topics
   * @param options Extra options for the notification
   *
   * @returns pushId
   */
  async sendPushNotification(
    data: JSONValue,
    recipient: string | string[],
    options?: Partial<SendPushNotificationOptions>,
  ): Promise<SendPushNotificationResult> {
    const response = await fetch(`${Pushy.API_END_POINT}/push?api_key=${this.apiKey}`, {
      method: 'POST',
      body: JSON.stringify({
        data,
        to: recipient,
        ...options,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    const result = await response.json();

    if (result.status !== 200) {
      throw new Error('An invalid response code was received from the Pushy API.');
    }

    return result as SendPushNotificationResult;
  }
}
