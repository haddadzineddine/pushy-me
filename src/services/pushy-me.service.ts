import { API_END_POINT, SEND_PUSH_NOTIFICATION } from '../constants';
import { PushyMeInterface } from '../interfaces/pushy-me.interface';
import { JSONValue } from '../types';
import { SendPushNotificationOptions, SendPushNotificationResult } from '../types/push.types';
import { RequestInfo, RequestInit } from 'node-fetch';


const fetch = (url: RequestInfo, init?: RequestInit) => import('node-fetch').then(module => module.default(url, init));

export class PushyMeService implements PushyMeInterface {
  private apiKey?: string;

  setApiKey(apiKey: string): void {
    this.apiKey = apiKey;
  }

  async sendPushNotification(
    data: JSONValue,
    recipient: string | string[],
    options?: Partial<SendPushNotificationOptions>,
  ): Promise<SendPushNotificationResult> {
    this.apiKeyIsSet();

    const response = await fetch(`${API_END_POINT + SEND_PUSH_NOTIFICATION}?api_key=${this.apiKey}`, {
      method: 'POST',
      body: JSON.stringify({
        data,
        to: recipient,
        ...options,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    const result = (await response.json()) as SendPushNotificationResult;

    if (result.success === false) {
      throw new Error('An invalid response code was received from the Pushy API.');
    }

    return result;
  }

  private apiKeyIsSet(): void {
    if (!this.apiKey) {
      throw new Error('API Key is not set');
    }
  }
}
