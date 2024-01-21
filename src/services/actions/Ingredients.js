import { URL_INGREDIENTS, SET_INGREDIENTS, INCREMENT_AMOUNT, DECREMENT_AMOUNT } from '../../utils/const';

function download() {
  return (dispatch) => {
    fetch(URL_INGREDIENTS)
      .then(res => res.json())
      .then(ingredients => {
        const ingredientsWithAmount = ingredients.data.map(item => ({ ...item, amount: 0 }));
        dispatch(setIngredients(ingredientsWithAmount));
      })
      .catch(error => {
        console.error('Ошибка: ', error);
      });
  };
};


function setIngredients(ingredients) {
  return {
    type: SET_INGREDIENTS,
    ingredientsList: ingredients
  };
};

function incrementAmount(id) {
  return {
    type: INCREMENT_AMOUNT,
    id: id
  };
};

function decrementAmount(id) {
  return {
    type: DECREMENT_AMOUNT,
    id: id
  };
};

export { download, setIngredients, incrementAmount, decrementAmount };