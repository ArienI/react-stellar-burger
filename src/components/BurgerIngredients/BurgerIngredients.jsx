import React, { useState } from 'react';
import styles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Buns from './Ingredients/Buns/Buns';
import Sauces from './Ingredients/Sauces/Sauces';

const BurgerIngredients = () => {
  // Создаем состояние current с начальным значением 'one'
  const [current, setCurrent] = useState('one');

  return (
    <section className={styles.burgerIngredients}>
      <h1>Соберите бургер</h1>
      <div style={{ display: 'flex' }}>
        <Tab value="one" active={current === 'one'} onClick={() => setCurrent('one')}>
          One
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={() => setCurrent('two')}>
          Two
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={() => setCurrent('three')}>
          Three
        </Tab>
      </div>
      <div className={styles.customScroll}>
        <h2>Булки</h2>
        <Buns />

        <h2>Соусы</h2>
        <Sauces />
      </div>
      {/* <Modal/> */}
    </section>
  );
};

export default BurgerIngredients;
