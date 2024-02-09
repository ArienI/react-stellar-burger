import styles from '../ModalOverlay/ModalOverlay.module.css';

interface ModalOverlayProps {
  onClose: () => void;
}

function ModalOverlay({ onClose }: ModalOverlayProps): React.ReactElement {
  return (
    <div className={styles.modalOverlay} onClick={() => onClose()}></div>
  );
}

export { ModalOverlay };