import type { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch, RootState, TWebsocketActions } from '../../utils/types';
import { ACTION_TYPE_CLOSE_WS, ACTION_TYPE_OPEN_WS, ACTION_TYPE_SEND_WS_MESSAGE } from '../../utils/const';
import { setWSError, setWSIsConnected, setWSMessage } from '../actions/websocketActions';

function websocketMiddleware(): Middleware {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    // Функция настройки событий websocket
    const setupSocketEventListeners = (socket: WebSocket) => {
      socket.onopen = (event) => {
        store.dispatch(setWSIsConnected(true));
      };

      socket.onclose = (event) => {
        store.dispatch(setWSIsConnected(false));
      };

      socket.onmessage = (event) => {
        store.dispatch(setWSMessage(JSON.parse(event.data)));
      };

      socket.onerror = (event) => {
        store.dispatch(setWSError(event));
      };
    };

    return (next) => (action: TWebsocketActions) => {
      switch (action.type) {
        case ACTION_TYPE_OPEN_WS:
          socket = new WebSocket(action.payload);
          setupSocketEventListeners(socket);
          break;
        case ACTION_TYPE_CLOSE_WS:
          socket?.close();
          break;
        case ACTION_TYPE_SEND_WS_MESSAGE:
          socket?.send(JSON.stringify(action.payload));
          break;
        default:
          break;
      }
      next(action);
    };
  });
};

export { websocketMiddleware };