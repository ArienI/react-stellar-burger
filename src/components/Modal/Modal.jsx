import React from 'react';
import Card from './Card/Card';
import styles from '../Modal/Modal.module.css';
import IngredientInfo from './IngredientInfo/IngredientInfo';

const Modal = () => {
  return (
    <div className={styles.modal}>
      <Card />
      <IngredientInfo />
    </div>
  );
};

export default Modal;
