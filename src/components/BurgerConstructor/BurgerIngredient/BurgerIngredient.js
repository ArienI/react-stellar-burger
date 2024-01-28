import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { decrementAmount } from "../../../services/actions/Ingredients";
import { deleteIngredient, moveIngredient } from "../../../services/actions/Burger";
import { useDispatch } from "react-redux";
import styles from './BurgerIngredient.module.css';
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import PropTypes from 'prop-types';
import { ingredientPropType } from "../../../utils/prop-types";

function BurgerIngredient({ index, item }) {
  const dispatch = useDispatch();
  const elementRef = useRef(null);

  const [, dragRef] = useDrag({
    type: 'moveIngredient',
    item: { type: 'moveIngredient', index }
  });

  function handleHover(movingIngredient) {
    if (!elementRef.current) {
      return;
    }
    const originalPosition = movingIngredient.index;
    const newPosition = index;
    if (originalPosition === newPosition) {
      return;
    }
    dispatch(moveIngredient(originalPosition, newPosition));
    movingIngredient.index = newPosition;
  }

  const [, dropRef] = useDrop({
    accept: 'moveIngredient',
    hover: handleHover
  });

  dragRef(dropRef(elementRef));

  return (
    <div className={`${styles.constructorIngredient} pr-2 pb-4`} ref={elementRef}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => {
          dispatch(decrementAmount(item._id));
          dispatch(deleteIngredient(index));
        }}
      />
    </div>
  );
}

BurgerIngredient.propTypes = {
  index: PropTypes.number.isRequired,
  item: ingredientPropType.isRequired
};

export { BurgerIngredient };