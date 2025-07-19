import { NotificationTemplateEnum } from './NotificationTemplateEnum';

export const NotificationTemplates: Record<NotificationTemplateEnum, { title: string; message: string }> = {
  [NotificationTemplateEnum.ScanningSystem]: {
    title: 'Scanning System',
    message: 'Scanning for viruses and malware...',
  },
  [NotificationTemplateEnum.PasswordChanged]: {
    title: 'Password Changed',
    message: 'Your password has been updated successfully.',
  },
  [NotificationTemplateEnum.ProfileUpdated]: {
    title: 'Profile Updated',
    message: 'Your profile has been updated successfully.',
  },
  [NotificationTemplateEnum.EmailSent]: {
    title: 'Email Sent',
    message: 'Your email has been delivered successfully.',
  },
  [NotificationTemplateEnum.BackupComplete]: {
    title: 'Backup Complete',
    message: 'Your data has been backed up successfully.',
  },
  [NotificationTemplateEnum.CacheCleared]: {
    title: 'Cache Cleared',
    message: 'Browser cache has been cleared successfully.',
  },
  [NotificationTemplateEnum.DiskSpaceLow]: {
    title: 'Disk Space Warning',
    message: 'Only 5GB of disk space remaining.',
  },
  [NotificationTemplateEnum.UploadingFiles]: {
    title: 'Uploading Files',
    message: 'Please wait while we upload your files...',
  },
  [NotificationTemplateEnum.GeneratingReport]: {
    title: 'Generating Report',
    message: 'Creating your monthly analytics report...',
  },
  [NotificationTemplateEnum.PaymentSuccessful]: {
    title: 'Payment Successful',
    message: 'Your payment has been processed successfully!',
  },
  [NotificationTemplateEnum.LoginFailed]: {
    title: 'Login Failed',
    message: 'Invalid username or password. Please try again.',
  },
};
