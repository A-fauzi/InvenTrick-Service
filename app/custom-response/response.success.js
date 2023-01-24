exports.successMessage = (data) => {
  const result = {
    message: `Success create ${data.fullName}`,
    data: data,
  };

  return result;
};
