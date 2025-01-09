import {DocumentPickerResponse} from 'react-native-document-picker';
import axiosInstance from '../../apis/apiConfig';
import {Survey} from './type';
import AsyncStorage from '@react-native-async-storage/async-storage';


const getToken = (): string => {
  try {
    return typeof localStorage !== 'undefined' && localStorage.getItem('token')
      ? localStorage.getItem('token')!
      : 'Mq9YoW';
  } catch (error) {
    console.warn('localStorage is not available. Using default token.');
    return 'Mq9YoW';
  }
};

export const getAllSurveys = async (
  token = getToken(),
  classId = '000254',
): Promise<Survey[]> => {
  try {
    const response = await axiosInstance.post('/it5023e/get_all_surveys', {
      token,
      class_id: classId,
    });
    // console.log('haha', response);

    const data = response.data;

    const surveyData = data?.map((item: Survey) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      lecturer_id: item.lecturer_id,
      deadline: item.deadline,
      file_url: item.file_url,
      class_id: item.class_id,
    }));

    return surveyData;
  } catch (error) {
    console.log('getAllSurveys: ', error);
    return [];
  }
};

export const getStudentAssignments = async (
  classId = '000254',
  type: string | null = null,
  token = getToken(),
): Promise<Survey[]> => {
  try {
    const response = await axiosInstance.post(
      '/it5023e/get_student_assignments',
      {
        token,
        type,
        class_id: classId,
      },
    );
    //console.log(response);

    const data = response.data;

    const surveyData = data?.map((item: Survey) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      lecturer_id: item.lecturer_id,
      deadline: item.deadline,
      file_url: item.file_url,
      class_id: item.class_id,
    }));

    return surveyData;
  } catch (error) {
    console.log('getsudent: ', error);
    return [];
  }
};

export const deleteAssignment = async (
  token = getToken(),
  survey_id: string,
): Promise<boolean> => {
  try {
    const response = await axiosInstance.post('/it5023e/delete_survey', {
      token,
      survey_id,
    });
    //console.log('abcd: ', response);
    if (response.meta.code == '1000') {
      //console.log('ok');
      return true;
    }
    return false;
  } catch (error) {
    console.log('deleteError', error);
    return false;
  }
};

export const submitSurvey = async (
  file: DocumentPickerResponse,
  textResponse: string,
  assignmentId: string,
): Promise<any> => {
  try {
    const token = await AsyncStorage.getItem('token');

    if (!token) {
      throw new Error('Token không hợp lệ!');
    }

    const formData = new FormData();

    formData.append('file', {
      uri: file.uri, // URI của file
      type: file.type, // Loại file (MIME type)
      name: file.name, // Tên file
    });

    formData.append('token', token);
    formData.append('assignmentId', assignmentId);
    formData.append('textResponse', textResponse);

    const response = await axiosInstance.post(
      '/it5023e/submit_survey',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error('Error during survey submission:', error);
    throw error; // Ném lỗi ra để xử lý bên ngoài
  }
};
