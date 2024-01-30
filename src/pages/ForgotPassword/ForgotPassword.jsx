import styles from './ForgotPassword.module.css';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  function onEmailChange(event) {
    setEmail(event.target.value);
  };

  function onSubmitForm(event) {
    event.preventDefault();
  };

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

export default ForgotPassword;