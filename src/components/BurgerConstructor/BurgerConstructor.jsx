import React from 'react';
import styles from './BurgerConstructor.module.css';
import { ConstructorElement, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { data } from '../../utils/data';

const BurgerConstructor = () => {
  const buns = data.filter((item) => item.type === 'bun');
  // первый элемент - это верхняя булка
  const topBun = buns[0];
  // последний элемент - это нижняя булка
  const bottomBun = buns[buns.length - 1];

  // фильтруем остальные ингредиенты
  const otherIngredients = data.filter((item) => item.type !== 'bun');


  return (
    <section className={styles.burgerConstructor}>
      {/* Отображение верхней булки */}
      {topBun && (
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${topBun.name} (верх)`}
          price={topBun.price}
          thumbnail={topBun.image}
          key={topBun._id}
        />
      )}

      {/* Отображение ингредиентов с прокруткой */}
      <div className={styles.customScroll}>
        {/* Отображаем только остальные ингредиенты */}
        {otherIngredients.map((item) => (
          <ConstructorElement
            key={item._id}
            text={item.name}
            price={item.price}
            thumbnail={item.image}
          />
        ))}
      </div>

      {/* Отображение нижней булки */}
      {bottomBun && (
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${bottomBun.name} (низ)`}
          price={bottomBun.price}
          thumbnail={bottomBun.image}
          key={bottomBun._id}
        />
      )}

      <div className={styles.buttonContainer}>
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
