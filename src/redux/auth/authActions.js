import Cookies from 'js-cookie';
import { login, signup } from '../../network/Auth';
import { encodeToken } from '../../utils/tokenUtils';

export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export const LOGOUT = 'LOGOUT';

export const setAuthTokenAction = (token) => ({
  type: SET_AUTH_TOKEN,
  payload: token,
});

export const logoutAction = () => {
  Cookies.remove('engage-gpt');
  return {
    type: LOGOUT,
  };
};

export const handleSignup = (email, password) => async (dispatch) => {
  try {
    const response = await signup(email, password);
    const token = response.token;
    const encodedToken = encodeToken(token);
    Cookies.set('engage-gpt', encodedToken, {
      expires: 3,
      secure: true,
      sameSite: 'strict',
    });
    dispatch(setAuthTokenAction(token));
    return token;
  } catch (error) {
    const errorMessage = error.message;
    console.error('Signup Error:', errorMessage);
    throw new Error(errorMessage);
  }
};

export const handleLogin = (email, password) => async (dispatch) => {
  try {
    const response = await login(email, password);
    const token = response.token;
    const encodedToken = encodeToken(token);
    Cookies.set('engage-gpt', encodedToken, {
      expires: 3,
      secure: true,
      sameSite: 'strict',
    });
    dispatch(setAuthTokenAction(token));
    return token;
  } catch (error) {
    const errorMessage = error.message;
    console.error('Login Error:', errorMessage);
    throw new Error(errorMessage);
  }
};
