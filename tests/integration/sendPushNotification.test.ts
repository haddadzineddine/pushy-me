import Pushy from '../../src';

const mockPushyMeService = {
  sendPushNotification: jest.fn().mockImplementation(() =>
    Promise.resolve({
      success: true,
      id: '#1',
      info: {
        device: 1,
        failed: [],
      },
    }),
  ),
  setApiKey: jest.fn(),
};

describe('Send Push Notification', () => {
  it('should send a push notification', async () => {
    const spyOnSendPushNotification = jest.spyOn(mockPushyMeService, 'sendPushNotification');
    const spyOnSetApiKey = jest.spyOn(mockPushyMeService, 'setApiKey');
    const pushy = new Pushy(mockPushyMeService, '9fad0b4e99bb3463ef3d3d');

    const result = await pushy.sendPushNotification({ message: 'Hello World' }, 'device-token');

    expect(result.success).toBe(true);
    expect(result.id).toBe('#1');

    expect(spyOnSetApiKey).toBeCalledTimes(1);
    expect(spyOnSendPushNotification).toBeCalledTimes(1);

    expect(spyOnSetApiKey).toBeCalledWith('9fad0b4e99bb3463ef3d3d');
    expect(spyOnSendPushNotification).toBeCalledWith({ message: 'Hello World' }, 'device-token', undefined);
  });
});
