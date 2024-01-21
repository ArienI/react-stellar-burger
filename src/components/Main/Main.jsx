import styles from './Main.module.css';
import { BurgerConstructor } from '../BurgerConstructor/BurgerConstructor';
import { BurgerIngredients } from '../BurgerIngredients/BurgerIngredients';
import { useEffect } from 'react';
import { getIngredients } from '../../services/actions/Ingredients';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function Main() {
  const ingredients = useSelector((store) => store.ingredients);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  if (!ingredients) {
    return <h1 className={styles.preloader}>Идёт Загрузка... =^.^=❤meow❤=^.^= ...</h1>;
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
