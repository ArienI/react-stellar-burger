import React from 'react';
import styles from '../Modal/Modal.module.css';
import imageDelete from '../../images/delete24x24.svg';

function ModalCard({ show, onClose, children }) {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.modal}>

      <div className={styles.content}>
        {children}
        <div className={styles.close}>
          <button onClick={onClose} className={styles.closeButton}>
            <img src={imageDelete} className={styles.closeImage} alt='закрыть' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCard;
