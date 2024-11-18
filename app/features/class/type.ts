export type AbsenceRequestInfo = {
  title: string;
  date: string;
  status: 'accepted' | 'pending' | 'rejected';
};

export type AbsenceRequestsGroup = {
  title: string;
  items: AbsenceRequestInfo[];
};
