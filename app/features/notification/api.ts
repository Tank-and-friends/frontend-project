import axios from 'axios';
import {Notification} from './types';
import axiosInstance from '../../apis/apiConfig';

const API_URL = 'http://157.66.24.126:8080/it5023e';

export const getUnreadNotificationsCount = async () => {
  try {
    const response = await axios.post(
      `${API_URL}/get_unread_notification_count`,
      {
        token: 'Mq9YoW',
      },
    );
    // Xử lý dữ liệu trả về từ API
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error; // Quăng lỗi để xử lý ở nơi khác
  }
};

export const getNotifications = async (
  token = 'Mq9YoW',
  index = 0,
  count = 20,
): Promise<Notification[]> => {
  try {
    const response = await axiosInstance.post('/it5023e/get_notifications', {
      token,
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
  token = 'Mq9YoW',
): Promise<void> => {
  try {
    const response = await axiosInstance.post(
      '/it5023e/mark_notification_as_read',
      {
        token,
        notification_id: notificationId,
      },
    );

    console.log('Notification marked as read:', response.data);
  } catch (error) {
    console.error('Error marking notification as read:', error);
  }
};
