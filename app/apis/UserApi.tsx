import {Alert} from 'react-native';
import {MaterialUrlInfo} from '../models/Material';
import {UserInfo} from '../models/User';
import axiosInstance from './apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getDirectImageLink} from '../utils/image';
//sau khi login, AsyncStorage sẽ lưu lại token, name, id, role
export const getUserInfo = async (): Promise<UserInfo | null> => {
  try {
    // const token = AsyncStorage.getItem('token');
    // const userId = AsyncStorage.getItem('id');
    const response = await axiosInstance.post('/it4788/get_user_info', {
      //user_id: id,
      user_id: 397,
      //user_id: token
      token: '1mKnHR',
    });
    const data = response.data;
    return data;
  } catch (error) {
    return null;
  }
};
