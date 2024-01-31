import { API_URL, ACTION_TYPE_LOGIN, ACTION_TYPE_LOGOUT, ACCESS_TOKEN_EXPIRATION_TIME_IN_MIN } from '../../utils/const';
import { checkResponse } from '../../utils/functions';

function login(data) {
  return (dispatch) => {
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
        localStorage.setItem('accessTokenCreationTime', currentTime);
        localStorage.setItem('refreshToken', response.refreshToken);
        dispatch(loginUser(response));
      })
      .catch(error => {
        console.error(error);
      });
  };
};

function logout() {
  return (dispatch) => {
    fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: localStorage.getItem('refreshToken')
      })
    })
      .then(checkResponse)
      .then(response => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('accessTokenCreationTime');
        localStorage.removeItem('refreshToken');
        dispatch(logoutUser(response));
      })
      .catch(error => {
        console.error(error);
      });
  };
};

function checkAndRefreshTokens() {
  return (dispatch) => {
    const accessToken = localStorage.getItem('accessToken');
    const accessTokenCreationTime = localStorage.getItem('accessTokenCreationTime');
    const refreshToken = localStorage.getItem('refreshToken');
    const currentTime = new Date().getTime();

    if (!refreshToken) {
      dispatch(logoutUser());
      return Promise.resolve();
    }

    if (!accessToken || !accessTokenCreationTime || currentTime - accessTokenCreationTime > ACCESS_TOKEN_EXPIRATION_TIME_IN_MIN * 60 * 1000) {
      return fetch(`${API_URL}/auth/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: refreshToken })
      })
        .then(checkResponse)
        .then(response => {
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('accessTokenCreationTime', currentTime);
          localStorage.setItem('refreshToken', response.refreshToken);
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      return Promise.resolve();
    }
  };
};

function loginUser(data) {
  return {
    type: ACTION_TYPE_LOGIN,
    payload: data
  };
};

function logoutUser() {
  return {
    type: ACTION_TYPE_LOGOUT
  };
};

export { login, logout, checkAndRefreshTokens }