import styles from './pages.module.css';
import { Button, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { resetPassword } from '../services/actions/authenticationActions';
import { useAppDispatch, useAppSelector } from '../utils/hooks';

function ResetPassword(): React.ReactElement {
  const dispatch = useAppDispatch();
  const location = useLocation();
  // проверяем что пользователь пришёл со страницы 'forgot-password'
  const validPreviousPage = location.state?.previousPage === 'forgot-password';
  const passwordReset = useAppSelector((state) => state.authentication.passwordReset);
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');

  function onPasswordChange(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  };

  function onTokenChange(event: ChangeEvent<HTMLInputElement>) {
    setToken(event.target.value);
  };

  function onSubmitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(resetPassword({ password, token }));
  };

  // если пользователь пришёл не со страницы 'forgot-password', то перенаправляем его туда
  if (!validPreviousPage) {
    return (
      <Navigate
        to="/forgot-password"
        replace={true}
      />
    );
  }

  if (passwordReset) {
    return (
      <Navigate
        to="/login"
        replace={true}
      />
    );
  }

  return (
    <div className={styles.center}>
      <form className={`${styles.form} mb-20`} onSubmit={onSubmitForm}>
        <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
        <PasswordInput
          onChange={onPasswordChange}
          value={password}
          name={'password'}
          placeholder='Введите новый пароль'
        />
        <Input
          onChange={onTokenChange}
          value={token}
          name={'token'}
          placeholder='Введите код из письма'
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
        >
          Сохранить
        </Button>
      </form>
      <p className='text text_type_main-default text_color_inactive'>
        Вспомнили пароль?
        <Link to="/forgot-password" className={`${styles.link} text_color_accent`}> Войти</Link>
      </p>
    </div>
  );
};

export { ResetPassword };