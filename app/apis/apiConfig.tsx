import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Alert} from 'react-native';

const axiosInstance = axios.create({
  baseURL: 'http://157.66.24.126:8080',
  timeout: 10000, //giới hạn thời gian phản hồi trong 10s
});

axiosInstance.interceptors.response.use(
  response => {
    if (response.data?.code === '1000' || response.data?.meta.code === '1000') {
      return response.data;
    }
  },
  error => {
    if (error.code === 'ECONNABORTED') {
      Alert.alert('', 'Yêu cầu mất quá nhiều thời gian.\nVui lòng thử lại!');
    } else {
      const {response} = error;
      if (response) {
        switch (response.data?.code) {
          case '1009':
            Alert.alert('', 'Bạn không có quyền truy cập!'); // title, message
            break;
          case '1002':
            Alert.alert('', 'Bạn chưa điền đủ giá trị!');
            break;
          case '1004':
            Alert.alert('', 'Giá trị không hợp lệ!');
            break;
          case '1007':
            Alert.alert('', 'Upload không thành công!');
            break;
          case '9993':
            Alert.alert('', 'Mã xác thực không chính xác!');
            break;
          case '9998':
            Alert.alert('', 'Token không hợp lệ!');
            break;
          case '9995':
            Alert.alert('', 'Tài khoản không tồn tại!');
            break;
          case '9996':
            Alert.alert('', 'Tài khoản đã tồn tại!');
            break;
          default:
            Alert.alert('', response.data?.message || 'Có lỗi xảy ra!');
        }
      } else {
        Alert.alert(
          '',
          'Không thể kết nối tới máy chủ.\nVui lòng kiểm tra lại kết nối mạng!',
        );
      }
    }
    return Promise.reject(error); // Để giữ lỗi tiếp tục được truyền qua catch
  },
);

axiosInstance.interceptors.request.use(
  async (config: any) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        // Kiểm tra nếu phương thức request cho phép body
        if (['POST', 'PUT', 'PATCH'].includes(config.method?.toUpperCase())) {
          // Nếu body đã có thì thêm thông tin vào
          if (config.data instanceof FormData) {
            // Nếu body là FormData, sử dụng append
            config.data.append('token', token);
            config.headers['Content-Type'] = 'multipart/form-data';
          } else {
            // Nếu body là object thông thường
            config.data = {
              ...config.data, // Dữ liệu hiện tại
              token: token, // Chèn thêm token
            };
          }
        }
      }
      return config;
    } catch (error) {
      console.error('Error retrieving token:', error);
      return Promise.reject(error);
    }
  },
  error => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
