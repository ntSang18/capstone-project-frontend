function toVnd(number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
}

function toVndString(number) {
  var money = number / 1000000;
  return `${money} triệu`;
}

export { toVnd, toVndString };
