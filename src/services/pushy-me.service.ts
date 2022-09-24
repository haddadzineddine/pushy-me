import { API_END_POINT, SEND_PUSH_NOTIFICATION } from "../constants";
import { PushyMeInterface } from "../interfaces/pushy-me.interface";
import { JSONValue } from "../types";
import { SendPushNotificationOptions, SendPushNotificationResult } from "../types/push.types";

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

        const result = await response.json();

        if (result.status !== 200) {
            throw new Error('An invalid response code was received from the Pushy API.');
        }

        return result as SendPushNotificationResult;
    }

    private apiKeyIsSet(): void {
        if (!this.apiKey) {
            throw new Error('API Key is not set');
        }
    }
}