import styles from '../Modal/Modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { createPortal } from 'react-dom';
import { ModalOverlay } from './ModalOverlay/ModalOverlay';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const modalDOM = document.getElementById('modal');

// { show, onClose, children } - три пропса:   show- (true или false)указывает, должен ли компонент Modal отображаться; onClose-  функция закрыть модальное окно;  children- специальный пропс включает в себя все элементы, которые внутри JSX тегов компонента Modal
function Modal({ onClose, children }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    (
      <>
        <ModalOverlay onClose={onClose} />
        <div className={styles.modal}>
          <div className={styles.content}>
            {children}
            <button className={styles.closeButton} onClick={onClose}>
              <CloseIcon type="primary" />
            </button>
          </div>
        </div>
      </>
    ), modalDOM
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired
};

export { Modal };