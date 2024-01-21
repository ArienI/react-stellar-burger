import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { thunk } from 'redux-thunk';
import { ingredientsReducer } from './reducers/Ingredients';
import { burgerReducer } from './reducers/Burger';

const rootReducer = combineReducers({
  Ingredients: ingredientsReducer,
  Burger: burgerReducer
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export { store };