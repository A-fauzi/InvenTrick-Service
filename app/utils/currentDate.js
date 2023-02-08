const date = require("date-and-time");

exports.currentDate = () => {
  const now = new Date(new Date().toUTCString());

  const currentDate = date.format(now, "ddd, MMM DD YYYY | HH:mm:ss");

  return currentDate;
};
