import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation: React.FC = () => {
  const menuItems = [
    { label: 'Trang chủ', to: '/trangchu' },
    { label: 'Giftcode', to: '/recharge/tt' },
    { label: 'Nạp Ngọc', to: '/recharge' },
    { label: 'Box Zalo', to: '/community' },
  ];

  return (
    <nav className={styles.navigation}>
      <div className={styles.menuGrid}>
        {menuItems.map((item, index) => (
          <div key={index} className={styles.menuItem}>
            <NavLink
              to={item.to}
              className={({ isActive }) => `${styles.menuLink} ${isActive ? styles.active : ''}`}
            // data-bs-toggle={item.requiresAuth ? 'modal' : undefined}
            // data-bs-target={item.requiresAuth ? '#login-modal' : undefined}
            >
              {item.label}
            </NavLink>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navigation; 