import React from 'react';
import styles from './Main.module.css';

import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';


const Main = () => {
  return (
    <main className={styles.maker}>
      <BurgerIngredients />
      <BurgerConstructor />
    </main>
  );
};

export default Main;
