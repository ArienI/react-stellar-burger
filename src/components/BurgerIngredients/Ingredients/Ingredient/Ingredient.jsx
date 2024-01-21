import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Ingredient.module.css';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';

function Ingredient({ ingredient, openModal }) {
    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: ingredient,
    });
    return (
        <div className={styles.column} key={ingredient._id} onClick={() => openModal(ingredient)} ref={dragRef}>
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

Ingredient.propTypes = {
    ingredient: PropTypes.shape({
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
        __v: PropTypes.number,
        amount: PropTypes.number
    }).isRequired,
    openModal: PropTypes.func.isRequired,
};

export { Ingredient };