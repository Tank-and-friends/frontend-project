import AsyncStorage from '@react-native-async-storage/async-storage';
import {ToastAndroid} from 'react-native';
import axiosInstance from '../../apis/apiConfig';
import {
  AbsenceRequestForm,
  AbsenceRequestReponse,
  AbsenceRequestStatus,
  AttendanceDetails,
  AttendanceStatus,
  AttendanceStudentDetails,
  PageInfo,
  StudentAccount,
} from './type';

export const getAbsenceRequests = async (
  class_id: string,
  status = null,
  page = 0,
  page_size = 10,
): Promise<AbsenceRequestReponse[]> => {
  try {
    const response = await axiosInstance.post('/it5023e/get_absence_requests', {
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
        file_url: item.file_url,
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

export const getAbsenceRequestsForStudent = async (
  class_id: string,
  status: AbsenceRequestStatus | null = null,
  page = 0,
  page_size = 10,
): Promise<AbsenceRequestReponse[]> => {
  try {
    const response = await axiosInstance.post(
      '/it5023e/get_student_absence_requests',
      {
        class_id,
        status,
        pageable_request: {
          page,
          page_size,
        },
      },
    );

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

export const createAbsenceRequest = async (
  classId: string,
  absenceRequest: AbsenceRequestForm,
): Promise<void> => {
  try {
    const formData = new FormData();
    formData.append('classId', classId);
    Object.entries(absenceRequest).forEach(([key, value]) => {
      if (value) {
        if (key === 'file') {
          if (typeof value !== 'string') {
            formData.append(key, {
              uri: value.uri,
              name: value.name,
              type: value.type,
            });
          }
        } else {
          formData.append(key, value);
        }
      }
    });

    const response = await axiosInstance.post(
      '/it5023e/request_absence',
      formData,
    );

    if (response.data) {
      ToastAndroid.show('Tạo đơn xin nghỉ phép thành công', ToastAndroid.SHORT);
    }
  } catch (error) {
    console.log(error);
  }
};

export const reviewAbsenceRequest = async (
  requestId: number,
  status: 'ACCEPTED' | 'PENDING' | 'REJECTED',
): Promise<void> => {
  try {
    const response = await axiosInstance.post(
      '/it5023e/review_absence_request',
      {
        request_id: requestId,
        status,
      },
    );

    if (response.data) {
      if (status === 'ACCEPTED') {
        ToastAndroid.show(
          'Chấp nhận đơn xin nghỉ phép thành công',
          ToastAndroid.SHORT,
        );
      } else if (status === 'REJECTED') {
        ToastAndroid.show(
          'Từ chối đơn xin nghỉ phép thành công',
          ToastAndroid.SHORT,
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAttendanceDates = async (
  classId: string = '000268',
): Promise<string[]> => {
  try {
    const response = await axiosInstance.post('/it5023e/get_attendance_dates', {
      class_id: classId,
    });

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// Hàm lọc giữ lại student_id duy nhất với attendance_id mới hơn
function filterLatestAttendances(
  attendances: AttendanceStudentDetails[],
): AttendanceStudentDetails[] {
  // Sắp xếp theo attendance_id giảm dần
  attendances.sort(
    (a, b) => parseInt(b.attendance_id, 10) - parseInt(a.attendance_id, 10),
  );

  // Sử dụng Map để lọc
  const filtered = new Map<string, AttendanceStudentDetails>();

  attendances.forEach(attendance => {
    if (!filtered.has(attendance.student_id)) {
      filtered.set(attendance.student_id, attendance);
    }
  });

  return Array.from(filtered.values());
}

export const getAttendanceList = async (
  classId: string = '000268',
  date: string,
  page: number = 0,
  page_size: number = 10,
): Promise<{
  attendanceStudentDetails: AttendanceStudentDetails[];
  page_info: PageInfo | null;
}> => {
  try {
    const response = await axiosInstance.post('/it5023e/get_attendance_list', {
      class_id: classId,
      date,
      pageable_request: {
        page,
        page_size,
      },
    });

    const data = response.data;

    const filteredAttendanceStudentDetails = filterLatestAttendances(
      data.attendance_student_details,
    );

    return {
      attendanceStudentDetails: filteredAttendanceStudentDetails,
      page_info: data.page_info,
    };
  } catch (error) {
    console.log(error);
    return {attendanceStudentDetails: [], page_info: null};
  }
};

/** attendance_list là id truyền vào cho những đứa vắng ko phép */
export const takeAttendance = async (
  classId: string | undefined,
  date: string,
  attendanceList: string[],
): Promise<void> => {
  try {
    const response = await axiosInstance.post('/it5023e/take_attendance', {
      class_id: classId,
      date,
      attendance_list: attendanceList,
    });

    if (response.data) {
      ToastAndroid.show(
        'Lập danh sách điểm danh thành công',
        ToastAndroid.SHORT,
      );
    }
  } catch (error) {
    console.log(error);
  }
};

export const setAttendanceStatus = async (
  attendanceId: string,
  status: AttendanceStatus,
): Promise<AttendanceDetails | null> => {
  console.log(attendanceId, status);

  try {
    const response = await axiosInstance.post(
      '/it5023e/set_attendance_status',
      {
        status,
        attendance_id: attendanceId,
      },
    );
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getStudentsList = async (
  classId: string = '000268',
): Promise<StudentAccount[]> => {
  const role = await AsyncStorage.getItem('role');
  const id = await AsyncStorage.getItem('id');

  try {
    const response = await axiosInstance.post('/it5023e/get_class_info', {
      role,
      account_id: id,
      class_id: classId,
    });

    return response.data.student_accounts;
  } catch (error) {
    console.log(error);
    return [];
  }
};
