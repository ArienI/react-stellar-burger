import React from 'react';
import styles from '../Ingredients.module.css';
import { data } from '../../../../utils/data';

// Фильтруем булки из массива данных
const buns = data.filter((item) => item.type === 'bun');

const Buns = () => {
  return (
    <ul className={styles.columns}>
      {buns.map((bun) => (
        <li key={bun._id} className={styles.ingredientItem}>
          <img src={bun.image} alt={bun.name} />
          <p>{bun.name}</p>
          <p>Калории: {bun.calories}</p>
          <p>Белки: {bun.proteins}</p>
          <p>Жиры: {bun.fat}</p>
          <p>Углеводы: {bun.carbohydrates}</p>
          <p>Цена: {bun.price}</p>

        </li>
      ))}
    </ul>
  );
};

export default Buns;
