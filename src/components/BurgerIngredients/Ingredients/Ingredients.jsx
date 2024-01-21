import React from 'react';
import { Ingredient } from './Ingredient/Ingredient';
import styles from './Ingredients.module.css';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../../utils/prop-types';

const Ingredients = React.forwardRef(({ openModal, ingredientsList }, ref) => {
  return (
    <div className={`${styles.columns} pl-4 pr-4`} ref={ref}>
      {
        ingredientsList.map((ingredient) => (
          <Ingredient key={ingredient._id} ingredient={ingredient} openModal={openModal} />
        ))
      }
    </div>
  );
});


Ingredients.propTypes = {
  openModal: PropTypes.func.isRequired,
  ingredientsList: PropTypes.arrayOf(ingredientPropType).isRequired
};

export { Ingredients };
