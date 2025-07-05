import React, { useState, useEffect } from 'react';
import styles from './AuthModals.module.css';
import logo from '../../assets/images/logo.png';
import { FaSignInAlt, FaTimes, FaUser, FaLock } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const LoginModal: React.FC = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState<string>('');

  const closeModal = () => {
    const modalElement = document.getElementById('login-modal');
    if (modalElement) {
      const bsModal = new (window as any).bootstrap.Modal(modalElement);
      bsModal.hide();
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) backdrop.remove();
      document.body.classList.remove('modal-open');
      document.body.style.removeProperty('padding-right');
      document.body.style.removeProperty('overflow');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        username: formData.username.trim(),
        password: formData.password
      });

      if (response.data.success) {
        await login(response.data.user);
        setFormData({ username: '', password: '' });
        closeModal();
      } else {
        setError(response.data.message || 'Đăng nhập thất bại');
      }
    } catch (error: any) {
      console.error('Login failed:', error);
      setError(error.response?.data?.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
    }
  };

  useEffect(() => {
    return () => {
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) backdrop.remove();
      document.body.classList.remove('modal-open');
      document.body.style.removeProperty('padding-right');
      document.body.style.removeProperty('overflow');
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(''); // Clear error when user types
  };

  return (
    <div className="modal fade" id="login-modal" tabIndex={-1} aria-labelledby="loginModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className={`modal-content ${styles.modalWrapper}`}>
          <div className="modal-body p-0">
            <div className={styles.modalHeader}>
              <img src={logo} alt="Logo" className={styles.modalLogo} />
              <h4 className={styles.modalTitle}>Đăng Nhập</h4>
            </div>
            
            <form onSubmit={handleSubmit} className={styles.authForm}>
              {error && <div className={styles.errorMessage}>{error}</div>}
              
              <div className={styles.formGroup}>
                <div className={`${styles.inputWrapper} ${formData.username ? styles.hasValue : ''}`}>
                  <FaUser className={styles.inputIcon} />
                  <input
                    type="text"
                    name="username"
                    className={`${styles.formInput} ${formData.username ? styles.hasValue : ''}`}
                    placeholder="Tên đăng nhập"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <div className={`${styles.inputWrapper} ${formData.password ? styles.hasValue : ''}`}>
                  <FaLock className={styles.inputIcon} />
                  <input
                    type="password"
                    name="password"
                    className={`${styles.formInput} ${formData.password ? styles.hasValue : ''}`}
                    placeholder="Mật khẩu"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.modalActions}>
                <button type="submit" className={styles.submitButton}>
                  <FaSignInAlt /> <span>Đăng nhập</span>
                </button>
                <button 
                  type="button" 
                  className={styles.cancelButton} 
                  data-bs-dismiss="modal"
                >
                  <FaTimes /> <span>Hủy</span>
                </button>
              </div>

              <div className={styles.modalLinks}>
                <p>
                  Bạn chưa có tài khoản?{' '}
                  <span
                    className={styles.link}
                    data-bs-toggle="modal"
                    data-bs-target="#register-modal"
                    data-bs-dismiss="modal"
                  >
                    Đăng ký ngay
                  </span>
                </p>
                <p>
                  <span
                    className={styles.link}
                    data-bs-toggle="modal"
                    data-bs-target="#reset-password-modal"
                    data-bs-dismiss="modal"
                  >
                    Quên mật khẩu?
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal; 