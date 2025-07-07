export const connectLinkedIn = () => {
  const authUrl = process.env.REACT_APP_LINKEDIN_AUTH_URL;
  window.location.href = authUrl;
};
