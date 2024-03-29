import styles from './pages.module.css';

function LoadingIndicator(): React.ReactElement {
  return (
    <div className={styles.center}>
      <h1 className='text text_type_main-large'>
        Подождите...
      </h1>
    </div >
  );
};

export { LoadingIndicator }