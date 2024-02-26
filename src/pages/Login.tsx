import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './pages.module.css';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { login, setPasswordReset, setPasswordResetCodeSent } from '../services/actions/authenticationActions';
import { useAppDispatch } from '../utils/hooks';

function Login(): React.ReactElement {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function onEmailChange(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  };

  function onPasswordChange(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  };

  function onSubmitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(login({ email, password }));
  };

  // если восстанавливали пароль, сбрасываем состояние
  dispatch(setPasswordResetCodeSent(false));
  dispatch(setPasswordReset(false));

  return (
    <div className={styles.center}>
      <form className={`${styles.form} mb-20`} onSubmit={onSubmitForm}>
        <h1 className='text text_type_main-medium'>Вход</h1>
        <EmailInput
          onChange={onEmailChange}
          value={email}
          name={'email'}
        />
        <PasswordInput
          onChange={onPasswordChange}
          value={password}
          name={'password'}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
        >
          Войти
        </Button>
      </form>
      <p className='text text_type_main-default text_color_inactive mb-4'>
        Вы — новый пользователь?
        <Link to="/register" className={`${styles.link} text_color_accent`}> Зарегистрироваться</Link>
      </p>
      <p className='text text_type_main-default text_color_inactive'>
        Забыли пароль?
        <Link to="/forgot-password" className={`${styles.link} text_color_accent`}> Восстановить пароль</Link>
      </p>
    </div >
  );
};

export { Login };