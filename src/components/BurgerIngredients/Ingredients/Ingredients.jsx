import styles from './Ingredients.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

function Ingredients({ openModal, ingredientsList }) {
  return (
    <div className={`${styles.columns} pl-4 pr-4`}>
      {ingredientsList.map((ingredient) => (
        <div className={styles.column} key={ingredient._id} onClick={() => openModal(ingredient)}>
          <img src={ingredient.image} className={styles.image} alt={ingredient.name} />
          <div className={styles.price}>
            <p className="text text_type_digits-default">{ingredient.price}</p>
            <CurrencyIcon type="primary" />
          </div>
          <p className="text text_type_main-default">{ingredient.name}</p>
          <div className={styles.counter}>
            <Counter count={4} size="default" />
          </div>
        </div>
      ))}
    </div>
  );
};

Ingredients.propTypes = {
  openModal: PropTypes.func.isRequired,
  ingredientsList: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      type: PropTypes.string,
      proteins: PropTypes.number,
      fat: PropTypes.number,
      carbohydrates: PropTypes.number,
      calories: PropTypes.number,
      price: PropTypes.number,
      image: PropTypes.string,
      image_mobile: PropTypes.string,
      image_large: PropTypes.string,
      __v: PropTypes.number
    })
  ).isRequired
};

export { Ingredients };
