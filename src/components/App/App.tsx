import styles from './App.module.css';
import { AppHeader } from '../AppHeader/AppHeader';
import { Main } from '../Main/Main';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Login } from '../../pages/Login';
import { Registration } from '../../pages/Registration';
import { ForgotPassword } from '../../pages/ForgotPassword';
import { ResetPassword } from '../../pages/ResetPassword';
import { Profile } from '../../pages/Profile';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { useEffect } from 'react';
import { IngredientDetails } from '../BurgerIngredients/IngredientDetails/IngredientDetails';
import { getIngredients } from '../../services/actions/ingredientsActions';
import { useAppDispatch } from '../../utils/hooks';
import { Feed } from '../../pages/Feed/Feed';
import { ProfileOrders } from '../../pages/ProfileOrders';

function App(): React.ReactElement {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // Проверяем флаг "location.state.ingredientPopupOpened"
  // Флаг используется для определения, отображать ли попап ингредиента на главной странице <Main /> или отдельную страницу <IngredientDetails />
  // Если пользователь кликнул на ингредиент, "ingredientPopupOpened" устанавливается в "true"
  //
  // Если флаг "false" или страница была обновлена, и мы находимся по маршруту "/ingredients/:id", то рендерим <IngredientDetails />
  // Если флаг "true" и мы находимся по маршруту "/ingredients/:id", то рендерим попап ингредиента в <Main />
  const isPopupOpened = location.state?.ingredientPopupOpened

  // Этот эффект выполнится только один раз при монтировании компонента, то есть когда страницы была обновлена
  useEffect(() => {
    dispatch(getIngredients());
    // Если "isPopupOpened" "true" и страница была обновлена (пользователь вручную ввёл маршрут "/ingredients/:id" или нажал F5, находясь на маршруте "/ingredients/:id")
    if (isPopupOpened) {
      // тогда мы выставляем "location.state.ingredientPopupOpened" в "false" и обновляем страницу
      // это приведёт к тому, что при перезагрузке страницы "isPopupOpened" станет "false" и мы отрендерим <IngredientDetails />
      navigate(
        location.pathname,
        {
          state: { ingredientPopupOpened: false },
          replace: true
        }
      );
    }
  }, []);

  return (
    <div className={styles.app}>
      <>
        <AppHeader />
        <Routes>
          <Route
            index
            element={
              <Main />
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
            path="/profile/orders"
            element={
              <ProtectedRoute>
                <ProfileOrders />
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
          <Route
            path="/ingredients/:id"
            element={
              isPopupOpened ?
                <Main /> :
                <div className="mt-30">
                  <IngredientDetails />
                </div>
            }
          />
          <Route
            path="/feed"
            element={
              <Feed />
            }
          />
        </Routes>
      </>
    </div>
  );
}

export { App };