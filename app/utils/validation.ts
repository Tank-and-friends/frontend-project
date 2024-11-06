
export const validateEmail = (email: string): string => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.match(emailRegex)) {
      return 'Email không hợp lệ';
    }
    return '';
  };
  export const validatePassword = (password: string): string => {
    if (password.length < 6) {
      return 'Mật khẩu phải có ít nhất 6 ký tự';
    }
    return '';
  };
  export const validateBirthDate = (birthDate: string): string => {
    if (!birthDate) {
      return 'Ngày sinh không được để trống';
    }
    return '';
  };