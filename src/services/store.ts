import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import { ingredientsReducer } from './reducers/ingredientsReducer';
import { burgerReducer } from './reducers/burgerReducer';
import { orderReducer } from './reducers/orderReducer';
import { authenticationReducer } from './reducers/authenticationReducer';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burger: burgerReducer,
  order: orderReducer,
  authentication: authenticationReducer
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export { store, rootReducer };