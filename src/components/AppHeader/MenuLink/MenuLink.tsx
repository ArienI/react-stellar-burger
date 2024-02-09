import { NavLink } from 'react-router-dom';
import styles from './MenuLink.module.css';

type MenuLinkProps = {
  icon: React.ComponentType<{ type: 'primary' | 'secondary' }>;
  text: string;
  to: string;
};

function MenuLink({ icon: Icon, text, to }: MenuLinkProps): React.ReactElement {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${styles.menuLink} pt-4 pb-4 pl-5 pr-5 ${isActive ? '' : styles.inactive}`
      }
    >
      {/* Магия чтобы получить состояние isActive из NavLink */}
      {({ isActive }) => (
        <>
          <Icon type={isActive ? 'primary' : 'secondary'} />
          <span className="text text_type_main-default">{text}</span>
        </>
      )}
    </NavLink>
  );
}

export { MenuLink };
