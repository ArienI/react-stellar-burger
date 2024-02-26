import { ADD_INGREDIENT, DELETE_INGREDIENT, MOVE_INGREDIENT } from '../../utils/const';
import { TBurger, TBurgerActions, TIngredient } from '../../utils/types';

const burger: TBurger = [];

function burgerReducer(state: TBurger = burger, action: TBurgerActions): TBurger {

  function updateIngredientList(ingredients: TBurger, newIngredient: TIngredient): TBurger {
    return newIngredient.type === 'bun' ? [newIngredient].concat(ingredients) : [...ingredients, newIngredient];
  };

  function removeIngredientByIndex(ingredients: TBurger, index: number): TBurger {
    return ingredients.filter((_, curIndex) => curIndex !== index);
  };

  function moveIngredient(ingredients: TBurger, startPosition: number, endPosition: number) {
    const updatedIngredients = [...ingredients];
    const [removedIngredient] = updatedIngredients.splice(startPosition, 1);
    updatedIngredients.splice(endPosition, 0, removedIngredient);
    return updatedIngredients;
  };

  switch (action.type) {
    case ADD_INGREDIENT:
      return updateIngredientList(state, action.ingredient);
    case DELETE_INGREDIENT:
      return removeIngredientByIndex(state, action.index);
    case MOVE_INGREDIENT:
      return moveIngredient(state, action.startPosition, action.endPosition);
    default:
      return state;
  }
};

export { burgerReducer };
