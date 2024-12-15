import {MaterialInfo, MaterialUploadReq} from '../models/Material';
import {exportFileType} from '../utils/file';
import {Alert} from 'react-native';
import axiosInstance from './apiConfig';

const DOMAIN = '/it5023e';
export const getMaterialList = async (
  classId: string,
): Promise<MaterialInfo[] | []> => {
  try {
    const response = await axiosInstance.post(`${DOMAIN}/get_material_list`, {
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
    formData.append('materialType', exportFileType(material.file.name || ''));
    formData.append('classId', classId);
    formData.append('description', material.description);

    const response = await axiosInstance.post(
      `${DOMAIN}/upload_material`,
      formData,
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
    formData.append('materialType', exportFileType(material.file.name || ''));
    formData.append('materialId', materialId);
    formData.append('description', material.description);
    console.log(formData);
    const response = await axiosInstance.post(
      `${DOMAIN}/edit_material`,
      formData,
    );
    const data = response.data;
    Alert.alert('Up tài liệu thành công!');
    return data;
  } catch (error) {
    return null;
  }
};
