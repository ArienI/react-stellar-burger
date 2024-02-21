import { useEffect, useState } from 'react';
import styles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredients } from './Ingredients/Ingredients';
import { Modal } from '../Modal/Modal';
import { IngredientDetails } from './IngredientDetails/IngredientDetails';
import { useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import { TIngredient } from '../../utils/types';

function BurgerIngredients(): React.ReactElement {
  const navigate = useNavigate();
  const ingredients = useSelector((store: any) => store.ingredients);
  // Создаем состояние current с начальным значением 'buns'
  const [activeTab, setActiveTab] = useState('buns');
  const [showPopup, setShowPopup] = useState(false);

  const { ref: bunsRef, inView: bunsInView } = useInView({ threshold: 0.25 });
  const { ref: saucesRef, inView: saucesInView } = useInView({ threshold: 0.25 });
  const { ref: mainRef, inView: mainInView } = useInView({ threshold: 0.25 });

  // Фильтруем массив и выбираем булочки
  const buns = ingredients.filter((item: TIngredient) => item.type === 'bun');
  // Фильтруем массив и выбираем соусы
  const sauces = ingredients.filter((item: TIngredient) => item.type === 'sauce');
  // Фильтруем массив и выбираем начинки
  const main = ingredients.filter((item: TIngredient) => item.type === 'main');

  function openPopup(ingredient: TIngredient) {
    setShowPopup(true);
    navigate(
      `/ingredients/${ingredient._id}`,
      {
        state: { ingredientPopupOpened: true }
      }
    );
  };

  function closePopup() {
    setShowPopup(false);
    // Возвращаемся на предыдущий маршрут
    navigate(-1);
  };

  useEffect(() => {
    if (bunsInView) {
      setActiveTab('buns');
    } else if (saucesInView) {
      setActiveTab('sauces');
    } else if (mainInView) {
      setActiveTab('main');
    }
  }, [bunsInView, saucesInView, mainInView]);

  return (
    <section className={styles.burgerIngredients}>
      <h1 className="text text_type_main-large mb-5">Соберите бургер </h1>
      <div className={styles.burgerTabs}>
        <Tab value="buns" active={activeTab === 'buns'} onClick={() => setActiveTab('buns')}>
          Булки
        </Tab>
        <Tab value="sauces" active={activeTab === 'sauces'} onClick={() => setActiveTab('sauces')}>
          Соусы
        </Tab>
        <Tab value="main" active={activeTab === 'main'} onClick={() => setActiveTab('main')}>
          Начинки
        </Tab>
      </div>
      <div className={styles.customScroll}>
        <h2 className="text text_type_main-medium pt-10 pb-6">Булки</h2>
        <Ingredients openPopup={openPopup} ingredientsList={buns} ref={bunsRef} />
        <h2 className="text text_type_main-medium pt-10 pb-6">Соусы</h2>
        <Ingredients openPopup={openPopup} ingredientsList={sauces} ref={saucesRef} />
        <h2 className="text text_type_main-medium pt-10 pb-6" >Начинки</h2>
        <Ingredients openPopup={openPopup} ingredientsList={main} ref={mainRef} />
      </div>
      {
        showPopup && (
          <Modal onClose={closePopup}>
            <IngredientDetails />
          </Modal>
        )
      }
    </section >
  );
};

export { BurgerIngredients };
