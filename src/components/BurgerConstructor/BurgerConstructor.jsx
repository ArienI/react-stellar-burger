import React, { useState } from 'react';
import styles from './BurgerConstructor.module.css';
import { ConstructorElement, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { data } from '../../utils/data';
import imageIcon from '../../images/icon 36x36.svg';
import Card from '../Modal/Card/Card';
import ModalCard from '../Modal/ModalCard';

const BurgerConstructor = () => {
  const buns = data.filter((item) => item.type === 'bun');
  // первый элемент - это верхняя булка
  const topBun = buns[0];
  // последний элемент - это нижняя булка
  const bottomBun = buns[buns.length - 1];

  // фильтруем остальные ингредиенты
  const otherIngredients = data.filter((item) => item.type !== 'bun');

  const [showPopup, setShowPopup] = useState(false);

  return (
    <section className={styles.burgerConstructor}>
      <div className={styles.burgerComponents}>
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
      </div>

      <div className={styles.info}>
        <div className={styles.price}>
          <p className="text text_type_digits-medium">610</p>
          <img src={imageIcon} alt='космокристалл' className={styles.icon} />
        </div>
        <div className={styles.buttonContainer}>
          <Button onClick={() => setShowPopup(true)} type="primary" size="large">
            Оформить заказ
          </Button>
          <ModalCard show={showPopup} onClose={() => setShowPopup(false)}>
            <Card />
          </ModalCard>
        </div>
      </div>

    </section>
  );
};

export default BurgerConstructor;
