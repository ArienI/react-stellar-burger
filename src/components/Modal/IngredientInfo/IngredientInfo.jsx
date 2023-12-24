import React from 'react';
import imageDelete from '../../../images/delete24x24.svg';
import styles from '../IngredientInfo/IngredientInfo.module.css';
import { data } from '../../../utils/data';

const buns = data.filter((item) => item.type === 'bun');

const IngredientInfo = () => {
  return (
    <div>
      <div>
        <p className="text text_type_main-large">
          Детали ингредиента
        </p>
        <img src={imageDelete} alt='удалить' />
      </div>

      <div className={styles.columns}>
        {buns.map((bun) => (
          <div key={bun._id} className={styles.ingredientItem}>
            <img src={bun.image} alt={bun.name} />
            <p>{bun.name}</p>
            <p>Калории: {bun.calories}</p>
            <p>Белки: {bun.proteins}</p>
            <p>Жиры: {bun.fat}</p>
            <p>Углеводы: {bun.carbohydrates}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default IngredientInfo;
