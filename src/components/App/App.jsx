import styles from './App.module.css';
import { AppHeader } from '../AppHeader/AppHeader';
import { Main } from '../Main/Main';
import SignIn from '../../pages/SignIn/SignIn';

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      {/* <Main /> */}
      <SignIn />
    </div>
  );
}

export default App;