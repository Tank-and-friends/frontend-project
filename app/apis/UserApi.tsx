import {UserInfo} from '../models/User';
import {getDirectImageLink} from '../utils/image';
import axiosInstance from './apiConfig';
// import AsyncStorage from '@react-native-async-storage/async-storage';

//sau khi login, AsyncStorage sẽ lưu lại token, name, id, role
export const getUserInfo = async (): Promise<UserInfo | null> => {
  try {
    // const token = await AsyncStorage.getItem('token');
    // const userId = await AsyncStorage.getItem('id');
    const response = await axiosInstance.post('/it4788/get_user_info', {
      //user_id: id,
      user_id: 397,
      //user_id: token
      token: '1mKnHR',
    });
    const data = response.data;
    data.avatar = getDirectImageLink(data.avatar);
    return data;
  } catch (error) {
    return null;
  }
};
