import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  BasicClassInfo,
  ClassInfo,
  CreateClassReq,
  CreateClassRes,
  EditClassReq,
} from '../models/Register';
import axiosInstance from './apiConfig';
import {Alert} from 'react-native';

const DOMAIN = '/it5023e';

const INFINITE = '1000';

export const createClass = async (
  request: CreateClassReq,
): Promise<CreateClassRes | null> => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axiosInstance.post(`${DOMAIN}/create_class`, {
      ...request,
      token: token,
      max_student_amount: parseInt(request.max_student_amount, 10),
    });
    const data = response.data;
    Alert.alert('Tạo lớp thành công!');
    return data;
  } catch (error) {
    Alert.alert('Xảy ra lỗi khi tạo lớp!');
    return null;
  }
};

export const editClass = async (
  request: EditClassReq,
): Promise<CreateClassRes | null> => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axiosInstance.post(`${DOMAIN}/edit_class`, {
      token: token,
      ...request,
    });
    const data = response.data;
    Alert.alert('Cập nhật lớp thành công!');
    return data;
  } catch (error) {
    Alert.alert('Xảy ra lỗi khi cập nhật lớp!');
    return null;
  }
};

export const deleteClass = async (classId: string): Promise<boolean> => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axiosInstance.post(`${DOMAIN}/edit_class`, {
      token: token,
      role: 'LECTURER',
      class_id: classId,
    });
    if (response.status === 200) {
      Alert.alert('Xóa lớp thành công!');
      return true;
    }
    Alert.alert('Không thể xóa lớp!');
    return false;
  } catch (error) {
    Alert.alert('Xảy ra lỗi khi tạo lớp!');
    return false;
  }
};

export const getClassInfo = async (
  classId: string,
): Promise<ClassInfo | null> => {
  try {
    const token = await AsyncStorage.getItem('token');
    const userId = await AsyncStorage.getItem('id');
    const response = await axiosInstance.post(`${DOMAIN}/get_class_info`, {
      token: token,
      role: 'LECTURER',
      account_id: userId,
      class_id: classId,
    });
    const data = response.data;
    return data;
  } catch (error) {
    return null;
  }
};

// export const getClassInfoByFilter = async (
//     classId: string,
//   ): Promise<ClassInfo | null> => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       const userId = await AsyncStorage.getItem('id');
//       const response = await axiosInstance.post(`${DOMAIN}/get_class_info`, {
//         token: token,
//         role: 'LECTURER',
//         account_id: userId,
//         class_id: classId,
//       });
//       const data = response.data;
//       return data;
//     } catch (error) {
//       return null;
//     }
//   };

export const getBasicClassInfo = async (
  classId: string,
): Promise<BasicClassInfo | null> => {
  try {
    const token = await AsyncStorage.getItem('token');
    const userId = await AsyncStorage.getItem('id');
    const role = await AsyncStorage.getItem('role');
    const response = await axiosInstance.post(
      `${DOMAIN}/get_basic_class_info`,
      {
        token: token,
        role: role,
        account_id: userId,
        class_id: classId,
      },
    );
    const data = response.data;
    return data;
  } catch (error) {
    return null;
  }
};

export const getListClasses = async (): Promise<ClassInfo[] | null> => {
  try {
    const token = await AsyncStorage.getItem('token');
    const role = await AsyncStorage.getItem('role');
    const id = await AsyncStorage.getItem('id');
    const response = await axiosInstance.post(`${DOMAIN}/get_class_list`, {
      token: token,
      role: role,
      account_id: id,
      pageable_request: {
        page: '0',
        page_size: INFINITE,
      },
    });
    const data = response.data.page_content;
    return data;
  } catch (error) {
    return null;
  }
};

export const getOpenClasses = async (
  page: string,
): Promise<ClassInfo[] | null> => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axiosInstance.post(`${DOMAIN}/get_open_classes`, {
      token: token,
      pageable_request: {
        page: page,
        page_size: INFINITE,
      },
    });
    const data = response.data.page_content;
    return data;
  } catch (error) {
    return null;
  }
};

export const registerClass = async (classIds: string[]): Promise<boolean> => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axiosInstance.post(`${DOMAIN}/register_class`, {
      token: token,
      class_ids: classIds,
    });
    if (response.data.status === 'SUCCESS') {
      Alert.alert('Đăng ký lớp thành công!');
      return true;
    }
    Alert.alert('Có lỗi khi đăng ký lớp!');
    return false;
  } catch (error) {
    Alert.alert('Có lỗi khi đăng ký lớp!');
    return false;
  }
};
