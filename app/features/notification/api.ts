import axiosInstance from '../../apis/apiConfig';
import { Notification } from './types';

export const getUnreadNotificationsCount = async () => {
  try {
    const response = await axiosInstance.post(
      '/it5023e/get_unread_notification_count',
    );
    // Xử lý dữ liệu trả về từ API
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error; // Quăng lỗi để xử lý ở nơi khác
  }
};

export const getNotifications = async (
  index = 0,
  count = 20,
): Promise<Notification[]> => {
  try {
    const response = await axiosInstance.post('/it5023e/get_notifications', {
      index,
      count,
    });

    const data = response.data;

    const notifications = data?.map((item: Notification) => ({
      id: item.id,
      message: item.message,
      status: item.status,
      fromUser: item.from_user,
      toUser: item.to_user,
      type: item.type,
      time: new Date(item.sent_time).toLocaleTimeString(), // Định dạng lại thời gian
      notificationName: item.type,
      notificationText: item.message,
      onMarkRead: item.status === 'READ', // Đánh dấu đã đọc nếu trạng thái là READ
      iconName: 'bell',
    }));

    return notifications || [];
  } catch (error) {
    console.error('Lỗi khi gọi API:', error);
    return [];
  }
};

export const markNotificationAsRead = async (
  notificationId: string,
): Promise<void> => {
  try {
    const response = await axiosInstance.post(
      '/it5023e/mark_notification_as_read',
      {
        notification_id: notificationId,
      },
    );

    console.log('Notification marked as read:', response.data);
  } catch (error) {
    console.error('Error marking notification as read:', error);
  }
};
