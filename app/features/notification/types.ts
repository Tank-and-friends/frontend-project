export type Notification = {
  subject: 'abc';
  id: number;
  message: string;
  status: string;
  from_user: number;
  to_user: number;
  type: 'ABSENCE' | 'ACCEPT_ABSENCE_REQUEST' | 'REJECT_ABSENCE_REQUEST' | 'ASSIGNMENT_GRADE';
  sent_time: string;
  data: {
    type: string;
    id: string;
  };
  title_push_notification: string;
  iconName: 'bell';
  time: string;
  onMarkRead: boolean;
  notificationName: string;
  notificationText: string;
};
