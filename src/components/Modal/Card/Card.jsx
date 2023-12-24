import React from 'react';
import imageIcon from '../../../images/done.svg';
import imageDelete from '../../../images/delete24x24.svg';
import styles from '../Card/Card.module.css';

const Card = () => {
  return (
    <div className={styles.card}>
      <img src={imageDelete} alt='удалить' />
      <p className="text text_type_digits-large">31122023</p>
      <p className="text text_type_main-medium">идентификатор заказа</p>
      <img src={imageIcon} alt='сделано' />
      <p className="text text_type_main-small">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
  );
};

export default Card;
