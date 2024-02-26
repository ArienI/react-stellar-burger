import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import styles from './pages.module.css';
import { NavLink } from 'react-router-dom';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { logout, updateUser } from '../services/actions/authenticationActions';
import { LoadingIndicator } from './LoadingIndicator';
import { useAppDispatch, useAppSelector } from '../utils/hooks';

function Profile(): React.ReactElement {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.authentication.user);
  const [activateButtons, setActivateButtons] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  function onEmailChange(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
    setActivateButtons(true);
  };

  function onNameChange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
    setActivateButtons(true);
  };

  function onPasswordChange(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
    setActivateButtons(true);
  };

  function onLogout() {
    dispatch(logout());
  };

  function onResetForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setActivateButtons(false);
    if (userData) {
      setName(userData.name || '');
      setEmail(userData.email || '');
      setPassword('');
    }
  }

  function onSubmitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setActivateButtons(false);
    dispatch(updateUser({ name, email }));
  }

  useEffect(() => {
    setEmail(userData.email || '');
    setName(userData.name || '');
  }, [userData]);

  if (!userData || userData.email === null || userData.name === null) {
    return (<LoadingIndicator />);
  }

  return (
    <div className={styles.center}>
      <div className={styles.grid}>
        <nav className={`${styles.profileMenu} mr-15 mt-5`}>
          <NavLink
            to='/profile'
            className={({ isActive }) =>
              `${styles.profileLink} text text_type_main-medium ${isActive ? 'text_color_primary' : 'text_color_inactive'}`
            }
          >
            Профиль
          </NavLink>
          <NavLink
            to='/history'
            className={({ isActive }) =>
              `${styles.profileLink} text text_type_main-medium ${isActive ? 'text_color_primary' : 'text_color_inactive'}`
            }
          >
            История заказов
          </NavLink>
          <div
            className={`${styles.profileLink} text text_type_main-medium text_color_inactive`}
            onClick={onLogout}
          >
            Выход
          </div>
          <p className={` ${styles.menuDescription} text text_type_main-default text_color_inactive mt-8`}>В этом разделе вы можете изменить свои персональные данные</p>
        </nav>
        <form className={`${styles.form}`} onSubmit={onSubmitForm} onReset={onResetForm}>
          <Input
            onChange={onNameChange}
            value={name}
            name={'name'}
            placeholder="Имя"
            icon="EditIcon"
          />
          <EmailInput
            onChange={onEmailChange}
            value={email}
            name={'email'}
            placeholder="Логин"
            isIcon={true}
          />
          <PasswordInput
            onChange={onPasswordChange}
            value={password}
            name={'password'}
          />
          <div>
            <Button
              htmlType="reset"
              type="secondary"
              disabled={!activateButtons}
            >
              Отмена
            </Button>
            <Button
              htmlType="submit"
              type="primary"
              disabled={!activateButtons}
            >
              Сохранить
            </Button>
          </div>
        </form>
      </div>
    </div >
  );
};

export { Profile };
