import React from 'react';
import styles from '../Ingredients.module.css';
import { data } from '../../../../utils/data';
import imageIcon from '../../../../images/icon 24x24.svg';

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
              <p>30</p>
              <img src={imageIcon} alt='космокристалл' />
            </div>
            <p>{sauce.name}</p>
            {/* <p>Калории: {sauce.calories}</p> */}

          </div>
        </div>
      ))}
    </div>
  );
};

export default Sauces;
