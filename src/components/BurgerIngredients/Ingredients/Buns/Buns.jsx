import React from 'react';
import styles from '../Ingredients.module.css';
import { data } from '../../../../utils/data';
import imageIcon from '../../../../images/icon 24x24.svg';

// Фильтруем булки из массива данных
const buns = data.filter((item) => item.type === 'bun');

const Buns = () => {
  return (
    <div className={styles.columns}>
      {buns.map((bun) => (
        <div key={bun._id} className={styles.ingredientItem}>
          <div className={styles.column}>
            <div className={styles.counter}></div>
            <img src={bun.image} className={styles.image} alt={bun.name} />
            <div className={styles.price}>
              <p>20</p>
              <img src={imageIcon} alt='космокристалл' />
            </div>
            <p>{bun.name}</p>
            {/* <p>Калории: {bun.calories}</p> */}
            {/* <p>Белки: {bun.proteins}</p> */}
            {/* <p>Жиры: {bun.fat}</p> */}
            {/* <p>Углеводы: {bun.carbohydrates}</p> */}
            {/* <p>Цена: {bun.price}</p> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Buns;
