import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import { ingredientsReducer } from './reducers/ingredientsReducer';
import { burgerReducer } from './reducers/burgerReducer';
import { orderReducer } from './reducers/orderReducer';
import { authenticationReducer } from './reducers/authenticationReducer';
import { websocketMiddleware } from './middlewares/websocketMiddleware';
import { websocketReducer } from './reducers/websocketReducer';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burger: burgerReducer,
  order: orderReducer,
  authentication: authenticationReducer,
  websocket: websocketReducer
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, websocketMiddleware()))
);

export { store, rootReducer };