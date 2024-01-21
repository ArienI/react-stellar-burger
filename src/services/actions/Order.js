import { BASE_URL, POST_ORDER } from '../../utils/const';
import { checkResponse } from '../../utils/functions';

function sendOrder(burgerIngredients) {
  return (dispatch) => {
    fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredients: burgerIngredients })
    })
      .then(checkResponse)
      .then(res => res.json())
      .then(resData => {
        dispatch(setOrder(resData));
      })
      .catch(error => {
        console.error('Ошибка: ', error);
      });
  };
};

function setOrder(data) {
  return { type: POST_ORDER, order: data };
};

export { sendOrder, setOrder };
