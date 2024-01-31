import styles from './Main.module.css';
import { BurgerConstructor } from '../BurgerConstructor/BurgerConstructor';
import { BurgerIngredients } from '../BurgerIngredients/BurgerIngredients';
import { useEffect } from 'react';
import { getIngredients } from '../../services/actions/ingredientsActions';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { LoadingIndicator } from '../../pages/LoadingIndicator';

function Main() {
  const ingredients = useSelector((store) => store.ingredients);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  if (!ingredients) {
    return (
      <LoadingIndicator />
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <main className={styles.maker}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </DndProvider>
  );
}

export { Main };
