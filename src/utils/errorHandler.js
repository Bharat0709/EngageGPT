export const getErrorMessage = (error) => {
  console.log(error);
  if (error.response && error.response.data) {
    if (Array.isArray(error.response.data.errors) && error.response.data.errors.length > 0) {
      return error.response.data.message;
    }
    if (error.response.data.message) {
      return error.response.data.message;
    }
    return 'Something went wrong. Please try again.';
  } else if (error.request) {
    return 'No response from server. Please try again.';
  } else {
    return 'An unexpected error occurred. Please try again.';
  }
};
