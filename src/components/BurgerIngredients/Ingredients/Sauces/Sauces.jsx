import React from 'react';
import styles from '../Ingredients.module.css';
import { data } from '../../../../utils/data';
import imageIcon from '../../../../images/icon 24x24.svg';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

// Фильтруем соусы из массива данных
const sauces = data.filter((item) => item.type === 'sauce');

const Sauces = ({ openModal }) => {
  return (
    <div className={styles.columns}>
      {sauces.map((sauce) => (
        <div key={sauce._id} className={styles.ingredientItem} onClick={() => openModal(sauce)}>
          <div className={styles.column}>
            <Counter />
            <img src={sauce.image} className={styles.image} alt={sauce.name} />
            <div className={styles.price}>
              <p className="text text_type_digits-default">30</p>
              <img src={imageIcon} alt='космокристалл' />
            </div>
            <p>{sauce.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

Sauces.propTypes = {
  openModal: PropTypes.func.isRequired
};

export default Sauces;
