import { ACTION_TYPE_SET_WS_IS_CONNECTED, ACTION_TYPE_OPEN_WS, ACTION_TYPE_CLOSE_WS, ACTION_TYPE_SET_WS_MESSAGE, ACTION_TYPE_SET_WS_ERROR } from "../../utils/const";
import { TCloseWSAction, TOpenWSAction, TSetWSError, TSetWSIsConnected, TSetWSMessage, TWebsocketMessage } from "../../utils/types";

function openWS(url: string): TOpenWSAction {
  return {
    type: ACTION_TYPE_OPEN_WS,
    payload: url
  };
};

function closeWS(): TCloseWSAction {
  return {
    type: ACTION_TYPE_CLOSE_WS
  };
};

function setWSIsConnected(data: boolean): TSetWSIsConnected {
  return {
    type: ACTION_TYPE_SET_WS_IS_CONNECTED,
    payload: data
  };
};

function setWSMessage(data: TWebsocketMessage): TSetWSMessage {
  return {
    type: ACTION_TYPE_SET_WS_MESSAGE,
    payload: data
  };
};

function setWSError(data: Event): TSetWSError {
  return {
    type: ACTION_TYPE_SET_WS_ERROR,
    payload: data
  };
};

export { openWS, closeWS, setWSIsConnected, setWSMessage, setWSError };