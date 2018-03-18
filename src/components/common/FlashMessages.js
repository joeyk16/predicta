import { NotificationManager } from 'react-notifications';

export default class FlashMessages {
  success(message) {
    NotificationManager.success(message);
  };

  error(message) {
    NotificationManager.error(message);
  };
}
