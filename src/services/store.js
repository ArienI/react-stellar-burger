import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { thunk } from 'redux-thunk';
import { ingredientsReducer } from './reducers/Ingredients';
import { burgerReducer } from './reducers/Burger';
import { orderReducer } from './reducers/Order';

const rootReducer = combineReducers({
  Ingredients: ingredientsReducer,
  Burger: burgerReducer,
  Order: orderReducer
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export { store };