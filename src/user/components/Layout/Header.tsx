import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../../assets/images/logo.png';
import { useAuth } from '../../../contexts/AuthContext';
import {
  FaSignInAlt,
  FaUserPlus,
  FaUser,
  FaSignOutAlt,
  FaUserCog,
  FaBell,
} from 'react-icons/fa';
import { encodeId } from '../../utils/encodeId';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isAccountPage = location.pathname.startsWith('/account/');
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

  const handleLogout = () => {
    logout();
    navigate('/home');
  };

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
                    to={`/account/${encodeId(user.id)}`}
                    className={styles.actionButton}
                    title="Quản lý tài khoản"
                  >
                    <FaUserCog />
                  </Link>
                )}
                <button
                  className={styles.actionButton}
                  onClick={handleLogout}
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
                onClick={() => window.openLoginModal && window.openLoginModal()}
              >
                <FaSignInAlt />
                <span>Đăng nhập</span>
              </button>
              <button
                className={`${styles.authButton} ${styles.registerButton}`}
                onClick={() => window.openRegisterModal && window.openRegisterModal()}
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