import styles from '../Modal/Modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { createPortal } from 'react-dom';
import { ModalOverlay } from './ModalOverlay/ModalOverlay';
import { useEffect } from 'react';

const modalDOM = document.getElementById('modal') as HTMLElement;

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

// { onClose, children } - два пропса:
// onClose - функция закрыть модальное окно
// children - специальный пропс, включает в себя все элементы, которые внутри JSX тегов компонента Modal
function Modal({ children, onClose }: ModalProps): React.ReactElement {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
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

export { Modal };