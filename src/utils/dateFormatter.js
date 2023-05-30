function dateFormatter(dateTime) {
  return dateTime.split('T')[0];
}

function dateTimeFormatter(dateTime) {
  var strDateTime = `${dateTime.split('T')[0]} ${dateTime.split('T')[1].split('.')[0]}`;
  return strDateTime;
}

function diffTime(dateTime) {
  var date1 = new Date(dateTime);
  var date2 = new Date();
  var diff = new Date(date2.getTime() - date1.getTime());
  var days = diff.getUTCDate() - 1;
  var hours = Math.floor(Math.abs(date1 - date2) / 36e5);
  if (days < 1) {
    return `${hours} giờ trước`;
  }
  return `${days} ngày trước`;
}

export { dateFormatter, dateTimeFormatter, diffTime };
