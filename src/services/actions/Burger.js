import { ADD_INGREDIENT, DELETE_INGREDIENT, MOVE_INGREDIENT } from '../../utils/const';
import { v4 as uuidv4 } from 'uuid';

function addIngredient(ingredient) {
  return {
    type: ADD_INGREDIENT,
    ingredient: { ...ingredient, newID: uuidv4() }
  };
};

function deleteIngredient(index) {
  return {
    type: DELETE_INGREDIENT,
    index: index
  };
};

function moveIngredient(startPosition, endPosition) {
  return {
    type: MOVE_INGREDIENT,
    startPosition,
    endPosition
  };
};

export { addIngredient, deleteIngredient, moveIngredient };