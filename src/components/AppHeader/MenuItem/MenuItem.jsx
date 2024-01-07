import styles from './MenuItem.module.css';
import PropTypes from 'prop-types';

function MenuItem({ icon: Icon, text, isActive }) {
  // стили для активного состояния
  const inactiveStyle = isActive ? '' : styles.inactive;

  return (
    <div className={`${styles.menuItem} ${inactiveStyle} pt-4 pb-4 pl-5 pr-5`}>
      <Icon type={isActive ? 'primary' : 'secondary'} />
      <span className="text text_type_main-default">{text}</span>
    </div>
  );
};

MenuItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  text: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired
};

export { MenuItem };
