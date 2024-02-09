import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './MenuLink.module.css';

function MenuLink({ icon: Icon, text, to }) {
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

MenuLink.propTypes = {
  icon: PropTypes.elementType.isRequired,
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
};

export { MenuLink };
