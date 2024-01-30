import { ACTION_TYPE_LOGIN, ACTION_TYPE_LOGOUT } from "../../utils/const";

const authenticationDetails = {
  user: {
    email: null,
    password: null,
  },
  isLoggedIn: false,
};

function authenticationReducer(state = authenticationDetails, action) {
  switch (action.type) {
    case ACTION_TYPE_LOGIN:
      return { ...state, user: action.payload.user, isLoggedIn: true };
    case ACTION_TYPE_LOGOUT:
      return { ...state, user: {}, isLoggedIn: false };
    default:
      return state;
  }
};

export { authenticationReducer };
