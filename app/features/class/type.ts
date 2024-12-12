export type AbsenceRequestInfo = {
  title: string;
  date: string;
  status: 'ACCEPTED' | 'PENDING' | 'REJECTED';
};

export type AbsenceRequestsGroup = {
  title: string;
  items: AbsenceRequestInfo[];
};

export type AbsenceRequestForm = {
  title: string;
  date: string;
  reason: string;
  status?: 'ACCEPTED' | 'PENDING' | 'REJECTED';
  file?: string;
  review?: string;
};

export type StudentAccount = {
  account_id: number;
  last_name: string;
  first_name: string;
  email: string;
  student_id: string;
}

export type AbsenceRequestReponse = AbsenceRequestForm & {
  id: number;
  student_account: StudentAccount;
};
