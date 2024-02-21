import React from 'react';
import { Ingredient } from './Ingredient/Ingredient';
import styles from './Ingredients.module.css';
import { TIngredient } from '../../../utils/types';

interface IngredientsProps {
  ingredientsList: TIngredient[];
  openPopup: (ingredient: TIngredient) => void;
}

const Ingredients = React.forwardRef<HTMLDivElement, IngredientsProps>(({ openPopup, ingredientsList }, ref) => {
  return (
    <div className={`${styles.columns} pl-4 pr-4`} ref={ref}>
      {
        ingredientsList.map((ingredient) => (
          <Ingredient key={ingredient._id} ingredient={ingredient} openPopup={openPopup} />
        ))
      }
    </div>
  );
});

export { Ingredients };
