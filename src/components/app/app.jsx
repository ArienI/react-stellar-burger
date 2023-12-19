import styles from './App.module.css';
import { data } from '../../utils/data';
import Header from '../Header';

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <pre style={{
        margin: 'auto',
        fontSize: '1.5rem'
      }}>
         ...=^.^=❤meow❤=^.^=...
      </pre>
      <h1>hi</h1>
    </div>
  );
}

export default App;
