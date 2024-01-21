import { ADD_INGREDIENT, DELETE_INGREDIENT, } from '../../utils/const';

const burger = [];

const updateIngredientList = (ingredients, newIngredient) => {
  return newIngredient.type === 'bun' ? [newIngredient].concat(ingredients) : ingredients.concat(newIngredient);
};

const removeIngredientByIndex = (ingredients, index) => {
  return ingredients.filter((_, curIndex) => curIndex !== index);
};

const burgerReducer = (state = burger, action) => {
  switch (action.type) {
    case ADD_INGREDIENT:
      return updateIngredientList(state, action.ingredient);
    case DELETE_INGREDIENT:
      return removeIngredientByIndex(state, action.index);
    default:
      return state;
  }
};

export { burgerReducer };
