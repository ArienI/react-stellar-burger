import styles from './AppHeader.module.css';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { MenuLink } from './MenuLink/MenuLink';
import { useSelector } from 'react-redux';

function AppHeader() {
  const userEmail = useSelector((state) => state.authentication.user.email);

  return (
    <header className={`${styles.header} m-10`}>
      <div className={`${styles.content} mt-4 mb-4`}>
        <nav className={styles.navigation}>
          <MenuLink icon={BurgerIcon} text="Конструктор" to="/" />
          <MenuLink icon={ListIcon} text="Лента заказов" to="/orders" />
        </nav>
        <Logo />
        <MenuLink icon={ProfileIcon} text={userEmail ? userEmail : "Личный кабинет"} to="/profile" />
      </div>
    </header>
  );
}

export { AppHeader };
