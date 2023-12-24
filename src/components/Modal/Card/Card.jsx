import React from 'react';
import imageIcon from '../../../images/done.svg';
import styles from '../Card/Card.module.css';

const Card = () => {
  return (
    <div className={styles.card}>
      <p className="text text_type_digits-large" >31122023</p>
      <p className="text text_type_main-medium">идентификатор заказа</p>
      <img className={styles.cardImage} src={imageIcon} alt='сделано' />
      <p className="text text_type_main-small">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
  );
};

export default Card;
