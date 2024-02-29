import React, { useEffect } from 'react';
import styles from './FeedOrderDetails.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { translateStatus } from '../../../utils/functions';
import { useLocation, useParams } from 'react-router-dom';
import { LoadingIndicator } from '../../../pages/LoadingIndicator';
import { openWS } from '../../../services/actions/websocketActions';
import { WS_ORDERS } from '../../../utils/const';
import { TWebsocketOrder } from '../../../utils/types';

function FeedOrderDetails(): React.ReactElement {
  const dispatch = useAppDispatch();
  const socketMessage = useAppSelector((store) => store.websocket.message);
  const ingredients = useAppSelector((store) => store.ingredients);
  const location = useLocation();
  const { id } = useParams();
  // Проверяем если мы находимся на странице "profile/orders/ID"
  const isProfileOrdersPage = location.pathname.startsWith('/profile/orders/');

  useEffect(() => {
    // Если WebSocket закрыт, то
    if (!socketMessage.success) {
      // если мы находимся на странице "profile/orders/ID" значит используем авторизацию
      if (isProfileOrdersPage) {
        const accessToken = localStorage.getItem('accessToken');
        const pureAccessToken = accessToken ? accessToken.replace('Bearer ', '') : '';
        dispatch(openWS(`${WS_ORDERS}?token=${pureAccessToken}`));
      } else {
        // иначе открываем WebSocket без авторизации
        dispatch(openWS(`${WS_ORDERS}/all`));
      }
    }
  }, [dispatch, isProfileOrdersPage, socketMessage.success]);

  const order = socketMessage.orders.find((item: TWebsocketOrder) => item.number.toString() === id);

  if (!socketMessage.success || !order) {
    return <LoadingIndicator />;
  }

  const statusClass = order.status === 'done' ? styles.statusDone : '';

  // Считаем цену бургера
  const totalPrice = order.ingredients.reduce((acc, ingredientId) => {
    const ingredient = ingredients.find(item => item._id === ingredientId);
    return acc + (ingredient ? (ingredient.type === 'bun' ? ingredient.price * 2 : ingredient.price) : 0);
  }, 0);

  // Считаем количество каждого ингредиента в бургере
  const ingredientCounts = order.ingredients.reduce((acc: Record<string, number>, id: string) => {
    acc[id] = (acc[id] || 0) + 1;
    return acc;
  }, {});

  // Заполняем массив ингредиентов, из которых состоит бургер
  const ingredientDetails = Object.entries(ingredientCounts).flatMap(([id, count]) => {
    const ingredient = ingredients.find(ing => ing._id === id);
    if (!ingredient) return [];
    return [{
      ...ingredient,
      count: ingredient.type === 'bun' ? count * 2 : count,
    }];
  });

  return (
    <div className={styles.orderInfo}>
      <p className={`text text_type_digits-default mb-10 ${styles.number}`}>#{order.number.toString().padStart(6, '0')}</p>
      <p className="text text_type_main-medium mb-3">{order.name}</p>
      <p className={`text text_type_main-default text_color_inactive mb-15 ${statusClass}`}>{translateStatus(order.status)}</p>
      <div className={styles.customScroll}>
        {ingredientDetails.map((ingredient, index) => (
          <div key={index} className={styles.ingredientItem}>
            <div className={styles.imageName}>
              <img src={ingredient.image_mobile} alt={ingredient.name} className={styles.image} />
              <p className="text text_type_main-default">{ingredient.name}</p>
            </div>
            <div className={styles.ingredientPrice}>
              <span className="text text_type_digits-default">{ingredient.count} x {ingredient.price}</span>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        ))}
      </div>
      <div className={`${styles.bottom} mt-10`}>
        <time className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(order.createdAt)} />
        </time>
        <div className={styles.componentsOrder_price}>
          <span className="text text_type_digits-default">{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default FeedOrderDetails;
