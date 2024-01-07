import { useState } from 'react';
import styles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredients } from './Ingredients/Ingredients';
import { Modal } from '../Modal/Modal';
import { IngredientDetails } from './IngredientDetails/IngredientDetails';
import PropTypes from 'prop-types';

function BurgerIngredients({ ingredients }) {
  // Создаем состояние current с начальным значением 'one'
  const [current, setCurrent] = useState('one');

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
      <div style={{ display: 'flex' }}>
        <Tab value="one" active={current === 'one'} onClick={() => setCurrent('one')}>
          Булки
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={() => setCurrent('two')}>
          Соусы
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={() => setCurrent('three')}>
          Начинки
        </Tab>
      </div>
      <div className={styles.customScroll}>
        <h2 className="text text_type_main-medium pt-10 pb-6">Булки</h2>
        <Ingredients openModal={openModal} ingredientsList={buns} />
        <h2 className="text text_type_main-medium pt-10 pb-6">Соусы</h2>
        <Ingredients openModal={openModal} ingredientsList={sauces} />
        <h2 className="text text_type_main-medium pt-10 pb-6">Начинки</h2>
        <Ingredients openModal={openModal} ingredientsList={main} />
      </div>
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <IngredientDetails ingredient={selectedIngredient} />
      </Modal>
    </section>
  );
};

BurgerIngredients.propTypes = {
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

export { BurgerIngredients };
