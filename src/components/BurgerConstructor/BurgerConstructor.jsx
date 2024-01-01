import { useState } from 'react';
import styles from './BurgerConstructor.module.css';
import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderDetails } from './OrderDetails/OrderDetails';
import { Modal } from '../Modal/Modal';
import PropTypes from 'prop-types';

function BurgerConstructor({ ingredients }) {
  // фильтруем массив в файле data, ищем булочки(item.type === 'bun')
  const buns = ingredients.filter((item) => item.type === 'bun');
  // первый элемент с индексом 0 - это верхняя булка
  const topBun = buns[0];
  // последний элемент с индексмом длина-1 - это нижняя булка
  const bottomBun = buns[buns.length - 1];

  // фильтруем остальные ингредиенты, выбираем все не булочки
  const otherIngredients = ingredients.filter((item) => item.type !== 'bun');

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
        <div className={`${styles.customScroll} mt-4 mb-4`}>
          {/* Отображаем только остальные ингредиенты */}
          {otherIngredients.map((item) => (
            <div className={`${styles.constructorIngredient} pr-2 pb-4`} key={item._id}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </div>
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
          <CurrencyIcon type="primary" />
        </div>
        <div className={styles.buttonContainer}>
          {/* onClick={() => setShowPopup(true)}- это проп onClick, который принимает стрелочную функцию. При клике на кнопку, вызывается функция, и внутри нее вызывается setShowPopup с аргументом true, и это меняет состояние showPopup на true, для отображения модального окна*/}
          <Button onClick={() => setShowPopup(true)} type="primary" size="large" htmlType="button">
            Оформить заказ
          </Button>
          {/* show={showPopup} -проп контролирует должен ли компонент Modal отображаться или быть скрытым. Когда showPopup равно true, модальное окно будет показано */}
          {/* onClose={() => setShowPopup(false)}- проп, который представляет функцию, которая будет вызвана, когда нужно закрытьь модальное окно. Функция setShowPopup(false) изменит состояние showPopup на false, что приведёт к закрытию модального окна.  */}
          <Modal show={showPopup} onClose={() => setShowPopup(false)}>
            <OrderDetails />
          </Modal>
        </div>
      </div>

    </section>
  );
};

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number
  })).isRequired
};

export { BurgerConstructor };
