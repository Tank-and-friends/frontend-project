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
