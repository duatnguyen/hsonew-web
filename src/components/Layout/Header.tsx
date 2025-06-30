import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../../assets/images/logo.png';
import { useAuth } from '../../contexts/AuthContext';
import { FaSignInAlt, FaUserPlus, FaDownload, FaUser, FaSignOutAlt, FaUserCog } from 'react-icons/fa';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const isAccountPage = location.pathname === '/account';

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Logo" className={styles.logo} />
      </div>
      
      <div className={styles.buttonGroup}>
        {!user ? (
          <div className={styles.authButtons}>
            <button className={styles.authButton} data-bs-toggle="modal" data-bs-target="#login-modal">
              <FaSignInAlt className={styles.buttonIcon} />
              <span>Đăng nhập</span>
            </button>
            <button className={styles.authButton} data-bs-toggle="modal" data-bs-target="#register-modal">
              <FaUserPlus className={styles.buttonIcon} />
              <span>Đăng ký</span>
            </button>
          </div>
        ) : !isAccountPage && (
          <div className={styles.userInfo}>
            <FaUser className={styles.userIcon} />
            <div className={styles.userTextContainer}>
              <span className={styles.welcomeText}>Xin chào,</span>
              <span className={styles.username}>{user.username}</span>
            </div>
            <div className={styles.buttonContainer}>
              <Link 
                to="/account" 
                className={styles.iconButton}
                title="Xem thông tin tài khoản"
              >
                <FaUserCog className={styles.buttonIcon} />
              </Link>
              <button
                className={styles.iconButton}
                onClick={logout}
                title="Đăng xuất"
              >
                <FaSignOutAlt className={styles.buttonIcon} />
              </button>
            </div>
          </div>
        )}
        
        {!isAccountPage && (
          <div className={styles.downloadButton}>
            <a href="/download" className={styles.downloadLink}>
              <FaDownload className={styles.buttonIcon} />
              <span>Tải Game</span>
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 