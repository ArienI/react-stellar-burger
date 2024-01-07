import styles from './Main.module.css';
import { BurgerConstructor } from '../BurgerConstructor/BurgerConstructor';
import { BurgerIngredients } from '../BurgerIngredients/BurgerIngredients';
import { useState, useEffect } from 'react';

function Main() {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://norma.nomoreparties.space/api/ingredients')
      .then(res => {
        if (!res.ok) {
          throw new Error('Ошибка!');
        }
        return res.json();
      })
      .then(data => {
        setIngredients(data.data);
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <h1 className={styles.preloader}>Идёт Загрузка... =^.^=❤meow❤=^.^= ...</h1>;
  }

  if (error) {
    return <h1 className={styles.error}>Ошибка: {error}</h1>;
  }

  return (
    <main className={styles.maker}>
      <BurgerIngredients ingredients={ingredients} />
      <BurgerConstructor ingredients={ingredients} />
    </main>
  );
}

export { Main };
