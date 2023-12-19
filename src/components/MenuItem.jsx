import React from 'react';
import styles from './MenuItem.module.css';

const MenuItem = ({ icon: Icon, text, isActive }) => {
  // стили для активного состояния
  const activeStyle = isActive ? styles.active : '';

  return (
    <div className={`${styles.menuItem} ${activeStyle}`}>
      <Icon type={isActive ? 'primary' : 'secondary'} />
      <span>{text}</span>
    </div>
  );
};

export default MenuItem;
