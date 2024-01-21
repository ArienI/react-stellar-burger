import { ADD_INGREDIENT, DELETE_INGREDIENT, MOVE_INGREDIENT } from '../../utils/const';

const burger = [];

function burgerReducer(state = burger, action) {

  function updateIngredientList(ingredients, newIngredient) {
    return newIngredient.type === 'bun' ? [newIngredient].concat(ingredients) : ingredients.concat(newIngredient);
  };

  function removeIngredientByIndex(ingredients, index) {
    return ingredients.filter((_, curIndex) => curIndex !== index);
  };

  function moveIngredient(ingredients, startPosition, endPosition) {
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
