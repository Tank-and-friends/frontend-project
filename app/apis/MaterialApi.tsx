import axios from 'axios';
import {MaterialInfo, MaterialUploadReq} from '../models/Material';
import {exportFileType} from '../features/material/actions';
import {Alert} from 'react-native';

const BASE_URL = 'http://157.66.24.126:8080/it5023e';
const token = 'iV8V38';
export const getMaterialList = async (
  classId: string,
): Promise<MaterialInfo[] | []> => {
  try {
    const response = await axios.post(`${BASE_URL}/get_material_list`, {
      token: token,
      class_id: classId,
    });
    const data = response.data.data;
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export const getMaterialInfo = async (
  materialId: string,
): Promise<MaterialInfo | null> => {
  try {
    const response = await axios.post(`${BASE_URL}/get_material_info`, {
      token: token,
      material_id: materialId,
    });
    const data = response.data.data;
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export const deleteMaterial = async (materialId: string): Promise<boolean> => {
  try {
    await axios.post(`${BASE_URL}/delete_material`, {
      token: token,
      material_id: materialId,
    });
    Alert.alert('Xoá tài liệu thành công!');
    return true;
  } catch (error) {
    Alert.prompt('Lỗi khi xóa tài liệu:' + error);

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

    const response = await axios.post(`${BASE_URL}/upload_material`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    const data = response.data.data;
    Alert.prompt('Up tài liệu thành công!');
    return data;
  } catch (error) {
    Alert.prompt('Lỗi khi up tài liệu:' + error);
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

    const response = await axios.post(`${BASE_URL}/edit_material`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    const data = response.data.data;
    Alert.prompt('Up tài liệu thành công!');
    return data;
  } catch (error) {
    Alert.prompt('Lỗi khi up tài liệu:' + error);
    return null;
  }
};
