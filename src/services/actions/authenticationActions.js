import { API_URL, ACTION_TYPE_LOGIN, ACTION_TYPE_LOGOUT, ACCESS_TOKEN_EXPIRATION_TIME_IN_MIN, ACTION_TYPE_SET_USER_DATA, ACTION_TYPE_SET_USER_LOGGED_IN } from '../../utils/const';
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
      dispatch(setUserLoggedIn());
      return Promise.resolve();
    }
  };
};

function getUser() {
  return (dispatch) => {
    fetch(`${API_URL}/auth/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('accessToken')
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

function updateUser(data) {
  return (dispatch) => {
    fetch(`${API_URL}/auth/user`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('accessToken')
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

function setUserData(data) {
  return {
    type: ACTION_TYPE_SET_USER_DATA,
    payload: data
  };
};

function setUserLoggedIn() {
  return {
    type: ACTION_TYPE_SET_USER_LOGGED_IN
  };
};

export { login, logout, checkAndRefreshTokens, getUser, updateUser }