const sendEmailToUser = async (email) => {
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
  } else {
    return 'error';
  }
};

export { sendEmailToUser };
