import { useEffect, useState } from 'react';
import styles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredients } from './Ingredients/Ingredients';
import { Modal } from '../Modal/Modal';
import { IngredientDetails } from './IngredientDetails/IngredientDetails';
import { useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';

function BurgerIngredients() {
  const ingredients = useSelector((store) => store.ingredients);
  // Создаем состояние current с начальным значением 'buns'
  const [current, setCurrent] = useState('buns');

  const { ref: bunsRef, inView: bunsInView } = useInView({ threshold: 0.25 });
  const { ref: saucesRef, inView: saucesInView } = useInView({ threshold: 0.25 });
  const { ref: mainRef, inView: mainInView } = useInView({ threshold: 0.25 });

  useEffect(() => {
    if (bunsInView) {
      setCurrent('buns');
    } else if (saucesInView) {
      setCurrent('sauces');
    } else if (mainInView) {
      setCurrent('main');
    }
  }, [bunsInView, saucesInView, mainInView]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  const openModal = (ingredient) => {
    setSelectedIngredient(ingredient);
    setIsModalOpen(true);
  };

  // Фильтруем массив и выбираем булочки
  const buns = ingredients.filter((item) => item.type === 'bun');
  // Фильтруем массив и выбираем соусы
  const sauces = ingredients.filter((item) => item.type === 'sauce');
  // Фильтруем массив и выбираем начинки
  const main = ingredients.filter((item) => item.type === 'main');

  return (
    <section className={styles.burgerIngredients}>
      <h1 className="text text_type_main-large mb-5">Соберите бургер </h1>
      <div className={styles.burgerTabs}>
        <Tab value="buns" active={current === 'buns'}>
          Булки
        </Tab>
        <Tab value="sauces" active={current === 'sauces'}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'}>
          Начинки
        </Tab>
      </div>
      <div className={styles.customScroll}>
        <h2 className="text text_type_main-medium pt-10 pb-6">Булки</h2>
        <Ingredients openModal={openModal} ingredientsList={buns} ref={bunsRef} />
        <h2 className="text text_type_main-medium pt-10 pb-6">Соусы</h2>
        <Ingredients openModal={openModal} ingredientsList={sauces} ref={saucesRef} />
        <h2 className="text text_type_main-medium pt-10 pb-6" >Начинки</h2>
        <Ingredients openModal={openModal} ingredientsList={main} ref={mainRef} />
      </div>
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <IngredientDetails ingredient={selectedIngredient} />
      </Modal>
    </section>
  );
};

export { BurgerIngredients };
