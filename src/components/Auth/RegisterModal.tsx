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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Register:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="modal fade" id="register-modal" tabIndex={-1} aria-labelledby="registerModalLabel" aria-hidden="true">
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
                <label className="form-label">Tên đăng nhập</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FaUser />
                  </span>
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    placeholder="Nhập tên đăng nhập"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Số điện thoại</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FaPhone />
                  </span>
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    placeholder="Nhập số điện thoại"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Mật khẩu</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FaLock />
                  </span>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Nhập mật khẩu"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Nhập lại mật khẩu</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FaLock />
                  </span>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    placeholder="Nhập lại mật khẩu"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className={styles.modalActions}>
                <button type="submit" className={styles.submitButton} title="Đăng ký">
                  <FaUserPlus />
                </button>
                <button 
                  type="button" 
                  className={styles.cancelButton} 
                  data-bs-dismiss="modal"
                  title="Hủy bỏ"
                >
                  <FaTimes />
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

export default RegisterModal; 