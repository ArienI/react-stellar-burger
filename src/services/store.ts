import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import { ingredientsReducer } from './reducers/ingredientsReducer';
import { burgerReducer } from './reducers/burgerReducer';
import { orderReducer } from './reducers/orderReducer';
import { authenticationReducer } from './reducers/authenticationReducer';
import { websocketMiddleware } from './middlewares/websocketMiddleware';
import { websocketReducer } from './reducers/websocketReducer';
import { ACTION_TYPE_CLOSE_WS, ACTION_TYPE_OPEN_WS, ACTION_TYPE_SET_WS_ERROR, ACTION_TYPE_SET_WS_IS_CONNECTED, ACTION_TYPE_SET_WS_MESSAGE } from '../utils/const';
import { TWSFeedActions } from '../utils/types';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burger: burgerReducer,
  order: orderReducer,
  authentication: authenticationReducer,
  websocket: websocketReducer
});

const feedWSActions: TWSFeedActions = {
  wsOpen: ACTION_TYPE_OPEN_WS,
  wsClose: ACTION_TYPE_CLOSE_WS,
  onOpen: ACTION_TYPE_SET_WS_IS_CONNECTED,
  onClose: ACTION_TYPE_SET_WS_IS_CONNECTED,
  onError: ACTION_TYPE_SET_WS_ERROR,
  onMessage: ACTION_TYPE_SET_WS_MESSAGE
};

// Применять composeWithDevTools только в development режиме. Не применять на production (готовом приложении)
const composeEnhancers: any = process.env.NODE_ENV === 'development' ? composeWithDevTools : compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, websocketMiddleware(feedWSActions)))
);

export { store, rootReducer };