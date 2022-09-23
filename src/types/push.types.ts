export type SendPushNotificationOptions = {
  /**
   * Specifies how long (in seconds) the push notification should be kept if the device is offline.
   *
   * The default value is 1 month. The maximum value is 1 year.
   */
  time_to_live: number;

  /**
   * Schedule the notification for later by specifying a futuristic Unix timestamp (in seconds).
   *
   * Your scheduled time cannot exceed 1 year.
   */
  schedule: number;

  /**
   * Group notifications by specifying a collapse key. When specified, any undelivered notifications
   * pending for device(s) with the same collapse_key are discarded. Only the last message gets delivered
   * when connectivity can be re-established with the device.
   *
   * Collapse keys should not exceed 32 characters.
   */
  collapse_key: string;

  /** When set to true, your app's notification handler will be invoked even if the app is running
   * in the background, making it possible to fetch updated content from the server or execute other
   * custom logic without necessarily alerting the user.
   *
   * Requires the Background Modes -> Remote Notifications' capability to be enabled.
   */
  content_available: boolean;

  /** When set to true, your app's Notification Service Extension will be invoked even if the app is
   * running in the background, making it possible to download and display rich media attachments
   * within your notification.
   *
   * Requires the Background Modes -> Remote Notifications' capability to be enabled.
   */
  mutable_content: boolean;

  /**  iOS's notification options, such as the alert message, sound, or badge number. */
  notification: {
    /**
     * The main alert message, visible on the lock screen and in other areas on iOS.
     * Supports Apple Emojis via their unicode representation.
     */
    body: string;

    /**  The number to display as the badge of the app icon. */
    badge: number;

    /**
     * The filename of a sound in the app bundle or in the Library/Sounds folder of your app's data
     * container, or a sound dictionary object for critical alerts (iOS 12, more info) .
     */
    sound: unknown;

    /**  A short string describing the purpose of the notification, visible on Apple Watch and iOS 8.2+. */
    title: string;

    /**
     * Your app's Notification Content Extension with the matching category will be invoked in order to
     * display custom notification UI.
     */
    category: string;

    /**
     * The localization key of a string present in your app's Localizable.strings file.
     *
     * Use this parameter to localize the notification body. Refer to the APNs documentation for more
     * information.
     */
    loc_key: string;

    /**
     * The replacement strings to substitute in place of the %@ placeholders of the localization string
     * matching the specified loc_key.
     *
     * Use this parameter to localize the notification body. Refer to the APNs documentation for more
     * information.
     */
    loc_args: Array<string>;

    /**
     * The localization key of a string present in your app's Localizable.strings file.
     *
     * Use this parameter to localize the notification title. Refer to the APNs documentation for more
     * information.
     */
    title_loc_key: string;

    /**
     * The replacement strings to substitute in place of the %@ placeholders of the localization string
     * matching the specified title_loc_key.
     *
     * Use this parameter to localize the notification title. Refer to the APNs documentation for more
     * information.
     */
    title_loc_args: Array<string>;

    /**
     * Indicate the importance and delivery timing of a notification on iOS 15+, with possible values
     * of passive, active, time-sensitive, or critical.
     *
     * Defaults to active. Anything above active requires capabilities to be enabled in your Xcode
     * project. Refer to the APNs documentation for more information.
     */
    interruption_level: string;
  };
};

export type SendPushNotificationResult = {
  /** Returned if the API request was successful.	 */
  success: boolean;

  /**
   * The push notification unique ID.
   *
   * Use it to check delivery status using the Notification Status API.
   */
  id: string;

  /**
   * Contains additional information about the notification, for debugging purposes.
   */
  info: {
    /**
     * The number of devices that will potentially receive the notification.
     */
    devices: number;

    /**
     * An array of invalid device tokens passed in which could not be found in our
     * database registered under the app with the Secret API Key used to authenticate this request.
     */
    failed: Array<string>;
  };
};
