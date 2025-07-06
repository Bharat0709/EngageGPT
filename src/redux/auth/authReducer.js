import { LOGOUT, SET_AUTH_TOKEN } from './authActions';
import Cookies from 'js-cookie';
import { decodeToken } from '@utils/tokenUtils';

const encodedToken = Cookies.get('engage-gpt');
const decodedToken = encodedToken ? decodeToken(encodedToken) : null;
const initialState = {
  token: decodedToken || null,
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        token: null,
      };
    default:
      return state;
  }
};

export default authReducer;
