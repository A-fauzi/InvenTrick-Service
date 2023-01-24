const date = require("date-and-time");

exports.currentDate = () => {
  const now = new Date();

  const currentDate = date.format(now, "dddd, MMMM DD YYYY | HH:mm:ss WIB");

  return currentDate;
};
