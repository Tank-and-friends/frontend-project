import axiosInstance from '../../apis/apiConfig';
import {Survey} from './type';

export const getAllSurveys = async (
  classId = '000254',
): Promise<Survey[]> => {
  try {
    const response = await axiosInstance.post('/it5023e/get_all_surveys', {
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
    console.log(error);
    return [];
  }
};

export const getStudentAssignments = async (
  classId = '000254',
  type: string | null = null,
): Promise<Survey[]> => {
  try {
    const response = await axiosInstance.post(
      '/it5023e/get_student_assignments',
      {
        type,
        class_id: classId,
      },
    );
    console.log(response);

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
    console.log(error);
    return [];
  }
};

export const deleteAssignment = async (
  survey_id: string,
): Promise<boolean> => {
  try {
    const response = await axiosInstance.post('/it5023e/delete_survey', {
      survey_id,
    });
    console.log('abcd: ', response);
    if (response.meta.code == '1000') {
      console.log('ok');
      return true;
    }
    return false;
  } catch (error) {
    console.log('deleteError', error);
    return false;
  }
};
