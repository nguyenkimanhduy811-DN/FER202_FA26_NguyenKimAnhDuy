export const TRANSITIONS = {
  pending: {
    CONFIRM: 'confirmed',
    CANCEL: 'cancelled'
  },

  confirmed: {
    SHIP: 'shipping',
    CANCEL: 'cancelled'
  },

  shipping: {
    DELIVER: 'delivered'
  },

  delivered: {},

  cancelled: {}
};

export const STATUS_INFO = {
  pending: {
    label: 'Chờ xác nhận',
    variant: 'secondary'
  },

  confirmed: {
    label: 'Đã xác nhận',
    variant: 'primary'
  },

  shipping: {
    label: 'Đang giao',
    variant: 'warning'
  },

  delivered: {
    label: 'Đã giao',
    variant: 'success'
  },

  cancelled: {
    label: 'Đã hủy',
    variant: 'danger'
  }
};

export const EVENT_LABELS = {
  CONFIRM: 'Xác nhận',
  SHIP: 'Giao hàng',
  DELIVER: 'Đã nhận hàng',
  CANCEL: 'Hủy đơn'
};

export const initialState = {
  status: 'pending',
  cancelReason: '',
  error: '',
  timeline: [
    {
      status: 'pending',
      at: '08:00'
    }
  ]
};