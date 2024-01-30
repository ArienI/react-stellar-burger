import { useEffect, useState } from 'react';
import styles from './pages.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { logout } from '../services/actions/authenticationActions';

function Profile() {
  const userData = useSelector((state) => state.authentication.user);
  const [activateButtons, setActivateButtons] = useState('');
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (Object.keys(userData).length === 0) {
      return null
    } else {
      setEmail(userData.email);
      setName(userData.name);
    }
  }, [dispatch, userData]);

  function onEmailChange(e) {
    setEmail(e.target.value);
    setActivateButtons(true);
  };

  function onNameChange(e) {
    setName(e.target.value);
    setActivateButtons(true);
  };

  function onPasswordChange(e) {
    setPassword(e.target.value);
    setActivateButtons(true);
  };

  function onLogout() {
    dispatch(logout());
  };

  function onResetForm(event) {
    event.preventDefault();
    setActivateButtons(false);
    if (userData) {
      setName(userData.name);
      setEmail(userData.email);
      setPassword('');
    }
  }

  function onSubmitForm(event) {
    event.preventDefault();
    setActivateButtons(false);
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
          <NavLink
            className={`${styles.profileLink} text text_type_main-medium text_color_inactive`}
            onClick={onLogout}
          >
            Выход
          </NavLink>
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

export default Profile;
