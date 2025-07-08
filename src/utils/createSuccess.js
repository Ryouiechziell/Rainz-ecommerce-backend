module.exports = (status, message, data) => {
  const response = {
    success: true,
    status: status || 200,
    message: message || 'Berhasil',
  };

  if (data !== undefined && data !== null) {
    response.data = data;
  }

  return response;
}
