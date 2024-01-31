import styles from './App.module.css';
import { AppHeader } from '../AppHeader/AppHeader';
import { Main } from '../Main/Main';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Login } from '../../pages/Login';
import { Registration } from '../../pages/Registration';
import { ForgotPassword } from '../../pages/ForgotPassword';
import { ResetPassword } from '../../pages/ResetPassword';
import { Profile } from '../../pages/Profile';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <div className={styles.app}>
      <HashRouter>
        <AppHeader />
        <Routes>
          <Route
            index
            element={
              <ProtectedRoute justRefreshTokens>
                <Main />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedRoute redirectToHomeIfLoggedIn>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute redirectToHomeIfLoggedIn>
                <Registration />
              </ProtectedRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <ProtectedRoute redirectToHomeIfLoggedIn>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reset-password"
            element={
              <ProtectedRoute redirectToHomeIfLoggedIn>
                <ResetPassword />
              </ProtectedRoute>
            }
          />
        </Routes>
      </HashRouter>
    </div>
  );
}

export { App };