const STATUS = {
  UNCONFIRMED: 'UNCONFIRMED',
  UNPAID: 'UNPAID',
  DENIED: 'DENIED',
  EXPIRED: 'EXPIRED',
  PUBLIC: 'PUBLIC',
};

const LABEL_STATUS = [
  {
    text: 'Đang hiển thị',
    value: 'PUBLIC',
  },
  {
    text: 'Đã hết hạn',
    value: 'EXPIRED',
  },
  {
    text: 'Bị từ chối',
    value: 'DENIED',
  },
  {
    text: 'Chưa thanh toán',
    value: 'UNPAID',
  },
  {
    text: 'Chưa duyệt',
    value: 'UNCONFIRMED',
  },
];

export { STATUS, LABEL_STATUS };
