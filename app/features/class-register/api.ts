import axiosInstance from '../../apis/apiConfig';
import {ClassResponse} from './types';

export const getOpenClasses = async (): Promise<ClassResponse[]> => {
  try {
    const response = await axiosInstance.post('/it5023e/get_open_classes');    

    const data = response.data;

    const openClasses: ClassResponse[] =
      data?.page_content?.map((classItem: ClassResponse) => ({...classItem})) ||
      [];

    return openClasses;
  } catch (err) {
    console.error('Error fetching classes:', err);
    return [];
  }
};
