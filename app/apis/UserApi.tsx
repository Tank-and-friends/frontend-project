import {UserInfo} from '../models/User';
import axiosInstance from './apiConfig';
// import {getUniqueId} from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';

//sau khi login, AsyncStorage sẽ lưu lại token, name, id, role
export interface SignupRequest {
  ho: string;
  ten: string;
  email: string;
  password: string;
  uuid: number;
  role: string;
}

export interface SignupResponse {
  code: string;
  message: string;
  verify_code: string;
}

export interface GetVerifyCodeRequest {
  email: string;
  password: string;
}

export interface GetVerifyCodeResponse {
  code: string;
  message: string;
  verify_code: string;
}

export interface CheckVerifyCodeRequest {
  email: string;
  verify_code: string;
}

export interface CheckVerifyCodeResponse {
  code: string;
  message: string;
  userId: number;
}
export interface LoginRequest {
  email: string;
  password: string;
  device_id: number;
}

export interface LoginResponse {
  code: string;
  message: string;
  data: {
    email: string;
    id: string;
    ho: string;
    ten: string;
    name: string;
    token: string;
    role: string;
    status: string;
    avatar: string | null;
    class_list: string[];
  };
}
export const signup = async (
  ho: string,
  ten: string,
  email: string,
  password: string,
  uuid: number,
  role: string,
): Promise<CheckVerifyCodeResponse | null> => {
  try {
    const response = await axiosInstance.post('/it4788/signup', {
      ho,
      ten,
      email,
      password,
      uuid,
      role,
    });
    if (response.verify_code) {
      const res = await checkVerifyCode(email, response.verify_code);
      return res;
    } else {
      return null;
    }
  } catch (error: any) {
    console.error('Signup API error:', error?.response?.data || error?.message);
    return null;
  }
};
export const checkVerifyCode = async (
  email: string,
  verifyCode: string,
): Promise<CheckVerifyCodeResponse | null> => {
  try {
    const response = await axiosInstance.post('/it4788/check_verify_code', {
      email,
      verify_code: verifyCode,
    });

    if (response?.userId) {
      return response;
    } else {
      console.error('Verify code check failed');
      return null;
    }
  } catch (error: any) {
    console.error(
      'Check verify code error:',
      error?.response?.data || error?.message,
    );
    return null;
  }
};

export const getVerifyCode = async (
  email: string,
  password: string,
): Promise<{verify_code: string} | null> => {
  try {
    const response = await axiosInstance.post('/it4788/get_verify_code', {
      email,
      password,
    });

    if (response.data?.verify_code) {
      return response.data;
    } else {
      console.error('No verify code received');
      return null;
    }
  } catch (error: any) {
    console.error(
      'Get verify code error:',
      error?.response?.data || error?.message,
    );
    return null;
  }
};

export const login = async (
  email: string,
  password: string,
): Promise<LoginResponse | null> => {
  try {
    // const deviceId = getUniqueId(); // Lấy device_id từ thiết bị
    const deviceId = 1;
    const response = await axiosInstance.post('/it4788/login', {
      email,
      password,
      device_id: deviceId,
    });

    const data: LoginResponse = response.data;

    // Lưu token vào AsyncStorage
    AsyncStorage.setItem('token', data.token);

    console.log('Login successful:', data);
    return data;
  } catch (error) {
    console.error('Login API error:', error);
    return null;
  }
};
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
    return data;
  } catch (error) {
    return null;
  }
};
