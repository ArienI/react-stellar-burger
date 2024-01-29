import styles from './App.module.css';
import { AppHeader } from '../AppHeader/AppHeader';
import { Main } from '../Main/Main';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Login } from '../../pages/Login/Login';

function App() {
  return (
    <div className={styles.app}>
      <HashRouter>
        <AppHeader />
        <Routes>
          <Route index element={<Main />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;