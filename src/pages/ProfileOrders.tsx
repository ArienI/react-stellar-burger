import styles from './pages.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../services/actions/authenticationActions';
import { LoadingIndicator } from './LoadingIndicator';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { WS_ORDERS } from '../utils/const';
import { closeWS, openWS } from '../services/actions/websocketActions';
import { useEffect, useState } from 'react';
import FeedOrders from '../components/FeedOrders/FeedOrders';
import { TWebsocketOrder } from '../utils/types';
import { Modal } from '../components/Modal/Modal';
import FeedOrderDetails from '../components/FeedOrders/FeedOrderDetails/FeedOrderDetails';

function ProfileOrders(): React.ReactElement {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const socketMessage = useAppSelector((state) => state.websocket.message);

  const [showPopup, setShowPopup] = useState(false);

  function openPopup(order: TWebsocketOrder) {
    setShowPopup(true);
    navigate(
      `/profile/orders/${order.number}`,
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
    const accessToken = localStorage.getItem('accessToken');
    const pureAccessToken = accessToken ? accessToken.replace('Bearer ', '') : '';
    dispatch(openWS(`${WS_ORDERS}?token=${pureAccessToken}`));
    return () => {
      dispatch(closeWS());
    };
  }, [dispatch]);

  function onLogout() {
    dispatch(logout());
  };

  if (!socketMessage.success) {
    return <LoadingIndicator />;
  }

  return (
    <div className={styles.center}>
      <div className={styles.grid}>
        <nav className={`${styles.profileMenu} mr-15 mt-5`}>
          <NavLink
            to='/profile'
            className={`${styles.profileLink} text text_type_main-medium text_color_inactive`}
          >
            Профиль
          </NavLink>
          <NavLink
            to='/profile/orders'
            className={({ isActive }) =>
              `${styles.profileLink} text text_type_main-medium ${isActive ? 'text_color_primary' : 'text_color_inactive'}`
            }
          >
            История заказов
          </NavLink>
          <div
            className={`${styles.profileLink} text text_type_main-medium text_color_inactive`}
            onClick={onLogout}
          >
            Выход
          </div>
          <p className={` ${styles.menuDescription} text text_type_main-default text_color_inactive mt-8`}>В этом разделе вы можете изменить свои персональные данные</p>
        </nav>
        <FeedOrders orders={socketMessage.orders} isProfile={true} openPopup={openPopup} />
      </div>
      {
        showPopup && (
          <Modal onClose={closePopup}>
            <FeedOrderDetails />
          </Modal>
        )
      }
    </div >
  );
};

export { ProfileOrders };
