import { API_URL, ACTION_TYPE_LOGIN, ACTION_TYPE_LOGOUT, ACCESS_TOKEN_EXPIRATION_TIME_IN_MIN, ACTION_TYPE_SET_USER_DATA, ACTION_TYPE_SET_USER_LOGGED_IN, ACTION_TYPE_SET_PASSWORD_RESET_CODE_SENT, ACTION_TYPE_SET_PASSWORD_RESET, ACTION_TYPE_SET_IS_CHECKING_TOKENS } from '../../utils/const';
import { checkResponse } from '../../utils/functions';
import { AppDispatch, TLoginData, TLoginUserAction, TLogoutUserAction, TRegisterNewUserData, TRequestPasswordResetData, TResetPasswordData, TSetIsCheckingTokens, TSetPasswordResetAction, TSetPasswordResetCodeSentAction, TSetUserDataAction, TSetUserLoggedInAction, TUser, TUserData } from '../../utils/types';

function login(data: TLoginData) {
  return (dispatch: AppDispatch) => {
    fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: data.email,
        password: data.password
      })
    })
      .then(checkResponse)
      .then(response => {
        localStorage.setItem('accessToken', response.accessToken);
        const currentTime = new Date().getTime();
        localStorage.setItem('accessTokenCreationTime', currentTime.toString());
        localStorage.setItem('refreshToken', response.refreshToken);
        dispatch(loginUser(response));
      })
      .catch(error => {
        console.error(error);
      });
  };
};

function logout() {
  return (dispatch: AppDispatch) => {
    fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: localStorage.getItem('refreshToken')
      })
    })
      .then(checkResponse)
      .then(response => {
        localStorage.clear();
        dispatch(logoutUser());
      })
      .catch(error => {
        console.error(error);
      });
  };
};

function checkAndRefreshTokens() {
  return (dispatch: AppDispatch) => {
    const accessToken = localStorage.getItem('accessToken');
    const accessTokenCreationTime = parseInt(localStorage.getItem('accessTokenCreationTime') || '0');
    const refreshToken = localStorage.getItem('refreshToken');
    const currentTime = new Date().getTime();

    if (!refreshToken) {
      dispatch(logoutUser());
      return Promise.resolve();
    }
    dispatch(setIsCheckingTokens(true));
    // minutes * 60 * 1000 = milliseconds
    if (!accessToken || !accessTokenCreationTime || currentTime - accessTokenCreationTime > ACCESS_TOKEN_EXPIRATION_TIME_IN_MIN * 60 * 1000) {
      return fetch(`${API_URL}/auth/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: refreshToken })
      })
        .then(checkResponse)
        .then(response => {
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('accessTokenCreationTime', currentTime.toString());
          localStorage.setItem('refreshToken', response.refreshToken);
        })
        .then(() => {
          dispatch(getUser());
          dispatch(setUserLoggedIn());
        })
        .catch(error => {
          console.error(error);
          dispatch(logout());
        })
        .finally(() => {
          dispatch(setIsCheckingTokens(false));
        });
    } else {
      dispatch(getUser());
      dispatch(setUserLoggedIn());
      dispatch(setIsCheckingTokens(false));
      return Promise.resolve();
    }
  };
};

function getUser() {
  return (dispatch: AppDispatch) => {
    fetch(`${API_URL}/auth/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('accessToken') || ''
      }
    })
      .then(checkResponse)
      .then(response => {
        dispatch(setUserData(response));
      })
      .catch(error => {
        console.error(error);
      });
  };
};

function updateUser(data: TUser) {
  return (dispatch: AppDispatch) => {
    fetch(`${API_URL}/auth/user`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('accessToken') || ''
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email
      })
    })
      .then(checkResponse)
      .then(response => {
        dispatch(setUserData(response));
      })
      .catch(error => {
        console.error(error);
      });
  };
};

function registerNewUser(data: TRegisterNewUserData) {
  return (dispatch: AppDispatch) => {
    fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password
      })
    })
      .then(checkResponse)
      .then(response => {
        localStorage.setItem('accessToken', response.accessToken);
        const currentTime = new Date().getTime();
        localStorage.setItem('accessTokenCreationTime', currentTime.toString());
        localStorage.setItem('refreshToken', response.refreshToken);
        dispatch(loginUser(response));
      })
      .catch(error => {
        console.error(error);
      });
  };
};

function requestPasswordReset(data: TRequestPasswordResetData) {
  return (dispatch: AppDispatch) => {
    fetch(`${API_URL}/password-reset`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: data.email
      })
    })
      .then(checkResponse)
      .then(response => {
        dispatch(setPasswordResetCodeSent(true));
      })
      .catch(error => {
        console.error(error);
      });
  };
};

function resetPassword(data: TResetPasswordData) {
  return (dispatch: AppDispatch) => {
    fetch(`${API_URL}/password-reset/reset`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        password: data.password,
        token: data.token
      })
    })
      .then(checkResponse)
      .then(response => {
        dispatch(setPasswordReset(true));
      })
      .catch(error => {
        console.error(error);
      });
  };
};

function loginUser(data: TUserData): TLoginUserAction {
  return {
    type: ACTION_TYPE_LOGIN,
    payload: data
  };
};

function logoutUser(): TLogoutUserAction {
  return {
    type: ACTION_TYPE_LOGOUT
  };
};

function setUserData(data: TUserData): TSetUserDataAction {
  return {
    type: ACTION_TYPE_SET_USER_DATA,
    payload: data
  };
};

function setUserLoggedIn(): TSetUserLoggedInAction {
  return {
    type: ACTION_TYPE_SET_USER_LOGGED_IN
  };
};

function setPasswordResetCodeSent(data: boolean): TSetPasswordResetCodeSentAction {
  return {
    type: ACTION_TYPE_SET_PASSWORD_RESET_CODE_SENT,
    payload: data
  };
};

function setPasswordReset(data: boolean): TSetPasswordResetAction {
  return {
    type: ACTION_TYPE_SET_PASSWORD_RESET,
    payload: data
  };
};

function setIsCheckingTokens(data: boolean): TSetIsCheckingTokens {
  return {
    type: ACTION_TYPE_SET_IS_CHECKING_TOKENS,
    payload: data
  };
};

export { login, logout, checkAndRefreshTokens, getUser, updateUser, registerNewUser, requestPasswordReset, resetPassword, setPasswordResetCodeSent, setPasswordReset }