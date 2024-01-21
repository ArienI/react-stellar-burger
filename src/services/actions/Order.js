import { URL_ORDERS, POST_ORDER } from '../../utils/const';

function upload(burgerIngredients) {
  return (dispatch) => {
    fetch(URL_ORDERS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredients: burgerIngredients })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Ошибка!');
        }
        return res.json();
      })
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

export { upload, setOrder };
