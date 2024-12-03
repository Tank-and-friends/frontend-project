import {UserInfo} from '../models/User';
import {getDirectImageLink} from '../utils/image';
import axiosInstance from './apiConfig';
// import AsyncStorage from '@react-native-async-storage/async-storage';

//sau khi login, AsyncStorage sẽ lưu lại token, name, id, role
export const getUserInfo = async (): Promise<UserInfo | null> => {
  try {
    // const token = AsyncStorage.getItem('token');
    // const userId = AsyncStorage.getItem('id');
    const response = await axiosInstance.post('/it4788/get_user_info', {
      //user_id: id,
      user_id: 277,
      //user_id: token
      token: 'FAJBzC',
    });
    const data = response.data;
    data.avatar = getDirectImageLink(data.avatar);
    return data;
  } catch (error) {
    return null;
  }
};
