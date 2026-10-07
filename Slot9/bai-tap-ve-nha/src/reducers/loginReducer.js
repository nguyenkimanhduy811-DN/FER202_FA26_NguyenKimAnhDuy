export const initialLoginState = {
  values: {
    email: '',
    password: '',
    remember: false
  },
  errors: {},
  touched: {},
  status: 'idle',
  message: ''
};

export function validateLogin(values) {
  const errors = {};

  if (!values.email.trim()) {
    errors.email = 'Vui lòng nhập email';
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      values.email.trim()
    )
  ) {
    errors.email = 'Email không đúng định dạng';
  }

  if (!values.password) {
    errors.password =
      'Vui lòng nhập mật khẩu';
  } else if (values.password.length < 8) {
    errors.password =
      'Mật khẩu phải có ít nhất 8 ký tự';
  }

  return errors;
}

export function loginReducer(state, action) {
  switch (action.type) {
    case 'CHANGE_FIELD': {
      const { name, value } = action.payload;

      const values = {
        ...state.values,
        [name]: value
      };

      const errors = validateLogin(values);

      return {
        ...state,
        values,
        errors,
        message: '',
        status:
          state.status === 'error'
            ? 'idle'
            : state.status
      };
    }

    case 'BLUR_FIELD': {
      const { name } = action.payload;

      return {
        ...state,
        touched: {
          ...state.touched,
          [name]: true
        }
      };
    }

    case 'SUBMIT': {
      const errors = validateLogin(
        state.values
      );

      const touched = {
        email: true,
        password: true,
        remember: true
      };

      if (Object.keys(errors).length > 0) {
        return {
          ...state,
          errors,
          touched,
          status: 'idle',
          message: ''
        };
      }

      return {
        ...state,
        errors: {},
        touched,
        status: 'submitting',
        message: ''
      };
    }

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        status: 'success',
        message: action.payload
      };

    case 'LOGIN_FAILURE':
      return {
        ...state,
        status: 'error',
        message:
          'Email hoặc mật khẩu không đúng'
      };

    case 'RESET':
      return initialLoginState;

    default:
      throw new Error(
        `Action không hợp lệ: ${action.type}`
      );
  }
}