export function validateCheckout(values) {
  const errors = {};

  if (!values.receiver.trim()) {
    errors.receiver =
      'Vui lòng nhập người nhận';
  } else if (
    values.receiver.trim().length < 3
  ) {
    errors.receiver =
      'Người nhận phải có ít nhất 3 ký tự';
  }

  if (!values.phone.trim()) {
    errors.phone =
      'Vui lòng nhập số điện thoại';
  } else if (
    !/^0\d{9}$/.test(values.phone.trim())
  ) {
    errors.phone =
      'Số điện thoại gồm 10 số, bắt đầu bằng 0';
  }

  if (!values.address.trim()) {
    errors.address =
      'Vui lòng nhập địa chỉ';
  } else if (
    values.address.trim().length < 10
  ) {
    errors.address =
      'Địa chỉ phải có ít nhất 10 ký tự';
  }

  if (!values.payment) {
    errors.payment =
      'Vui lòng chọn phương thức thanh toán';
  }

  return errors;
}