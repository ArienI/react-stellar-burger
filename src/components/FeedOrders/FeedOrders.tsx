import React from 'react';
import styles from './FeedOrders.module.css';
import { TWebsocketOrder } from '../../utils/types';
import FeedOrder from './FeedOrder/FeedOrder';

interface FeedOrdersProps {
  orders: Array<TWebsocketOrder>;
  isProfile?: boolean;
}

function FeedOrders({ orders, isProfile = false }: FeedOrdersProps): React.ReactElement {
  // Сортируем заказы по номеру
  const sortedOrders = [...orders].sort((a, b) => b.number - a.number);

  return (
    <div className={`${styles.customScroll}`}>
      {sortedOrders.map((item) => (
        <FeedOrder key={item.number} order={item} isProfile={isProfile} />
      ))}
    </div>
  );
}

export default FeedOrders;
