function formatAsMoney(value) {
  if (value) {
    return parseFloat(value).toFixed(2);
  } else {
    return "0.00";
  }
}

function camelcase(str) {
  return str.replace(/^(\w)/, function(char) { return char.toUpperCase(); });
}
