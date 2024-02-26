import { API_URL, CLEAR_ORDER, POST_ORDER } from '../../utils/const';
import { checkResponse } from '../../utils/functions';
import { AppDispatch, TBurgerIngredientsID, TClearOrderAction, TOrder, TSetOrderAction } from '../../utils/types';

function sendOrder(burgerIngredientsID: TBurgerIngredientsID) {
  return (dispatch: AppDispatch) => {
    dispatch(clearOrder());
    fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('accessToken') || ''
      },
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

function setOrder(data: TOrder): TSetOrderAction {
  return { type: POST_ORDER, order: data };
};

function clearOrder(): TClearOrderAction {
  return { type: CLEAR_ORDER };
};

export { sendOrder, setOrder, clearOrder };
