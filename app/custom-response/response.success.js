exports.successMessage = (data) => {
  const result = {
    message: `Success create user ${data.fullName}`,
    data: data,
  };

  return result;
};
