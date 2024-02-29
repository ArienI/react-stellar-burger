import { SET_INGREDIENTS, INCREMENT_AMOUNT, DECREMENT_AMOUNT } from '../../utils/const';
import { TIngredient, TIngredientsList, TIngredientsActions } from '../../utils/types';

const ingredients: TIngredientsList = [];

function ingredientsReducer(state: TIngredientsList = ingredients, action: TIngredientsActions): TIngredientsList {

  function updateIngredientAmount(ingredient: TIngredient, change: number): TIngredient {
    if (ingredient.type === 'bun') {
      return { ...ingredient, amount: ingredient.amount + change * 2 };
    }
    return { ...ingredient, amount: ingredient.amount + change };
  };

  switch (action.type) {
    case SET_INGREDIENTS:
      return action.ingredientsList;
    case INCREMENT_AMOUNT:
      return state.map(ingredient =>
        ingredient._id === action.id
          ? updateIngredientAmount(ingredient, 1)
          : ingredient
      );
    case DECREMENT_AMOUNT:
      return state.map(ingredient =>
        ingredient._id === action.id
          ? updateIngredientAmount(ingredient, -1)
          : ingredient
      );
    default:
      return state;
  }
};

export { ingredientsReducer, ingredients };
