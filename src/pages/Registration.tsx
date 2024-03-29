import styles from './pages.module.css';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { registerNewUser } from '../services/actions/authenticationActions';
import { useAppDispatch } from '../utils/hooks';

function Registration(): React.ReactElement {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function onNameChange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  };

  function onEmailChange(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  };

  function onPasswordChange(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  };

  function onSubmitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(registerNewUser({ name, email, password }));
  };

  return (
    <div className={styles.center}>
      <form className={`${styles.form} mb-20`} onSubmit={onSubmitForm}>
        <h1 className='text text_type_main-medium'>Регистрация</h1>
        <Input
          onChange={onNameChange}
          value={name}
          name={'name'}
          placeholder='Имя'
        />
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
          Зарегистрироваться
        </Button>
      </form>
      <p className='text text_type_main-default text_color_inactive'>
        Уже зарегистрированы?
        <Link to="/login" className={`${styles.link} text_color_accent`}> Войти</Link>
      </p>
    </div>
  );
};

export { Registration };