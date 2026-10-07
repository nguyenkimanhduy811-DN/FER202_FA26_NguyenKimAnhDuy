export function validateRegister(values) {
  const errors = {};

  // Họ tên
  if (!values.fullName.trim()) {
    errors.fullName = 'Vui lòng nhập họ tên';
  } else if (values.fullName.trim().length < 3) {
    errors.fullName =
      'Họ tên phải có ít nhất 3 ký tự';
  }

  // Email
  if (!values.email.trim()) {
    errors.email = 'Vui lòng nhập email';
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      values.email.trim()
    )
  ) {
    errors.email = 'Email không đúng định dạng';
  }

  // Mật khẩu
  if (!values.password) {
    errors.password = 'Vui lòng nhập mật khẩu';
  } else if (values.password.length < 8) {
    errors.password =
      'Mật khẩu phải có ít nhất 8 ký tự';
  } else if (
    !/[A-Za-z]/.test(values.password) ||
    !/[0-9]/.test(values.password)
  ) {
    errors.password =
      'Mật khẩu phải có cả chữ và số';
  }

  // Nhập lại mật khẩu
  if (
    values.password !== values.confirmPassword
  ) {
    errors.confirmPassword =
      'Mật khẩu nhập lại không khớp';
  }

  // Số điện thoại - không bắt buộc
  if (
    values.phone.trim() &&
    !/^0\d{9}$/.test(values.phone.trim())
  ) {
    errors.phone =
      'Số điện thoại gồm 10 số, bắt đầu bằng 0';
  }

  // Ngày sinh - không bắt buộc, phải từ 16 tuổi
  if (values.birthday) {
    const today = new Date();
    const birthDate = new Date(
      `${values.birthday}T00:00:00`
    );

    let age =
      today.getFullYear() -
      birthDate.getFullYear();

    const monthDiff =
      today.getMonth() -
      birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 &&
        today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    if (age < 16) {
      errors.birthday =
        'Bạn phải từ 16 tuổi trở lên';
    }
  }

  // Chuyên ngành
  if (!values.major) {
    errors.major =
      'Vui lòng chọn chuyên ngành';
  }

  // Điều khoản
  if (!values.agree) {
    errors.agree =
      'Bạn cần đồng ý điều khoản';
  }

  return errors;
}