import styles from './FeedOrderStatusBoard.module.css';

interface FeedOrderStatusBoardProps {
  title: string
  orders: string[];
}

function FeedOrderStatusBoard({ title, orders }: FeedOrderStatusBoardProps): React.ReactElement {
  return (
    <div>
      <p className={`text text_type_main-medium mb-6`}>{title}</p>
      <div className={styles.board}>
        {orders.map((orderNumber, index) => (
          <p key={index} className="text text_type_digits-default">{orderNumber}</p>
        ))}
      </div>
    </div>
  );
}

export default FeedOrderStatusBoard;
