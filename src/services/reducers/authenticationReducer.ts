import { ACTION_TYPE_LOGIN, ACTION_TYPE_LOGOUT, ACTION_TYPE_SET_IS_CHECKING_TOKENS, ACTION_TYPE_SET_PASSWORD_RESET, ACTION_TYPE_SET_PASSWORD_RESET_CODE_SENT, ACTION_TYPE_SET_USER_DATA, ACTION_TYPE_SET_USER_LOGGED_IN } from "../../utils/const";
import { TAuthenticationActions, TAuthenticationState } from '../../utils/types';

const authenticationDetails: TAuthenticationState = {
  user: {
    email: null,
    name: null,
  },
  isLoggedIn: false,
  passwordResetCodeSent: false,
  passwordReset: false,
  isCheckingTokens: false
};

function authenticationReducer(state: TAuthenticationState = authenticationDetails, action: TAuthenticationActions): TAuthenticationState {
  switch (action.type) {
    case ACTION_TYPE_LOGIN:
      return { ...state, user: action.payload.user, isLoggedIn: true };
    case ACTION_TYPE_LOGOUT:
      return { ...state, user: { email: null, name: null }, isLoggedIn: false };
    case ACTION_TYPE_SET_USER_DATA:
      return { ...state, user: action.payload.user };
    case ACTION_TYPE_SET_USER_LOGGED_IN:
      return { ...state, isLoggedIn: true };
    case ACTION_TYPE_SET_PASSWORD_RESET_CODE_SENT:
      return { ...state, passwordResetCodeSent: action.payload };
    case ACTION_TYPE_SET_PASSWORD_RESET:
      return { ...state, passwordReset: action.payload };
    case ACTION_TYPE_SET_IS_CHECKING_TOKENS:
      return { ...state, isCheckingTokens: action.payload };
    default:
      return state;
  }
};

export { authenticationReducer };
