import React from 'react';
import styles from '../Modal/Modal.module.css';
import imageDelete from '../../images/delete24x24.svg';


// { show, onClose, children } - три пропса:   show- (true или false)указывает, должен ли компонент ModalCard отображаться; onClose-  функция закрыть модальное окно;  children- специальный пропс включает в себя все элементы, которые внутри JSX тегов компонента ModalCard
function ModalCard({ show, onClose, children }) {
  // проверяем значение пропса show.Если show равно false, функция возвращает null, что означает, что React не будет рендерить ничего в DOM для этого компонента.Это обычный способ скрыть компонент без удаления его из дерева компонентов.
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
