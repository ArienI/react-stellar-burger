import styles from '../Modal/Modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { createPortal } from 'react-dom';
import { ModalOverlay } from './ModalOverlay/ModalOverlay';
import PropTypes from 'prop-types';

const modalDOM = document.getElementById('modal');

// { show, onClose, children } - три пропса:   show- (true или false)указывает, должен ли компонент Modal отображаться; onClose-  функция закрыть модальное окно;  children- специальный пропс включает в себя все элементы, которые внутри JSX тегов компонента Modal
function Modal({ show, onClose, children }) {
  // проверяем значение пропса show.Если show равно false, функция возвращает null, что означает, что React не будет рендерить ничего в DOM для этого компонента.Это обычный способ скрыть компонент без удаления его из дерева компонентов.
  if (!show) {
    return null;
  }

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
  show: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired
};

export { Modal };