import { API_URL, POST_ORDER } from '../../utils/const';
import { checkResponse } from '../../utils/functions';
import { AppDispatch, TBurgerIngredientsID, TOrder, TOrderActions } from '../../utils/types';

function sendOrder(burgerIngredientsID: TBurgerIngredientsID) {
  return (dispatch: AppDispatch) => {
    fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredients: burgerIngredientsID })
    })
      .then(checkResponse)
      .then(resData => {
        dispatch(setOrder(resData));
      })
      .catch(error => {
        console.error('Ошибка: ', error);
      });
  };
};

function setOrder(data: TOrder): TOrderActions {
  return { type: POST_ORDER, order: data };
};

export { sendOrder, setOrder };
