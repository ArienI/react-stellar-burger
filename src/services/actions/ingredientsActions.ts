import { API_URL, SET_INGREDIENTS, INCREMENT_AMOUNT, DECREMENT_AMOUNT } from '../../utils/const';
import { checkResponse } from '../../utils/functions';
import { Dispatch } from 'redux';
import { TDecrementAmountAction, TIncrementAmountAction, TIngredient, TIngredientsList, TSetIngredientsAction } from '../../utils/types';

function getIngredients() {
  return (dispatch: Dispatch): void => {
    fetch(`${API_URL}/ingredients`)
      .then(checkResponse)
      .then(ingredients => {
        const ingredientsWithAmount: TIngredientsList = ingredients.data.map((item: TIngredient) => ({ ...item, amount: 0 }));
        dispatch(setIngredients(ingredientsWithAmount));
      })
      .catch(error => {
        console.error('Ошибка: ', error);
      });
  };
};

function setIngredients(ingredients: TIngredientsList): TSetIngredientsAction {
  return {
    type: SET_INGREDIENTS,
    ingredientsList: ingredients
  };
};

function incrementAmount(id: string): TIncrementAmountAction {
  return {
    type: INCREMENT_AMOUNT,
    id: id
  };
};

function decrementAmount(id: string): TDecrementAmountAction {
  return {
    type: DECREMENT_AMOUNT,
    id: id
  };
};

export { getIngredients, setIngredients, incrementAmount, decrementAmount };