import React from 'react';
import styles from './SignIn.module.css';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

const SignIn = () => {
  return (
    <div className={styles.center}>
      <div className={styles.signIn}>
        <form className={styles.form}>
          <h1 className='text_type_main-medium'>Вход</h1>
          <EmailInput></EmailInput>
          <PasswordInput></PasswordInput>
          <Button htmlType="button" type="primary" size="small" extraClass="ml-2"> Войти</Button>
        </form>
        <ul className={styles.link}>
          <li className={styles.item}><p className='text text_type_main-default text_color'>Вы — новый пользователь?</p><a className='text text_type_main-default' href='#'>Зарегистрироваться</a></li>
          <li className={styles.item}><p className='text text_type_main-default text_color'>Забыли пароль?</p><a className='text text_type_main-default' href='#'>Восстановить пароль</a></li>
        </ul>
      </div>
    </div>
  );
};

export default SignIn;