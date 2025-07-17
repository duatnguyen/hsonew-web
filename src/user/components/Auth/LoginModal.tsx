import React, { useState, useEffect, useRef } from 'react';
import styles from './AuthModals.module.css';
import logo from '../../assets/images/logo.png';
import { FaSignInAlt, FaTimes, FaUser, FaLock } from 'react-icons/fa';
import { useAuth } from '../../../contexts/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

declare global {
  interface Window {
    bootstrap: any;
    openLoginModal?: () => void;
    openRegisterModal?: () => void;
    openResetPasswordModal?: () => void;
  }
}

const LoginModal: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef<any>(null);

  useEffect(() => {
    const modalElement = document.getElementById('login-modal');
    console.log('Modal element:', modalElement);
    console.log('Bootstrap:', window.bootstrap);
    if (!modalElement) {
      console.error('Login modal element not found');
      return;
    }
    if (!window.bootstrap) {
      console.error('Bootstrap not loaded');
      return;
    }
    modalRef.current = new window.bootstrap.Modal(modalElement, {
      backdrop: 'static',
      keyboard: false
    });
    console.log('Modal initialized:', modalRef.current);
    // Gắn hàm mở modal ra global để Header gọi được
    window.openLoginModal = () => {
      if (!modalRef.current) {
        modalRef.current = new window.bootstrap.Modal(modalElement, {
          backdrop: 'static',
          keyboard: false
        });
      }
      modalRef.current.show();
    };
    return () => {
      console.log('Cleaning up modal');
      if (modalRef.current) {
        modalRef.current.dispose();
        console.log('Modal disposed');
      }
      delete window.openLoginModal;
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        console.log('Removing backdrop');
        backdrop.remove();
      }
      document.body.classList.remove('modal-open');
      document.body.style.removeProperty('padding-right');
      document.body.style.removeProperty('overflow');
    };
  }, []);

  const closeModal = (callback?: () => void) => {
    try {
      if (modalRef.current) {
        const modalElement = document.getElementById('login-modal');
        if (modalElement && callback) {
          const handler = () => {
            callback();
            modalElement.removeEventListener('hidden.bs.modal', handler);
          };
          modalElement.addEventListener('hidden.bs.modal', handler);
        }
        modalRef.current.hide();
      }
    } catch (error) { }
    // Cleanup DOM
    document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
    document.body.classList.remove('modal-open');
    document.body.style.removeProperty('padding-right');
    document.body.style.removeProperty('overflow');
    const modalElement = document.getElementById('login-modal');
    if (modalElement) {
      modalElement.classList.remove('show');
      modalElement.style.display = '';
      modalElement.setAttribute('aria-hidden', 'true');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const requestData = {
        username: formData.username.trim(),
        password: formData.password
      };

      // console.log('Sending login request with:', requestData);
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${API_URL}/api/auth/login`, requestData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Response:', response.data);

      if (response.data && response.data.success === true && response.data.data?.token) {
        // Lưu token vào localStorage
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('id', String(response.data.data.id));
        localStorage.setItem('username', response.data.data.username);
        localStorage.setItem('email', response.data.data.email || '');
        localStorage.setItem('phone', response.data.data.phone || '');
        localStorage.setItem('createTime', response.data.data.createTime || '');
        localStorage.setItem('rolename', response.data.data.rolename || 'user');
        localStorage.setItem('listChar', JSON.stringify(response.data.data.listChar || []));
        // Cập nhật context
        if (login) {
          login({
            id: String(response.data.data.id),
            username: response.data.data.username,
            password: '',
            email: response.data.data.email || '',
            phone: response.data.data.phone || '',
            createTime: response.data.data.createTime || '',
            status: response.data.data.status || 1,
            lock: false,
            listChar: response.data.data.listChar || [],
            role: response.data.data.rolename || 'user',
          });
        }
        setFormData({ username: '', password: '' });
        closeModal(() => {
          navigate('/account');
        });
      } else {
        setError(response.data?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra thông tin đăng nhập.');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.response) {
        setError(`Lỗi từ server (${error.response.status}): ${error.response.data?.message || 'Đăng nhập thất bại'}`);
      } else if (error.request) {
        setError('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.');
      } else {
        setError(`Lỗi khi gửi yêu cầu: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const openRegisterModal = () => {
    closeModal();
    const registerModal = document.getElementById('register-modal');
    if (registerModal && window.bootstrap) {
      const modal = new window.bootstrap.Modal(registerModal);
      modal.show();
    }
  };

  const openResetPasswordModal = () => {
    closeModal();
    const resetModal = document.getElementById('reset-password-modal');
    if (resetModal && window.bootstrap) {
      const modal = new window.bootstrap.Modal(resetModal);
      modal.show();
    }
  };

  const handleCancel = () => {
    closeModal(() => {
      setFormData({ username: '', password: '' });
      setError('');
    });
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
                    disabled={isLoading}
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
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className={styles.modalActions}>
                <button type="submit" className={styles.submitButton} disabled={isLoading}>
                  <FaSignInAlt /> <span>{isLoading ? 'Đang xử lý...' : 'Đăng nhập'}</span>
                </button>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  <FaTimes /> <span>Hủy</span>
                </button>
              </div>

              <div className={styles.modalLinks}>
                <p>
                  Bạn chưa có tài khoản?{' '}
                  <span
                    className={styles.link}
                    onClick={openRegisterModal}
                    style={{ cursor: 'pointer' }}
                  >
                    Đăng ký ngay
                  </span>
                </p>
                <p>
                  <span
                    className={styles.link}
                    onClick={openResetPasswordModal}
                    style={{ cursor: 'pointer' }}
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