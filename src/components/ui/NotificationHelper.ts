import { NotificationTypeEnum } from './NotificationTypeEnum';
import { NotificationTemplateEnum } from './NotificationTemplateEnum';
import { NotificationTemplates } from './NotificationTemplates';

interface NotificationPayload {
  type: NotificationTypeEnum;
  title: string;
  message: string;
  showIcon?: boolean;
  duration?: number;
}

/**
 * Create a structured notification payload from template and type.
 */
export function createNotification(
  type: NotificationTypeEnum,
  template: NotificationTemplateEnum,
  showIcon = true,
  duration?: number
): NotificationPayload {
  const { title, message } = NotificationTemplates[template];

  return {
    type,
    title,
    message,
    showIcon,
    duration,
  };
}
