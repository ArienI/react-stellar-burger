import { ADD_INGREDIENT, DELETE_INGREDIENT, MOVE_INGREDIENT } from '../../utils/const';
import { v4 as uuidv4 } from 'uuid';
import { TAddIngredientAction, TDeleteIngredientAction, TIngredient, TMoveIngredientAction } from '../../utils/types';

function addIngredient(ingredient: TIngredient): TAddIngredientAction {
  return {
    type: ADD_INGREDIENT,
    ingredient: { ...ingredient, newID: uuidv4() }
  };
};

function deleteIngredient(index: number): TDeleteIngredientAction {
  return {
    type: DELETE_INGREDIENT,
    index: index
  };
};

function moveIngredient(startPosition: number, endPosition: number): TMoveIngredientAction {
  return {
    type: MOVE_INGREDIENT,
    startPosition,
    endPosition
  };
};

export { addIngredient, deleteIngredient, moveIngredient };