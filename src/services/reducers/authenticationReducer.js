import { ACTION_TYPE_LOGIN, ACTION_TYPE_LOGOUT, ACTION_TYPE_SET_USER_DATA, ACTION_TYPE_SET_USER_LOGGED_IN } from "../../utils/const";

const authenticationDetails = {
  user: {
    email: null,
    password: null,
  },
  isLoggedIn: false
};

function authenticationReducer(state = authenticationDetails, action) {
  switch (action.type) {
    case ACTION_TYPE_LOGIN:
      return { ...state, user: action.payload.user, isLoggedIn: true };
    case ACTION_TYPE_LOGOUT:
      return { ...state, user: { email: null, password: null }, isLoggedIn: false };
    case ACTION_TYPE_SET_USER_DATA:
      return { ...state, user: action.payload.user };
    case ACTION_TYPE_SET_USER_LOGGED_IN:
      return { ...state, isLoggedIn: true };
    default:
      return state;
  }
};

export { authenticationReducer };
