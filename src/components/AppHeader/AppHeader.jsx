import styles from './AppHeader.module.css';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { MenuItem } from './MenuItem/MenuItem';

function AppHeader() {
  return (
    <header className={`${styles.header} m-10`}>
      <div className={`${styles.content} mt-4 mb-4`}>
        <nav className={styles.navigation}>
          <MenuItem icon={BurgerIcon} text="Конструктор" isActive={true} />
          <MenuItem icon={ListIcon} text="Лента заказов" isActive={false} />
        </nav>
        <Logo />
        <MenuItem icon={ProfileIcon} text="Личный кабинет" isActive={false} />
      </div>
    </header>
  );
}

export { AppHeader };