import React from 'react';
import styles from '../Ingredients.module.css';
import { data } from '../../../../utils/data';
import imageIcon from '../../../../images/icon 24x24.svg';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';

// Фильтруем булки из массива данных
const buns = data.filter((item) => item.type === 'bun');

const Buns = () => {
  return (
    <div className={styles.columns}>
      {buns.map((bun) => (
        <div key={bun._id} className={styles.ingredientItem}>
          <div className={styles.column}>
            <Counter />
            <img src={bun.image} className={styles.image} alt={bun.name} />
            <div className={styles.price}>
              <p className="text text_type_digits-default">20</p>
              <img src={imageIcon} alt='космокристалл' />
            </div>
            <p>{bun.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Buns;
