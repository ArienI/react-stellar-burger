import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { thunk } from 'redux-thunk';
import { ingredientsReducer } from './reducers/Ingredients';
import { burgerReducer } from './reducers/Burger';
import { orderReducer } from './reducers/Order';
import { authenticationReducer } from './reducers/Authentication';

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

export { store };