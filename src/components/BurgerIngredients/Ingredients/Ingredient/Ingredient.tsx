import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Ingredient.module.css';
import { useDrag } from 'react-dnd';
import { TIngredient } from '../../../../utils/types';

interface IngredientProps {
    ingredient: TIngredient;
    openPopup: (ingredient: TIngredient) => void;
}

function Ingredient({ ingredient, openPopup }: IngredientProps): React.ReactElement {
    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: ingredient,
    });
    return (
        <div className={styles.column} key={ingredient._id} onClick={() => openPopup(ingredient)} ref={dragRef}>
            <img src={ingredient.image} className={styles.image} alt={ingredient.name} />
            <div className={styles.price}>
                <p className="text text_type_digits-default">{ingredient.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className="text text_type_main-default">{ingredient.name}</p>
            <div className={styles.counter}>
                {ingredient.amount !== 0 && (
                    <Counter count={ingredient.amount} size="default" />
                )}
            </div>
        </div>
    );
}

export { Ingredient };