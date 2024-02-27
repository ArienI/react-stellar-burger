import { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch, RootState, TWSFeedActions, TWebsocketActions } from '../../utils/types';

function websocketMiddleware(wsActions: TWSFeedActions): Middleware {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    const setupSocketEventListeners = (socket: WebSocket) => {
      socket.onopen = (event) => {
        store.dispatch({ type: wsActions.onOpen, payload: true });
      };

      socket.onclose = (event) => {
        store.dispatch({ type: wsActions.onClose, payload: false });
      };

      socket.onmessage = (event) => {
        store.dispatch({ type: wsActions.onMessage, payload: JSON.parse(event.data) });
      };

      socket.onerror = (event) => {
        store.dispatch({ type: wsActions.onError, payload: event });
      };
    };

    return (next) => (action: TWebsocketActions) => {
      switch (action.type) {
        case wsActions.wsOpen:
          socket = new WebSocket(action.payload);
          setupSocketEventListeners(socket);
          break;
        case wsActions.wsClose:
          socket?.close();
          break;
        default:
          break;
      }
      next(action);
    };
  });
};

export { websocketMiddleware };