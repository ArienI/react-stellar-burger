import styles from './Main.module.css';
import { BurgerConstructor } from '../BurgerConstructor/BurgerConstructor';
import { BurgerIngredients } from '../BurgerIngredients/BurgerIngredients';
import { useEffect } from 'react';
import { download } from '../../services/actions/Ingredients';
import { useSelector, useDispatch } from 'react-redux';

function Main() {
  const ingredients = useSelector((store) => store.Ingredients);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(download());
  }, []);

  if (!ingredients) {
    return <h1 className={styles.preloader}>Идёт Загрузка... =^.^=❤meow❤=^.^= ...</h1>;
  }

  return (
    <main className={styles.maker}>
      <BurgerIngredients ingredients={ingredients} />
      <BurgerConstructor ingredients={ingredients} />
    </main>
  );
}

export { Main };
