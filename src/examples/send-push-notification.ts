import PushyMe from "..";

const pushy = PushyMe.initialize("YOUR_API_KEY");

pushy.sendPushNotification({ message: 'hello' }, 'YOUR_DEVICE_TOKEN');