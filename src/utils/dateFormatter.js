function dateFormatter(dateTime) {
  return dateTime.split('T')[0];
}

function dateTimeFormatter(dateTime) {
  var strDateTime = `${dateTime.split('T')[0]} ${dateTime.split('T')[1].split('.')[0]}`;
  return strDateTime;
}

export { dateFormatter, dateTimeFormatter };
