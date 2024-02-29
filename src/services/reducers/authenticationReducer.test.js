import { authenticationReducer, authenticationDetails } from "./authenticationReducer";
import {
  ACTION_TYPE_LOGIN,
  ACTION_TYPE_LOGOUT,
  ACTION_TYPE_SET_IS_CHECKING_TOKENS,
  ACTION_TYPE_SET_PASSWORD_RESET,
  ACTION_TYPE_SET_PASSWORD_RESET_CODE_SENT,
  ACTION_TYPE_SET_USER_DATA,
  ACTION_TYPE_SET_USER_LOGGED_IN
} from "../../utils/const";
import { newUser, user } from "src/utils/test-mocks";

describe('Тестирование authenticationReducer', () => {
  const initialState = authenticationDetails;

  it('должен возвращать изначальное состояние', () => {
    const action = {};
    const expectedState = initialState;
    expect(authenticationReducer(initialState, action)).toEqual(expectedState);
  });

  it('должен обрабатывать ACTION_TYPE_LOGIN', () => {
    const action = { type: ACTION_TYPE_LOGIN, payload: { user } };
    const expectedState = { ...initialState, user, isLoggedIn: true };

    expect(authenticationReducer(initialState, action)).toEqual(expectedState);
  });

  it('должен обрабатывать ACTION_TYPE_LOGOUT', () => {
    const action = { type: ACTION_TYPE_LOGOUT };
    const expectedState = { ...initialState, user: { email: null, name: null }, isLoggedIn: false };

    expect(authenticationReducer(initialState, action)).toEqual(expectedState);
  });

  it('должен обрабатывать ACTION_TYPE_SET_USER_DATA', () => {
    const action = { type: ACTION_TYPE_SET_USER_DATA, payload: { user: newUser } };
    const expectedState = { ...initialState, user: newUser };

    expect(authenticationReducer(initialState, action)).toEqual(expectedState);
  });

  it('должен обрабатывать ACTION_TYPE_SET_USER_LOGGED_IN', () => {
    const action = { type: ACTION_TYPE_SET_USER_LOGGED_IN };
    const expectedState = { ...initialState, isLoggedIn: true };

    expect(authenticationReducer(initialState, action)).toEqual(expectedState);
  });

  it('должен обрабатывать ACTION_TYPE_SET_PASSWORD_RESET_CODE_SENT', () => {
    const action = { type: ACTION_TYPE_SET_PASSWORD_RESET_CODE_SENT, payload: true };
    const expectedState = { ...initialState, passwordResetCodeSent: true };

    expect(authenticationReducer(initialState, action)).toEqual(expectedState);
  });

  it('должен обрабатывать ACTION_TYPE_SET_PASSWORD_RESET', () => {
    const action = { type: ACTION_TYPE_SET_PASSWORD_RESET, payload: true };
    const expectedState = { ...initialState, passwordReset: true };

    expect(authenticationReducer(initialState, action)).toEqual(expectedState);
  });

  it('должен обрабатывать ACTION_TYPE_SET_IS_CHECKING_TOKENS', () => {
    const action = { type: ACTION_TYPE_SET_IS_CHECKING_TOKENS, payload: true };
    const expectedState = { ...initialState, isCheckingTokens: true };

    expect(authenticationReducer(initialState, action)).toEqual(expectedState);
  });
});
