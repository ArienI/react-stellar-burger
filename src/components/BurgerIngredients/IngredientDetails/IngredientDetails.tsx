import { LoadingIndicator } from '../../../pages/LoadingIndicator';
import { useAppSelector } from '../../../utils/hooks';
import styles from './IngredientDetails.module.css';
import { useParams } from 'react-router-dom';

function IngredientDetails(): React.ReactElement {
  const ingredients = useAppSelector((store) => store.ingredients);
  const { id } = useParams();
  const ingredient = ingredients.find((item) => item._id === id);

  // Если ингредиент не выбран, ничего не рендерим
  if (!ingredient) {
    return (
      <LoadingIndicator />
    );
  }
  // Теперь отображаем информацию только для выбранного ингредиента
  return (
    <div className={styles.ingredientInfo}>
      <p className="text text_type_main-medium">Детали ингредиента</p>
      <img src={ingredient.image_large} alt={ingredient.name} />
      <p className="text text_type_main-default pt-4 pb-8">{ingredient.name}</p>
      <div className={styles.description}>
        <div>
          <p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.calories}</p>
        </div>
        <div>
          <p className="text text_type_main-default text_color_inactive">Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.proteins}</p>
        </div>
        <div>
          <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.fat}</p>
        </div>
        <div>
          <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.carbohydrates}</p>
        </div>
      </div>
    </div>
  );
};

export { IngredientDetails };
