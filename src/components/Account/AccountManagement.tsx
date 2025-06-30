import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AccountManagement.module.css';
import { useAuth } from '../../contexts/AuthContext';
import { FaEye, FaEyeSlash, FaKey, FaSignOutAlt, FaCheck, FaTimes } from 'react-icons/fa';

const AccountManagement: React.FC = () => {
  const { user, updatePassword, logout } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  if (!user) {
    return null;
  }

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChangePassword = () => {
    setIsChangingPassword(true);
    setError('');
  };

  const handleSubmitPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }
    updatePassword(newPassword);
    setIsChangingPassword(false);
    setNewPassword('');
    setConfirmPassword('');
    setError('');
  };

  const handleLogout = () => {
    logout();
    navigate('/trangchu');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Thông tin tài khoản</h2>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <tbody>
            <tr>
              <td className={styles.label}>Tên tài khoản</td>
              <td className={styles.value}>{user.username}</td>
            </tr>
            <tr>
              <td className={styles.label}>Mật khẩu</td>
              <td className={styles.value}>
                <div className={styles.passwordRow}>
                  <span className={styles.passwordText}>
                    {showPassword ? user.password : '••••••••'}
                  </span>
                  <button
                    className={`${styles.iconButton} ${styles.showButton}`}
                    onClick={handleTogglePassword}
                    title={showPassword ? 'Ẩn mật khẩu' : 'Hiển thị mật khẩu'}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                  {!isChangingPassword && (
                    <button
                      className={`${styles.iconButton} ${styles.changeButton}`}
                      onClick={handleChangePassword}
                      title="Đổi mật khẩu"
                    >
                      <FaKey />
                    </button>
                  )}
                </div>
                {isChangingPassword && (
                  <form onSubmit={handleSubmitPassword} className={styles.passwordForm}>
                    <div className={styles.formGroup}>
                      <input
                        type="password"
                        placeholder="Mật khẩu mới"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className={styles.input}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <input
                        type="password"
                        placeholder="Xác nhận mật khẩu mới"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={styles.input}
                      />
                    </div>
                    {error && <div className={styles.error}>{error}</div>}
                    <div className={styles.buttonGroup}>
                      <button type="submit" className={styles.submitButton} title="Xác nhận">
                        <FaCheck />
                      </button>
                      <button
                        type="button"
                        className={styles.cancelButton}
                        onClick={() => {
                          setIsChangingPassword(false);
                          setNewPassword('');
                          setConfirmPassword('');
                          setError('');
                        }}
                        title="Hủy"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  </form>
                )}
              </td>
            </tr>
            <tr>
              <td className={styles.label}>Email</td>
              <td className={styles.value}>{user.email}</td>
            </tr>
            <tr>
              <td className={styles.label}>Số điện thoại</td>
              <td className={styles.value}>{user.phone}</td>
            </tr>
            <tr>
              <td className={styles.label}>Ngày tạo</td>
              <td className={styles.value}>{formatDate(user.createdAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.logoutContainer}>
        <button
          className={styles.logoutButton}
          onClick={handleLogout}
          title="Đăng xuất"
        >
          <FaSignOutAlt className={styles.logoutIcon} />
        </button>
      </div>
    </div>
  );
};

export default AccountManagement; 