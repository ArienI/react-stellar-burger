import React from 'react';
import styles from '../Ingredients.module.css';
import { data } from '../../../../utils/data';

// Фильтруем соусы из массива данных
const sauces = data.filter((item) => item.type === 'sauce');

const Sauces = () => {
  return (
    <ul className={styles.columns}>
      {sauces.map((sauce) => (
        <li key={sauce._id} className={styles.ingredientItem}>
          <img src={sauce.image} alt={sauce.name} />
          <p>{sauce.name}</p>
          <p>Калории: {sauce.calories}</p>

        </li>
      ))}
    </ul>
  );
};

export default Sauces;
