import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

interface MenuItem {
  label: string;
  to: string;
  icon: string;
  badge?: string;
}

const Navigation: React.FC = () => {
  const menuItems: MenuItem[] = [
    { 
      label: 'Trang Chủ',
      to: '/home',
      icon: '🏠'
    },
    { 
      label: 'Tin Tức',
      to: '/news',
      icon: '📰',
      badge: 'New'
    },
    { 
      label: 'Tải Game',
      to: '/download',
      icon: '⬇️'
    },
    { 
      label: 'Giftcode',
      to: '/giftcode',
      icon: '🎁',
      badge: 'Hot'
    },
    { 
      label: 'Nạp Ngọc',
      to: '/recharge',
      icon: '💎'
    },
    { 
      label: 'Xếp Hạng',
      to: '/ranking',
      icon: '🏆'
    },
    { 
      label: 'Cộng Đồng',
      to: '/community',
      icon: '👥'
    },
    { 
      label: 'Hỗ Trợ',
      to: '/support',
      icon: '❓'
    }
  ];

  return (
    <nav className={styles.navigation}>
      <div className={styles.menuGrid}>
        {menuItems.map((item, index) => (
          <div key={index} className={styles.menuItem}>
            <NavLink
              to={item.to}
              className={({ isActive }) => 
                `${styles.menuLink} ${isActive ? styles.active : ''}`
              }
            >
              <span className={styles.menuIcon}>{item.icon}</span>
              <span className={styles.menuLabel}>{item.label}</span>
              {item.badge && (
                <span className={styles.menuBadge}>{item.badge}</span>
              )}
            </NavLink>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navigation; 