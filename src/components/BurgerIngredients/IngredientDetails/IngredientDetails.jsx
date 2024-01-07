import styles from './IngredientDetails.module.css';
import PropTypes from 'prop-types';

function IngredientDetails({ ingredient }) {
  // Если ингредиент не выбран, ничего не рендерим
  if (!ingredient) return null;
  // Теперь отображаем информацию только для выбранного ингредиента
  return (
    <div className={styles.ingredientInfo}>
      <p className="text text_type_main-medium">Детали ингредиента</p>
      <img src={ingredient.image_large} alt={ingredient.name} />
      <p className="text text_type_main-default pt-4 pb-8">{ingredient.name}</p>
      <div className={styles.description}>
        <div>
          <p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
          <p className="text text_type_main-default text_color_inactive">{ingredient.calories}</p>
        </div>
        <div>
          <p className="text text_type_main-default text_color_inactive">Белки:</p>
          <p className="text text_type_main-default text_color_inactive">{ingredient.proteins}</p>
        </div>
        <div>
          <p className="text text_type_main-default text_color_inactive">Жиры:</p>
          <p className="text text_type_main-default text_color_inactive">{ingredient.fat}</p>
        </div>
        <div>
          <p className="text text_type_main-default text_color_inactive">Углеводы:</p>
          <p className="text text_type_main-default text_color_inactive">{ingredient.carbohydrates}</p>
        </div>
      </div>
    </div>
  );
};

// Валидация пропсов
IngredientDetails.propTypes = {
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

export { IngredientDetails };
