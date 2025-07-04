import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../../assets/images/logo.png';
import { useAuth } from '../../contexts/AuthContext';
import { 
  FaSignInAlt, 
  FaUserPlus, 
  FaDownload, 
  FaUser, 
  FaSignOutAlt, 
  FaUserCog,
  FaGem,
  FaBell
} from 'react-icons/fa';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const isAccountPage = location.pathname === '/account';
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    {
      id: 1,
      type: 'system',
      message: 'Chào mừng bạn đến với HSONEW!',
      time: '1 phút trước'
    },
    {
      id: 2,
      type: 'event',
      message: 'Sự kiện mới: Săn Boss Cuối Tuần',
      time: '5 phút trước'
    },
    {
      id: 3,
      type: 'gift',
      message: 'Bạn nhận được Giftcode mới',
      time: '15 phút trước'
    }
  ];

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logoSection}>
          <Link to="/" className={styles.logoLink}>
            <img src={logo} alt="HSONEW Logo" className={styles.logo} />
            <div className={styles.logoText}>
              <h1>HSONEW</h1>
              <span>Huyền Thoại Tân Hiệp Sĩ</span>
            </div>
          </Link>
        </div>

        <div className={styles.headerActions}>
          {user ? (
            <div className={styles.userSection}>
              <div className={styles.notificationArea}>
                <button 
                  className={styles.notificationButton}
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <FaBell />
                  <span className={styles.notificationBadge}>3</span>
                </button>
                {showNotifications && (
                  <div className={styles.notificationDropdown}>
                    <h3>Thông Báo</h3>
                    {notifications.map(notification => (
                      <div key={notification.id} className={styles.notificationItem}>
                        <p>{notification.message}</p>
                        <span>{notification.time}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className={styles.userInfo}>
                <div className={styles.userAvatar}>
                  <FaUser />
                </div>
                <div className={styles.userDetails}>
                  <span className={styles.username}>{user.username}</span>
                </div>
              </div>

              <div className={styles.userActions}>
                {!isAccountPage && (
                  <Link 
                    to="/account" 
                    className={styles.actionButton}
                    title="Quản lý tài khoản"
                  >
                    <FaUserCog />
                  </Link>
                )}
                <button
                  className={styles.actionButton}
                  onClick={logout}
                  title="Đăng xuất"
                >
                  <FaSignOutAlt />
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.authSection}>
              <button 
                className={`${styles.authButton} ${styles.loginButton}`}
                data-bs-toggle="modal" 
                data-bs-target="#login-modal"
              >
                <FaSignInAlt />
                <span>Đăng nhập</span>
              </button>
              <button 
                className={`${styles.authButton} ${styles.registerButton}`}
                data-bs-toggle="modal" 
                data-bs-target="#register-modal"
              >
                <FaUserPlus />
                <span>Đăng ký</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 