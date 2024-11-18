export const getDayOfWeek = (dateString: string): string => {
  const days = [
    'Chủ Nhật',
    'Thứ Hai',
    'Thứ Ba',
    'Thứ Tư',
    'Thứ Năm',
    'Thứ Sáu',
    'Thứ Bảy',
  ];

  // Chuyển chuỗi ngày thành đối tượng Date
  const date = new Date(dateString);

  // Kiểm tra nếu ngày không hợp lệ
  if (isNaN(date.getTime())) {
    return 'Ngày không hợp lệ';
  }

  // Lấy thứ trong tuần (0: Chủ Nhật, 1: Thứ Hai, ...)
  const dayIndex = date.getDay();

  return days[dayIndex];
};
