import { JSONValue } from "../types";
import { SendPushNotificationOptions, SendPushNotificationResult } from "../types/push.types";


export interface PushyMeInterface {

    /**
     * Set the API key
     * @param apiKey
     * @returns void
     */

    setApiKey(apiKey: string): void;


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
    
    sendPushNotification(
        data: JSONValue,
        recipient: string | string[],
        options?: Partial<SendPushNotificationOptions>,
    ): Promise<SendPushNotificationResult>

}