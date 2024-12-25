export const encodeToken = (token) => btoa(token);
export const decodeToken = (encodedToken) => atob(encodedToken);
