import React, { useState } from 'react';
import styles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Buns from './Ingredients/Buns/Buns';
import Sauces from './Ingredients/Sauces/Sauces';
import ModalCard from '../Modal/ModalCard';
import IngredientInfo from '../Modal/IngredientInfo/IngredientInfo';

const BurgerIngredients = () => {
  // Создаем состояние current с начальным значением 'one'
  const [current, setCurrent] = useState('one');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  const openModal = (ingredient) => {
    setSelectedIngredient(ingredient);
    setIsModalOpen(true);
  };

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
        <Buns openModal={openModal} />

        <h2>Соусы</h2>
        <Sauces openModal={openModal} />
      </div>
      <ModalCard show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <IngredientInfo ingredient={selectedIngredient} />
      </ModalCard>
    </section>
  );
};

export default BurgerIngredients;
