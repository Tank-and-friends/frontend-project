import axios from 'axios';

const API_URL = 'http://157.66.24.126:8080/it5023e';

export const getUnreadNotificationsCount = async () => {
  try {
    const response = await axios.post(`${API_URL}/get_unread_notification_count`);
    // Xử lý dữ liệu trả về từ API
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error; // Quăng lỗi để xử lý ở nơi khác
  }
};
