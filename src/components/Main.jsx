import React from 'react';
import styles from './Main.module.css';

const Main = () => {
  return (
    <main className={styles.maker}>
      <section className={styles.burgerIngredients}>
        <h1>Соберите бургер</h1>
        <ul className={styles.tabs}>
          <li className={styles.tab}></li>
          <li className={styles.tab}></li>
          <li className={styles.tab}></li>
        </ul>
        <h2>Булки</h2>
        <ul className={styles.columnsPuns}>
          <li className={styles.column}></li>
          <li className={styles.column}></li>
        </ul>
        <h2>Соусы</h2>
        <ul className={styles.columnsSauses}>
          <li className={styles.ingredientItem}></li>
          <li className={styles.ingredientItem}></li>
          <li className={styles.ingredientItem}></li>
          <li className={styles.ingredientItem}></li>
        </ul>
      </section>
      <section className={styles.burgerConstructor}>
        <ul className={styles.burgerComponents}>
          <li className={styles.burgerComponent}></li>
          <li className={styles.burgerComponent}></li>
          <li className={styles.burgerComponent}></li>
          <li className={styles.burgerComponent}></li>
          <li className={styles.burgerComponent}></li>
          <li className={styles.burgerComponent}></li>
          <li className={styles.burgerComponent}></li>
        </ul>
        <div className={styles.info}>
          <div className={styles.price}></div>
          <button className={styles.button}>Оформить заказ</button>
        </div>
      </section>
    </main>
  );
};

export default Main;
