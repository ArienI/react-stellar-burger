import { ACTION_TYPE_SET_WS_IS_CONNECTED, ACTION_TYPE_SET_WS_MESSAGE } from "../../utils/const";
import { TWebsocketActions, TWebsocketState } from "../../utils/types";

// Изначальное состояние
const websocket: TWebsocketState = {
  isConnected: false,
  message: {
    success: false,
    orders: [],
    total: -1,
    totalToday: -1
  },
};

function websocketReducer(state: TWebsocketState = websocket, action: TWebsocketActions): TWebsocketState {
  switch (action.type) {
    case ACTION_TYPE_SET_WS_IS_CONNECTED:
      return { ...state, isConnected: action.payload };
    case ACTION_TYPE_SET_WS_MESSAGE:
      return { ...state, message: action.payload };
    default:
      return state;
  }
};

export { websocketReducer };