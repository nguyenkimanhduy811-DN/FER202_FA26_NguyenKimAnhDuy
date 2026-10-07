

export function formatVND(value) {
  return value.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND'
  });
}