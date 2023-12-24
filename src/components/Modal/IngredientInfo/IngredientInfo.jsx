import React from 'react';
import styles from '../IngredientInfo/IngredientInfo.module.css';
import PropTypes from 'prop-types';


const IngredientInfo = ({ ingredient }) => {
  // Если ингредиент не выбран, ничего не рендерим
  if (!ingredient) return null;

  // Теперь отображаем информацию только для выбранного ингредиента
  return (
    <div className={styles.ingredientInfo}>
      <div className={styles.header}>
        <p className="text text_type_digits-medium">Детали ингредиента</p>
      </div>
      <div className={styles.ingredientDetails}>
        <div key={ingredient._id} className={styles.ingredientItem}>
          <img src={ingredient.image} alt={ingredient.name} className={styles.ingredientImage} />
          <p className="text text_type_digits-default text_name">{ingredient.name}</p>
          <div className={styles.description}>
            <p className="text text_type_digits-default text_description">Калории: {ingredient.calories}</p>
            <p className="text text_type_digits-default text_description">Белки: {ingredient.proteins}</p>
            <p className="text text_type_digits-default text_description">Жиры: {ingredient.fat}</p>
            <p className="text text_type_digits-default text_description">Углеводы: {ingredient.carbohydrates}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Валидация пропсов
IngredientInfo.propTypes = {
  ingredient: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired
  })
};

export default IngredientInfo;
