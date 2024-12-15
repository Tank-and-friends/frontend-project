import {DocumentPickerResponse} from 'react-native-document-picker';

export type AbsenceRequestStatus = 'ACCEPTED' | 'PENDING' | 'REJECTED';

export type AttendanceStatus = 'PRESENT' | 'EXCUSED_ABSENCE' | 'UNEXCUSED_ABSENCE';

export type AbsenceRequestInfo = {
  title: string;
  status?: AbsenceRequestStatus;
};

export type AbsenceRequestsGroup = {
  title: string;
  items: AbsenceRequestInfo[];
};

export type AbsenceRequestForm = {
  title: string;
  date: string;
  reason: string;
  file?: DocumentPickerResponse;
};

export type StudentAccount = {
  account_id: number;
  last_name: string;
  first_name: string;
  email: string;
  student_id: string;
};

export type AbsenceRequestReponse = AbsenceRequestForm & {
  id: number;
  student_account: StudentAccount;
  status?: AbsenceRequestStatus;
  file_url?: string;
};

export type AttendanceStudentDetails = {
  attendance_id: string;
  student_id: string;
  status: AttendanceStatus;
};

export type AttendanceDetails = {
  id: string;
  attendance_status: AttendanceStatus;
  attendance_time: string;
  class_detail_id: string;
};

export type PageInfo = {
  total_records: number;
  total_page: number;
  page_size: number;
  page: number;
  next_page: number | null;
  previous_page: number | null;
}

export type Student = {
  attendance_id?: string;
  account_id: number;
  student_id: string;
  name: string;
  status: AttendanceStatus;
}
