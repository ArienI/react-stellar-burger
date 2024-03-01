import { websocketReducer, websocket } from './websocketReducer';
import {
  ACTION_TYPE_CLOSE_WS,
  ACTION_TYPE_SET_WS_ERROR,
  ACTION_TYPE_SET_WS_IS_CONNECTED,
  ACTION_TYPE_SET_WS_MESSAGE
} from "../../utils/const";
import { websocketMessageMock } from '../../utils/test-mocks';

const initialState = websocket;

describe('Тесты websocketReducer', () => {
  it('должен возвращать изначальное состояние', () => {
    const action = {};
    const expectedState = initialState;

    expect(websocketReducer(initialState, action)).toEqual(expectedState);
  });

  it('должен обрабатывать ACTION_TYPE_SET_WS_IS_CONNECTED', () => {
    const action = { type: ACTION_TYPE_SET_WS_IS_CONNECTED, payload: true };
    const expectedState = { ...initialState, isConnected: true };

    expect(websocketReducer(initialState, action)).toEqual(expectedState);
  });

  it('должен обрабатывать ACTION_TYPE_SET_WS_MESSAGE', () => {
    const action = { type: ACTION_TYPE_SET_WS_MESSAGE, payload: websocketMessageMock };
    const expectedState = { ...initialState, message: websocketMessageMock };

    expect(websocketReducer(initialState, action)).toEqual(expectedState);
  });

  it('должен обрабатывать ACTION_TYPE_CLOSE_WS', () => {
    const modifiedState = { ...initialState, isConnected: true };
    const action = { type: ACTION_TYPE_CLOSE_WS };

    expect(websocketReducer(modifiedState, action)).toEqual(initialState);
  });

  it('должен обрабатывать ACTION_TYPE_SET_WS_ERROR', () => {
    const error = new Error('Ошибка соединения');
    const action = { type: ACTION_TYPE_SET_WS_ERROR, payload: error };
    const expectedState = { ...initialState, error: error };

    expect(websocketReducer(initialState, action)).toEqual(expectedState);
  });
});
