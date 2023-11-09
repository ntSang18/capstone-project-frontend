function isExpired(time) {
  var now = new Date();
  var expire_time = new Date(time);
  if (expire_time.getTime() < now.getTime()) {
    return true;
  }
  return false;
}

export { isExpired };
