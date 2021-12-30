const removeNonNumeric = (num) =>
  num ? num.toString().replace(/[^0-9]/g, "") : "";

module.exports = removeNonNumeric;
