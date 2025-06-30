import React, { useState, useEffect } from 'react';
import styles from './AuthModals.module.css';
import logo from '../../assets/images/logo.png';
import { useAuth } from '../../contexts/AuthContext';

const LoginModal: React.FC = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate login - in real app, this would make an API call
    login(formData.username, 0);
    
    // Clear form
    setFormData({ username: '', password: '' });
    
    // Close modal using Bootstrap's hide method
    const modalElement = document.getElementById('login-modal');
    if (modalElement) {
      const bsModal = new (window as any).bootstrap.Modal(modalElement);
      bsModal.hide();
      
      // Remove modal backdrop
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.remove();
      }
      
      // Remove modal-open class and inline styles from body
      document.body.classList.remove('modal-open');
      document.body.style.removeProperty('padding-right');
      document.body.style.removeProperty('overflow');
    }
  };

  // Cleanup function to ensure modal elements are removed when component unmounts
  useEffect(() => {
    return () => {
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.remove();
      }
      document.body.classList.remove('modal-open');
      document.body.style.removeProperty('padding-right');
      document.body.style.removeProperty('overflow');
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="modal fade" id="login-modal" tabIndex={-1} aria-labelledby="loginModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <div className={styles.modalHeader}>
              <a href="/">
                <img src={logo} alt="Logo" className={styles.modalLogo} />
              </a>
            </div>
            <form onSubmit={handleSubmit} className={styles.authForm}>
              <div className="mb-3">
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  placeholder="Tên đăng nhập"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Mật khẩu"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.modalActions}>
                <button type="submit" className="btn btn-primary me-2">
                  Đăng nhập
                </button>
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">
                  Hủy bỏ
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
                    Quên mật khẩu
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