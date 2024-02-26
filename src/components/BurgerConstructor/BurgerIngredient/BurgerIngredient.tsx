import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { decrementAmount } from "../../../services/actions/ingredientsActions";
import { deleteIngredient, moveIngredient } from "../../../services/actions/burgerActions";
import styles from './BurgerIngredient.module.css';
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { TIngredient } from "../../../utils/types";
import { useAppDispatch } from "../../../utils/hooks";

interface BurgerIngredientProps {
  index: number;
  item: TIngredient;
}

function BurgerIngredient({ index, item }: BurgerIngredientProps): React.ReactElement {
  const dispatch = useAppDispatch();
  const elementRef = useRef<HTMLDivElement>(null);

  const [, dragRef] = useDrag({
    type: 'moveIngredient',
    item: { type: 'moveIngredient', index }
  });

  function handleHover(movingIngredient: TIngredient) {
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

export { BurgerIngredient };