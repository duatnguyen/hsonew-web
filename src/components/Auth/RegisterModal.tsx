import React, { useState } from 'react';
import styles from './AuthModals.module.css';
import logo from '../../assets/images/logo.png';
import { FaUserPlus, FaTimes, FaUser, FaLock, FaPhone } from 'react-icons/fa';

const RegisterModal: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const closeModal = () => {
    const modalElement = document.getElementById('register-modal');
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
    try {
      // Thực hiện đăng ký ở đây
      console.log('Register:', formData);
      setFormData({
        username: '',
        phone: '',
        password: '',
        confirmPassword: '',
      });
      closeModal();
    } catch (error) {
      console.error('Registration failed:', error);
      // Có thể thêm xử lý hiển thị lỗi ở đây
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
                  />
                </div>
              </div>

              <div className={styles.modalActions}>
                <button type="submit" className={styles.submitButton}>
                  <FaUserPlus /> <span>Đăng ký</span>
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
                  Bạn đã có tài khoản?{' '}
                  <span
                    className={styles.link}
                    data-bs-toggle="modal"
                    data-bs-target="#login-modal"
                    data-bs-dismiss="modal"
                  >
                    Đăng nhập ngay
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

export default RegisterModal; 