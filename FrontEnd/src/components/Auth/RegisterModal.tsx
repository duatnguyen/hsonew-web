import React, { useState } from 'react';
import styles from './AuthModals.module.css';
import logo from '../../assets/images/logo.png';
import { FaUserPlus, FaTimes, FaUser, FaLock, FaPhone, FaEnvelope } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';

const RegisterModal: React.FC = () => {
  const { register, loading, error } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [localError, setLocalError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');

    // Validation
    if (!formData.username.trim()) {
      setLocalError('Vui lòng nhập tên đăng nhập');
      return;
    }

    if (formData.username.length < 3) {
      setLocalError('Tên đăng nhập phải có ít nhất 3 ký tự');
      return;
    }

    if (!formData.password) {
      setLocalError('Vui lòng nhập mật khẩu');
      return;
    }

    if (formData.password.length < 6) {
      setLocalError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setLocalError('Mật khẩu xác nhận không khớp');
      return;
    }

    const success = await register(
      formData.username, 
      formData.password, 
      formData.email || undefined, 
      formData.phone || undefined
    );

    if (success) {
      // Clear form
      setFormData({
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
      });

      // Close modal
      const modalElement = document.getElementById('register-modal');
      if (modalElement) {
        // Check if bootstrap is available
        if ((window as any).bootstrap && (window as any).bootstrap.Modal) {
          const bsModal = new (window as any).bootstrap.Modal(modalElement);
          bsModal.hide();
        } else {
          // Fallback: manually hide modal
          modalElement.classList.remove('show');
          modalElement.style.display = 'none';
          modalElement.setAttribute('aria-hidden', 'true');
          modalElement.removeAttribute('aria-modal');
        }
        
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
    }
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
                    disabled={loading}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Email (không bắt buộc)</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FaEnvelope />
                  </span>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Nhập email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Số điện thoại (không bắt buộc)</label>
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
                    disabled={loading}
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
                    placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    disabled={loading}
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
                    disabled={loading}
                  />
                </div>
              </div>
              
              {(error || localError) && (
                <div className="alert alert-danger" role="alert">
                  {localError || error}
                </div>
              )}
              
              <div className={styles.modalActions}>
                <button 
                  type="submit" 
                  className={styles.submitButton} 
                  title="Đăng ký"
                  disabled={loading}
                >
                  {loading ? 'Đang đăng ký...' : <FaUserPlus />}
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