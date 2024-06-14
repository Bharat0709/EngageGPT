const sendEmailToUser = async (email) => {
  try {
    const response = await fetch(
      `http://localhost:8000/api/v1/user/invite/${email}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.ok) {
      return 'success';
    } else if (response.status === 429) {
      return 'toomanyrequests';
    } else {
      return 'fail';
    }
  } catch (error) {
    return 'error';
  }
};

export { sendEmailToUser };
