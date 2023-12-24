import React from 'react';
import styles from '../Ingredients.module.css';
import { data } from '../../../../utils/data';
import imageIcon from '../../../../images/icon 24x24.svg';
import { p } from '@ya.praktikum/react-developer-burger-ui-components';

// Фильтруем соусы из массива данных
const sauces = data.filter((item) => item.type === 'sauce');

const Sauces = () => {
  return (
    <div className={styles.columns}>
      {sauces.map((sauce) => (
        <div key={sauce._id} className={styles.ingredientItem}>
          <div className={styles.column}>
            <div className={styles.counter}></div>
            <img src={sauce.image} className={styles.image} alt={sauce.name} />
            <div className={styles.price}>
              <p className="text text_type_digits-default">30</p>
              <img src={imageIcon} alt='космокристалл' />
            </div>
            <p>{sauce.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sauces;
