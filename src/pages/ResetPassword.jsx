import styles from './pages.module.css';
import { Button, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function ResetPassword() {
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');

  function onPasswordChange(event) {
    setPassword(event.target.value);
  };

  function onCodeChange(event) {
    setCode(event.target.value);
  };

  function onSubmitForm(event) {
    event.preventDefault();
  };

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
          onChange={onCodeChange}
          value={code}
          name={'code'}
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

export default ResetPassword;