import { API_END_POINT, SEND_PUSH_NOTIFICATION } from './constants';
import { SendPushNotificationOptions, SendPushNotificationResult } from './types/push.types';
import { JSONValue } from './types/types';
import { isValideApiKey } from './utils/is-valide-apiKey';

export default class Pushy {

  private apiKey: string;

  constructor(apiKey: string) {
    if (!isValideApiKey(apiKey)) {
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
    const response = await fetch(`${API_END_POINT + SEND_PUSH_NOTIFICATION}?api_key=${this.apiKey}`, {
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
