import { useState } from 'react';
import styles from './BurgerConstructor.module.css';
import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderDetails } from './OrderDetails/OrderDetails';
import { Modal } from '../Modal/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { addIngredient, deleteIngredient } from '../../services/actions/Burger';
import { decrementAmount, incrementAmount } from '../../services/actions/Ingredients';

function BurgerConstructor() {
  const dispatch = useDispatch();
  const burger = useSelector((store) => store.Burger);
  const anyBuns = burger.find(item => item.type === 'bun');
  const anyIngredients = burger.some(item => item.type !== 'bun');

  // useState- хук для управления состоянием, вызывается с начальным состоянием
  // showPopup- хранит текущее состояние, setShowPopup- функция позволяющая изменить это состояние. Начальное значение для showPopup-false
  const [showPopup, setShowPopup] = useState(false);

  const handleDrop = (ingredient) => {
    if (ingredient.type === 'bun' && anyBuns) {
      dispatch(decrementAmount(anyBuns._id));
      dispatch(deleteIngredient(0));
    }
    dispatch(incrementAmount(ingredient._id));
    dispatch(addIngredient(ingredient));
  };

  const [, dropRef] = useDrop({
    accept: 'ingredient',
    drop: handleDrop
  });

  return (
    <section className={styles.burgerConstructor} ref={dropRef}>
      <div className={styles.burgerComponents}>
        {
          burger.length === 0 && (
            <h1>{'<---- Перетащите булку и ингредиенты'}</h1>)
        }
        {/* Отображение верхней булки */}
        {
          anyBuns && (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${anyBuns.name} (верх)`}
              price={anyBuns.price}
              thumbnail={anyBuns.image}
            />
          )
        }
        {/* Отображение ингредиентов с прокруткой */}
        {
          anyIngredients && (
            <div className={`${styles.customScroll} mt-4 mb-4`}>
              {/* Displaying only the other ingredients */}
              {
                burger.map((item, index) => {
                  if (item.type !== 'bun') {
                    return (
                      <div className={`${styles.constructorIngredient} pr-2 pb-4`} key={item.newID}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                          text={item.name}
                          price={item.price}
                          thumbnail={item.image}
                          handleClose={() => {
                            dispatch(decrementAmount(item._id));
                            dispatch(deleteIngredient(index));
                          }}
                        />
                      </div>
                    );
                  }
                  return null;
                })
              }
            </div>
          )
        }
        {/* Отображение нижней булки */}
        {
          anyBuns && (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${anyBuns.name} (низ)`}
              price={anyBuns.price}
              thumbnail={anyBuns.image}
            />
          )
        }
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
export { BurgerConstructor };
