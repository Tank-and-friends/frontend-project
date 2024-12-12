import axiosInstance from '../../../apis/apiConfig';
import {AbsenceRequestReponse} from '../type';

export const getAbsenceRequests = async (
  token = 'rMpDWw',
  class_id = '000268',
  status = null,
  page = 0,
  page_size = 2,
): Promise<AbsenceRequestReponse[]> => {
  try {
    const response = await axiosInstance.post('/it5023e/get_absence_requests', {
      token,
      class_id,
      status,
      pageable_request: {
        page,
        page_size,
      },
    });

    const data = response.data;

    const absenceRequests = data.page_content.map((item: any) => {
      return {
        id: item.id,
        title: item.title,
        date: item.absence_date,
        reason: item.reason,
        status: item.status,
        file: item.file,
        review: item.review,
        student_account: item.student_account,
      };
    });

    return absenceRequests;
  } catch (error) {
    console.log(error);
    return [];
  }
};
