import React from 'react';
import styles from './FeedOrders.module.css';
import { TWebsocketOrder } from '../../utils/types';
import FeedOrder from './FeedOrder/FeedOrder';

interface FeedOrdersProps {
  orders: Array<TWebsocketOrder>;
  isProfile?: boolean;
  openPopup: (order: TWebsocketOrder) => void;
}

function FeedOrders({ orders, isProfile = false, openPopup }: FeedOrdersProps): React.ReactElement {
  // Сортируем заказы по номеру
  const sortedOrders = [...orders].sort((a, b) => b.number - a.number);

  return (
    <div className={`${styles.customScroll}`}>
      {sortedOrders.map((item) => (
        <FeedOrder key={item.number} order={item} isProfile={isProfile} openPopup={openPopup} />
      ))}
    </div>
  );
}

export default FeedOrders;
