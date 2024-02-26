import styles from './Main.module.css';
import { BurgerConstructor } from '../BurgerConstructor/BurgerConstructor';
import { BurgerIngredients } from '../BurgerIngredients/BurgerIngredients';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { LoadingIndicator } from '../../pages/LoadingIndicator';
import { useEffect } from 'react';
import { checkAndRefreshTokens } from '../../services/actions/authenticationActions';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

function Main(): React.ReactElement {
  const dispatch = useAppDispatch();
  const ingredients = useAppSelector((store) => store.ingredients);

  useEffect(() => {
    dispatch(checkAndRefreshTokens());
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
