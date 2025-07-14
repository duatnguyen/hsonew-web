import React, { useState, useEffect, useRef } from 'react';
import styles from './AuthModals.module.css';
import logo from '../../assets/images/logo.png';
import { FaUserPlus, FaTimes, FaUser, FaLock, FaPhone } from 'react-icons/fa';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

declare global {
  interface Window {
    bootstrap: any;
  }
}

const RegisterModal: React.FC = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const modalRef = useRef<any>(null);

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
    setSuccessMsg('');
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu nhập lại không khớp');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      setIsLoading(false);
      return;
    }

    try {
      const requestData = {
        username: formData.username.trim(),
        phone: formData.phone.trim(),
        password: formData.password
      };

      console.log('Sending register request with:', requestData);

      const response = await axios.post('http://localhost:8080/api/auth/register', requestData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Register response:', response.data);

      if (response.data && response.data.success === true) {
        setSuccessMsg('Đăng ký thành công! Đang đăng nhập...');
        // Tự động đăng nhập
        try {
          const loginRes = await axios.post('http://localhost:8080/api/auth/login', {
            username: formData.username.trim(),
            password: formData.password
          }, {
            headers: { 'Content-Type': 'application/json' }
          });
          if (loginRes.data && loginRes.data.success && loginRes.data.user) {
            login(loginRes.data.user);
            localStorage.setItem('user', JSON.stringify(loginRes.data.user));
            setFormData({ username: '', phone: '', password: '', confirmPassword: '' });
            setTimeout(() => {
              closeModal();
            }, 1000);
          } else {
            setError('Đăng ký thành công nhưng đăng nhập thất bại.');
          }
        } catch (loginErr: any) {
          setError('Đăng ký thành công nhưng đăng nhập thất bại.');
        }
      } else {
        setError(response.data?.message || 'Đăng ký thất bại. Vui lòng thử lại.');
      }
    } catch (error: any) {
      console.error('Register error details:', {
        error: error,
        name: error.name,
        message: error.message,
        stack: error.stack,
        response: error.response,
        request: error.request
      });

      if (error.response) {
        console.error('Server error response:', {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers
        });
        setError(`Lỗi từ server (${error.response.status}): ${error.response.data?.message || 'Đăng ký thất bại'}`);
      } else if (error.request) {
        console.error('No response received:', error.request);
        setError('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.');
      } else {
        console.error('Error setting up request:', error.message);
        setError(`Lỗi khi gửi yêu cầu: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const modalElement = document.getElementById('register-modal');
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
    window.openRegisterModal = () => {
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
      delete window.openRegisterModal;
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };


  const handleCancel = () => {
    closeModal(() => {
      setFormData({ username: '', phone: '', password: '', confirmPassword: '' });
      setError('');
    });
  };


  return (
    <div className="modal fade" id="register-modal" tabIndex={-1} aria-labelledby="registerModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className={`modal-content ${styles.modalWrapper}`}>
          <div className="modal-body p-0">
            <div className={styles.modalHeader}>
              <img src={logo} alt="Logo" className={styles.modalLogo} />
              <h4 className={styles.modalTitle}>Đăng Ký</h4>
            </div>

            <form onSubmit={handleSubmit} className={styles.authForm}>
              {error && <div className={styles.errorMessage}>{error}</div>}
              {successMsg && <div className={styles.successMessage}>{successMsg}</div>}

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
                <div className={`${styles.inputWrapper} ${formData.phone ? styles.hasValue : ''}`}>
                  <FaPhone className={styles.inputIcon} />
                  <input
                    type="text"
                    name="phone"
                    className={`${styles.formInput} ${formData.phone ? styles.hasValue : ''}`}
                    placeholder="Số điện thoại"
                    value={formData.phone}
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

              <div className={styles.formGroup}>
                <div className={`${styles.inputWrapper} ${formData.confirmPassword ? styles.hasValue : ''}`}>
                  <FaLock className={styles.inputIcon} />
                  <input
                    type="password"
                    name="confirmPassword"
                    className={`${styles.formInput} ${formData.confirmPassword ? styles.hasValue : ''}`}
                    placeholder="Nhập lại mật khẩu"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className={styles.modalActions}>
                <button type="submit" className={styles.submitButton} disabled={isLoading}>
                  <FaUserPlus /> <span>{isLoading ? 'Đang xử lý...' : 'Đăng ký'}</span>
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
                  Bạn đã có tài khoản?{' '}
                  <span
                    className={styles.link}
                    onClick={() => {
                      closeModal();
                      const loginModal = document.getElementById('login-modal');
                      if (loginModal && window.bootstrap && window.bootstrap.Modal) {
                        const bsModal = new window.bootstrap.Modal(loginModal);
                        bsModal.show();
                      }
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    Đăng nhập ngay
                  </span>
                </p>
                <p>
                  <span
                    className={styles.link}
                    onClick={() => {
                      closeModal();
                      const resetModal = document.getElementById('reset-password-modal');
                      if (resetModal && window.bootstrap && window.bootstrap.Modal) {
                        const bsModal = new window.bootstrap.Modal(resetModal);
                        bsModal.show();
                      }
                    }}
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

export default RegisterModal; 