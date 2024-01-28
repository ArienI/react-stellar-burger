import { SET_INGREDIENTS, INCREMENT_AMOUNT, DECREMENT_AMOUNT } from '../../utils/const';
const ingredients = [];

function ingredientsReducer(state = ingredients, action) {

  function updateIngredientAmount(ingredient, change) {
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

export { ingredientsReducer };