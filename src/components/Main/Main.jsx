import styles from './Main.module.css';
import { BurgerConstructor } from '../BurgerConstructor/BurgerConstructor';
import { BurgerIngredients } from '../BurgerIngredients/BurgerIngredients';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { LoadingIndicator } from '../../pages/LoadingIndicator';
import { useEffect } from 'react';
import { checkAndRefreshTokens } from '../../services/actions/authenticationActions';

function Main() {
  const dispatch = useDispatch();
  const ingredients = useSelector((store) => store.ingredients);

  useEffect(() => {
    dispatch(checkAndRefreshTokens());
  }, []);

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
