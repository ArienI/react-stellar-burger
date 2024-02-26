import styles from './pages.module.css';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { closeWS, openWS } from '../services/actions/websocketActions';
import { WS_ORDERS } from '../utils/const';
import { useEffect } from 'react';
import { LoadingIndicator } from './LoadingIndicator';

function Feed(): React.ReactElement {
  const dispatch = useAppDispatch();
  const socketMessage = useAppSelector((state) => state.websocket.message);

  useEffect(() => {
    dispatch(openWS(`${WS_ORDERS}/all`));
    return () => {
      dispatch(closeWS());
    };
  }, [dispatch]);

  if (!socketMessage.success) {
    return <LoadingIndicator />;
  }

  return (
    <div className={styles.center}>
      <h1>IT WORKS!</h1>
    </div >
  );
};

export { Feed };