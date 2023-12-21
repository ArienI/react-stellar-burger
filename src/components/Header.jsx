import React from 'react';
import styles from './Header.module.css';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import MenuItem from './MenuItem';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <div className={styles.navigation}>
          <MenuItem icon={BurgerIcon} text="Конструктор" isActive={true} />
          <MenuItem icon={ListIcon} text="Лента заказов" isActive={false} />
        </div>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.profile}>
          <MenuItem icon={ProfileIcon} text="Личный кабинет" isActive={false} />
        </div>
      </div>
    </header>
  );
}

export default Header;
