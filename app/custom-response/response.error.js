exports.errorMessage = (err) => {
  let errorMessage;

  if (err.code == 11000) {
    errorMessage = Object.keys(err.keyValue)[0] + " already exists.";
  } else {
    errorMessage = err.message;
  }

  return errorMessage;
};
