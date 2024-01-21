import { Ingredient } from './Ingredient/Ingredient';
import styles from './Ingredients.module.css';
import PropTypes from 'prop-types';

function Ingredients({ openModal, ingredientsList }) {
  return (
    <div className={`${styles.columns} pl-4 pr-4`}>
      {ingredientsList.map((ingredient) => (
        <Ingredient key={ingredient._id} ingredient={ingredient} openModal={openModal} />
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
