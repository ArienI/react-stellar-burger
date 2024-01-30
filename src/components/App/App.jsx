import styles from './App.module.css';
import { AppHeader } from '../AppHeader/AppHeader';
import { Main } from '../Main/Main';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Login } from '../../pages/Login/Login';
import Registration from '../../pages/Registration/Registration';
import ForgotPassword from '../../pages/ForgotPassword/ForgotPassword';
import ResetPassword from '../../pages/ResetPassword/ResetPassword';

function App() {
  return (
    <div className={styles.app}>
      <HashRouter>
        <AppHeader />
        <Routes>
          <Route index element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;