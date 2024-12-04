import {MaterialInfo, MaterialUploadReq} from '../models/Material';
import {exportFileType} from '../features/material/actions';
import {Alert} from 'react-native';
import axiosInstance from './apiConfig';

const DOMAIN = '/it5023e';
const token = 'VQQmC0';
export const getMaterialList = async (
  classId: string,
): Promise<MaterialInfo[] | []> => {
  try {
    const response = await axiosInstance.post(`${DOMAIN}/get_material_list`, {
      token: token,
      class_id: classId,
    });
    const data = response.data;
    return data;
  } catch (error) {
    return [];
  }
};

export const getMaterialInfo = async (
  materialId: string,
): Promise<MaterialInfo | null> => {
  try {
    const response = await axiosInstance.post(`${DOMAIN}/get_material_info`, {
      token: token,
      material_id: materialId,
    });
    const data = response.data;
    return data;
  } catch (error) {
    return null;
  }
};

export const deleteMaterial = async (materialId: string): Promise<boolean> => {
  try {
    await axiosInstance.post(`${DOMAIN}/delete_material`, {
      token: token,
      material_id: materialId,
    });
    Alert.alert('Xoá tài liệu thành công!');
    return true;
  } catch (error) {
    return false;
  }
};

export const uploadMaterial = async (
  classId: string,
  material: MaterialUploadReq,
): Promise<MaterialInfo | null> => {
  try {
    const formData = new FormData();

    formData.append('file', material.file);
    formData.append('title', material.title);
    formData.append('token', token);
    formData.append('materialType', exportFileType(material.file.name || ''));
    formData.append('classId', classId);
    formData.append('description', material.description);

    const response = await axiosInstance.post(
      `${DOMAIN}/upload_material`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    const data = response.data;
    Alert.alert('Up tài liệu thành công!');
    return data;
  } catch (error) {
    return null;
  }
};

export const editMaterial = async (
  materialId: string,
  material: MaterialUploadReq,
): Promise<MaterialInfo | null> => {
  try {
    const formData = new FormData();

    formData.append('file', material.file);
    formData.append('title', material.title);
    formData.append('token', token);
    formData.append('materialType', exportFileType(material.file.name || ''));
    formData.append('materialId', materialId);
    formData.append('description', material.description);

    const response = await axiosInstance.post(
      `${DOMAIN}/edit_material`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    const data = response.data;
    Alert.alert('Up tài liệu thành công!');
    return data;
  } catch (error) {
    return null;
  }
};
