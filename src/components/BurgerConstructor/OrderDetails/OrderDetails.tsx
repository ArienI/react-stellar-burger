import styles from './OrderDetails.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { LoadingIndicator } from '../../../pages/LoadingIndicator';
import { useAppSelector } from '../../../utils/hooks';

function OrderDetails(): React.ReactElement {
  const order = useAppSelector((store) => store.order);

  if (!order) {
    return (
      <LoadingIndicator />
    );
  }

  return (
    <div className={styles.card}>
      <p className="text text_type_digits-large">{order.order.number}</p>
      <p className="text text_type_main-medium">идентификатор заказа</p>
      <CheckMarkIcon type="primary" />
      <p className="text text_type_main-small">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
  );
};

export { OrderDetails };
