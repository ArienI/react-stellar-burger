import { useMemo, useState } from 'react';
import styles from './BurgerConstructor.module.css';
import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderDetails } from './OrderDetails/OrderDetails';
import { Modal } from '../Modal/Modal';
import { useDrop } from 'react-dnd';
import { addIngredient, deleteIngredient } from '../../services/actions/burgerActions';
import { decrementAmount, incrementAmount } from '../../services/actions/ingredientsActions';
import { clearOrder, sendOrder } from '../../services/actions/orderActions';
import { BurgerIngredient } from './BurgerIngredient/BurgerIngredient';
import { Navigate } from 'react-router-dom';
import { TIngredient } from '../../utils/types';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

function BurgerConstructor(): React.ReactElement {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((auth) => auth.authentication.isLoggedIn);
  const burger = useAppSelector((burger) => burger.burger);
  const anyBuns = burger.find((ingredient) => ingredient.type === 'bun');
  const anyIngredients = burger.some((ingredient) => ingredient.type !== 'bun');
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  function calculatePrice(ingredients: TIngredient[]) {
    const initialPrice = 0;
    return ingredients.reduce((acc, item) => {
      const ingredienPrice = item.type === 'bun' ? item.price * 2 : item.price;
      return acc + ingredienPrice;
    }, initialPrice);
  };

  const totalPrice = useMemo(() => calculatePrice(burger), [burger]);

  // useState- хук для управления состоянием, вызывается с начальным состоянием
  // showPopup- хранит текущее состояние, setShowPopup- функция позволяющая изменить это состояние. Начальное значение для showPopup-false
  const [isShowPopup, setIsShowPopup] = useState(false);

  const handleDrop = (ingredient: TIngredient) => {
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

  function onOrderButtonClick() {
    if (!isLoggedIn) {
      // мы не можем рендерить компоненты в event handler,
      // поэтому перенаправляем пользователя, используя state
      setRedirectToLogin(true);
    } else {
      dispatch(sendOrder(burger.map((item: TIngredient) => item._id)));
      setIsShowPopup(true)
    }
  }

  if (redirectToLogin) {
    return (
      <Navigate
        to="/login"
      />
    );
  }

  return (
    <section
      className={styles.burgerConstructor}
      ref={dropRef}
      data-testid="burger"
    >
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
                burger.map((item: TIngredient, index: number) => {
                  if (item.type !== 'bun') {
                    return (
                      <BurgerIngredient
                        key={item.newID}
                        index={index}
                        item={item}
                      />
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
          <p className="text text_type_digits-medium">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <div className={styles.buttonContainer}>
          {/* onClick={() => setShowPopup(true)}- это проп onClick, который принимает стрелочную функцию. При клике на кнопку, вызывается функция, и внутри нее вызывается setShowPopup с аргументом true, и это меняет состояние showPopup на true, для отображения модального окна*/}
          <Button
            onClick={onOrderButtonClick}
            type="primary"
            size="large"
            htmlType="button"
            disabled={!anyBuns || !anyIngredients}
            data-testid="orderButton"
          >
            Оформить заказ
          </Button>
          {/* onClose={() => setShowPopup(false)}- проп, который представляет функцию, которая будет вызвана, когда нужно закрытьь модальное окно. Функция setShowPopup(false) изменит состояние showPopup на false, что приведёт к закрытию модального окна.  */}
          {
            isShowPopup && (
              <Modal onClose={
                () => {
                  setIsShowPopup(false);
                  dispatch(clearOrder());
                }
              }
              >
                <OrderDetails />
              </Modal>
            )
          }
        </div>
      </div>

    </section >
  );
};

export { BurgerConstructor };
