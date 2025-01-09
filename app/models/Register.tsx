export type ClassInfo = {
  class_id: string;
  class_name: string;
  attached_code: string;
  class_type: string;
  lecturer_name: string;
  lecturer_account_id: string;
  student_count: string;
  start_date: string;
  end_date: string;
  status: string;
  student_accounts?: StudentInfo[];
};

export type BasicClassInfo = {
  id: number;
  class_id: string;
  class_name: string;
  lecturer_id: string;
  max_student_amount: string;
  class_type: string;
  start_date: string;
  end_date: string;
  status: string;
  lecturer_account_id: string;
};

export type StudentInfo = {
  account_id: string;
  last_name: string;
  first_name: string;
  email: string;
  student_id: string;
};

export type CreateClassRes = {
  id: number;
  class_id: string;
  class_name: string;
  lecturer_id: string;
  max_student_amount: string;
  class_type: string;
  start_date: string;
  end_date: string;
  status: string;
};

export type CreateClassReq = {
  class_id: string;
  class_name: string;
  class_type: string;
  max_student_amount: string;
  start_date: string;
  end_date: string;
};

export type EditClassReq = {
  class_id: string;
  class_name: string;
  start_date: string;
  end_date: string;
};
