import axios from 'axios';
import { UserInfo } from '../models/User';
import { getDirectImageLink } from '../utils/image';
// import AsyncStorage from '@react-native-async-storage/async-storage';

//product env
const BASE_URL = 'http://157.66.24.126:8080';

//sau khi login, AsyncStorage sẽ lưu lại token, name, id, role
export const getUserInfo = async (): Promise<UserInfo | null> => {
  try {
    // const token = AsyncStorage.getItem('token');
    // const userId = AsyncStorage.getItem('id');
    const response = await axios.post(`${BASE_URL}/it4788/get_user_info`,
      {
        //user_id: id,
        user_id: 159,
        //user_id: token
        token: '8C475S',
      }
    );
    const data = response.data.data;
    //response trả về link drive, cần biến đổi chút để hiển thị dc ảnh
    data.avatar = getDirectImageLink(data.avatar); 
    return data; 
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};
