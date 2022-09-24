import { ApiKey } from './value-objects/apiKey';
import { PushyMeService } from './services/pushy-me.service';
import { JSONValue } from './types';
import { SendPushNotificationOptions, SendPushNotificationResult } from './types/push.types';
import { PushyMeInterface } from './interfaces/pushy-me.interface';

export default class PushyMe {
  constructor(private readonly pushyMeInterface: PushyMeInterface, private readonly apiKey: string) {
    this.pushyMeInterface.setApiKey(apiKey);
  }

  static create(apiKey: string): PushyMe {
    const value = new ApiKey(apiKey);
    return new PushyMe(new PushyMeService(), value.get());
  }

  async sendPushNotification(
    data: JSONValue,
    recipient: string | string[],
    options?: Partial<SendPushNotificationOptions>,
  ): Promise<SendPushNotificationResult> {
    return this.pushyMeInterface.sendPushNotification(data, recipient, options);
  }
}
