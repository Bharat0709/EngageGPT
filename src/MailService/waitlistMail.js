const sendEmailToUser = async (email) => {
  try {
    const response = await fetch(
      `https://linkedai.onrender.com/api/v1/user/submit/${email}`,
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
