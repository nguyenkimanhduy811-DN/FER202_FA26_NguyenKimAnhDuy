export const fields = [
  {
    id: 'fullName',
    label: 'Họ và tên',
    type: 'text',
    required: true,
    helpText: 'Nhập họ và tên của bạn'
  },
  {
    id: 'email',
    label: 'Email',
    type: 'email',
    required: true,
    helpText: 'Ví dụ: example@gmail.com'
  },
  {
    id: 'password',
    label: 'Mật khẩu',
    type: 'password',
    required: true,
    helpText: 'Nhập mật khẩu'
  },
  {
    id: 'confirmPassword',
    label: 'Nhập lại mật khẩu',
    type: 'password',
    required: true,
    helpText: 'Nhập lại mật khẩu'
  },
  {
    id: 'phone',
    label: 'Số điện thoại',
    type: 'tel',
    required: false,
    helpText: 'Ví dụ: 0912345678'
  },
  {
    id: 'birthday',
    label: 'Ngày sinh',
    type: 'date',
    required: false
  }
];

export const initialValues = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
  birthday: '',
  gender: 'Nam',
  major: '',
  agree: false
};