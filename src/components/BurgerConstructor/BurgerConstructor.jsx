import React, { useState } from 'react';
import styles from './BurgerConstructor.module.css';
import { ConstructorElement, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { data } from '../../utils/data';
import imageIcon from '../../images/icon 36x36.svg';
import Card from '../Modal/Card/Card';
import ModalCard from '../Modal/ModalCard';

const BurgerConstructor = () => {
  // фильтруем массив в файле data, ищем булочки(item.type === 'bun')
  const buns = data.filter((item) => item.type === 'bun');
  // первый элемент с индексом 0 - это верхняя булка
  const topBun = buns[0];
  // последний элемент с индексмом длина-1 - это нижняя булка
  const bottomBun = buns[buns.length - 1];

  // фильтруем остальные ингредиенты, выбираем все не булочки
  const otherIngredients = data.filter((item) => item.type !== 'bun');

  // useState- хук для управления состоянием, вызывается с начальным состоянием
  // showPopup- хранит текущее состояние, setShowPopup- функция позволяющая изменить это состояние. Начальное значение для showPopup-false
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
          {/* onClick={() => setShowPopup(true)}- это проп onClick, который принимает стрелочную функцию. При клике на кнопку, вызывается функция, и внутри нее вызывается setShowPopup с аргументом true, и это меняет состояние showPopup на true, для отображения модального окна*/}
          <Button onClick={() => setShowPopup(true)} type="primary" size="large">
            Оформить заказ
          </Button>
          {/* show={showPopup} -проп контролирует должен ли компонент ModalCard отображаться или быть скрытым. Когда showPopup равно true, модальное окно будет показано */}
          {/* onClose={() => setShowPopup(false)}- проп, который представляет функцию, которая будет вызвана, когда нужно закрытьь модальное окно. Функция setShowPopup(false) изменит состояние showPopup на false, что приведёт к закрытию модального окна.  */}
          <ModalCard show={showPopup} onClose={() => setShowPopup(false)}>
            <Card />
          </ModalCard>
        </div>
      </div>

    </section>
  );
};

export default BurgerConstructor;
