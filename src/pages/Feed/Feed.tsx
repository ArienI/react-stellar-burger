import styles from './Feed.module.css';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { closeWS, openWS } from '../../services/actions/websocketActions';
import { WS_ORDERS } from '../../utils/const';
import { useEffect, useState } from 'react';
import { LoadingIndicator } from '../LoadingIndicator';
import FeedOrderStatusBoard from '../../components/FeedOrderStatusBoard/FeedOrderStatusBoard';
import FeedOrders from '../../components/FeedOrders/FeedOrders';
import { Modal } from '../../components/Modal/Modal';
import FeedOrderDetails from '../../components/FeedOrders/FeedOrderDetails/FeedOrderDetails';
import { useNavigate } from 'react-router-dom';
import { TWebsocketOrder } from '../../utils/types';

function Feed(): React.ReactElement {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const socketMessage = useAppSelector((state) => state.websocket.message);
  const [showPopup, setShowPopup] = useState(false);

  function openPopup(order: TWebsocketOrder) {
    setShowPopup(true);
    navigate(
      `/feed/${order.number}`,
      {
        state: { ingredientPopupOpened: true }
      }
    );
  };

  function closePopup() {
    setShowPopup(false);
    // Возвращаемся на предыдущий маршрут
    navigate(-1);
  };

  useEffect(() => {
    dispatch(openWS(`${WS_ORDERS}/all`));
    return () => {
      dispatch(closeWS());
    };
  }, [dispatch]);

  if (!socketMessage.success) {
    return <LoadingIndicator />;
  }

  const readyOrders = socketMessage.orders
    .filter((order) => order.status === 'done')
    .map((order) => order.number.toString().padStart(6, '0'))
    .slice(0, 10);

  const pendingOrders = socketMessage.orders
    .filter((order) => order.status === 'pending')
    .map((order) => order.number.toString().padStart(6, '0'))
    .slice(0, 10);

  return (
    <section className={styles.orderFeed}>
      <h1 className="orderFeed_title text text_type_main-large mb-2">Лента заказов</h1>
      <div className={styles.order}>
        <FeedOrders openPopup={openPopup} orders={socketMessage.orders} />
        <div className={styles.stats}>
          <div className={styles.ordersBoard}>
            <FeedOrderStatusBoard title="Готовы:" orders={readyOrders} />
            <FeedOrderStatusBoard title="В работе:" orders={pendingOrders} />
          </div>
          <div className={styles.completed}>
            <p className="text text_type_main-medium">Выполнено за всё время:</p>
            <p className={`${styles.textShadow} text text_type_digits-large`}>{socketMessage.total}</p>
          </div>
          <div className={styles.completedToday}>
            <p className="text text_type_main-medium">Выполнено за сегодня:</p>
            <p className={`${styles.textShadow} text text_type_digits-large`}>{socketMessage.totalToday}</p>
          </div>
        </div>
      </div>
      {
        showPopup && (
          <Modal onClose={closePopup}>
            <FeedOrderDetails />
          </Modal>
        )
      }
    </section >
  );
};

export { Feed };
