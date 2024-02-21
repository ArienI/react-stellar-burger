import styles from './pages.module.css';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { requestPasswordReset } from '../services/actions/authenticationActions';

function ForgotPassword(): React.ReactElement {
  const dispatch = useDispatch();
  const passwordResetCodeSent = useSelector((state: any) => state.authentication.passwordResetCodeSent);
  const [email, setEmail] = useState('');

  function onEmailChange(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  };

  function onSubmitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // @ts-ignore
    dispatch(requestPasswordReset({ email }));
  };

  if (passwordResetCodeSent) {
    return (
      <Navigate
        to="/reset-password"
        state={{ previousPage: 'forgot-password' }}
        replace={true}
      />
    );
  }

  return (
    <div className={styles.center}>
      <form className={`${styles.form} mb-20`} onSubmit={onSubmitForm}>
        <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
        <EmailInput
          onChange={onEmailChange}
          value={email}
          name={'email'}
          placeholder="Укажите e-mail"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
        >
          Восстановить
        </Button>
      </form>
      <p className='text text_type_main-default text_color_inactive'>
        Вспомнили пароль?
        <Link to="/login" className={`${styles.link} text_color_accent`}> Войти</Link>
      </p>
    </div>
  );
};

export { ForgotPassword };