export const validateEmail = (email: string): string => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email.match(emailRegex)) {
    return 'Email không hợp lệ';
  }
  return '';
};
export const validatePassword = (password: string): string => {
  if (password.length < 8) {
    return 'Mật khẩu phải có ít nhất 8 ký tự';
  }
  if (!/[A-Z]/.test(password)) {
    return 'Mật khẩu phải chứa ít nhất một chữ cái viết hoa';
  }
  if (!/\d/.test(password)) {
    return 'Mật khẩu phải chứa ít nhất một chữ số';
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return 'Mật khẩu phải chứa ít nhất một ký tự đặc biệt';
  }
  return ''; // Trả về chuỗi rỗng nếu mật khẩu hợp lệ
};

export const validateBirthDate = (birthDate: string): string => {
  if (!birthDate) {
    return 'Ngày sinh không được để trống';
  }
  return '';
};
