import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Navigation.module.css';

const Navigation: React.FC = () => {
  const { user } = useAuth();
  
  const menuItems = [
    { label: 'Trang chủ', to: '/trangchu' },
    { label: 'Giftcode', to: '/recharge/tt', requiresAuth: true },
    { label: 'Nạp Ngọc', to: '/recharge', requiresAuth: true},
    { label: 'Box Zalo', to: '/community' },
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, item: any) => {
    // Nếu cần authentication nhưng user chưa đăng nhập
    if (item.requiresAuth && !user) {
      e.preventDefault(); // Ngăn navigation
      // Trigger modal đăng nhập
      const loginModal = document.getElementById('login-modal');
      if (loginModal && (window as any).bootstrap && (window as any).bootstrap.Modal) {
        const bsModal = new (window as any).bootstrap.Modal(loginModal);
        bsModal.show();
      }
    }
    // Nếu đã đăng nhập hoặc không cần auth, cho phép navigation bình thường
  };

  return (
    <nav className={styles.navigation}>
      <div className={styles.menuGrid}>
        {menuItems.map((item, index) => (
          <div key={index} className={styles.menuItem}>
            <NavLink
              to={item.to}
              className={({ isActive }) => `${styles.menuLink} ${isActive ? styles.active : ''}`}
              onClick={(e) => handleClick(e, item)}
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