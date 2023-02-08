const date = require("date-and-time");

exports.currentDate = () => {
  const now = new Date;

  const currentDate = date.format(now, "ddd, MMM DD YYYY | HH:mm:ss");

  return currentDate;
};
