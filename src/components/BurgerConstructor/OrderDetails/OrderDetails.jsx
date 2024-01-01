import styles from './OrderDetails.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function OrderDetails() {
  return (
    <div className={styles.card}>
      <p className="text text_type_digits-large" >31122023</p>
      <p className="text text_type_main-medium">идентификатор заказа</p>
      <CheckMarkIcon type="primary" />
      <p className="text text_type_main-small">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
  );
};

export { OrderDetails };
