import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AccountManagement.module.css';
import { useAuth } from '../../contexts/AuthContext';
import { FaEye, FaEyeSlash, FaKey, FaSignOutAlt, FaCheck, FaTimes, FaEdit, FaUserCircle, FaRegCalendarAlt } from 'react-icons/fa';
import axios from 'axios';
import { encodeId } from '../../utils/encodeId';
import type { User as UserBase } from '../../contexts/AuthContext';

// Mở rộng interface User để có listChar
interface User extends UserBase {
  listChar?: string[];
}

interface AccountManagementProps {
  user?: User | null;
}

const AccountManagement: React.FC<AccountManagementProps> = ({ user: userProp }) => {
  const context = useAuth();
  const user = userProp !== undefined ? userProp : context.user;
  const { logout, login } = context;
  const navigate = useNavigate();
  const [userLocal, setUserLocal] = useState<User | null | undefined>(user);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Email/Phone edit states
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [newEmail, setNewEmail] = useState(user?.email || '');
  const [newPhone, setNewPhone] = useState(user?.phone || '');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPhone, setErrorPhone] = useState('');



  React.useEffect(() => {
    setUserLocal(user);
  }, [user]);

  if (!userLocal) {
    return null;
  }

  const handleChangePassword = () => {
    setIsChangingPassword(true);
    setError('');
  };

  const handleSubmitPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    if (oldPassword.length < 6) {
      setError('Mật khẩu cũ phải có ít nhất 6 ký tự');
      return;
    }
    if (newPassword.length < 6) {
      setError('Mật khẩu mới phải có ít nhất 6 ký tự');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8080/api/auth/change-password', {
        accountId: userLocal.id,
        oldPassword,
        newPassword
      });
      if (res.data && res.data.success) {
        setIsChangingPassword(false);
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setError('');
        // Load lại thông tin tài khoản và hiển thị lại trang
        await fetchAndUpdateUser();
        // Nếu sau khi fetch xong mà userLocal.password vẫn là mật khẩu cũ, cập nhật lại bằng newPassword
        setUserLocal(prev => {
          if (!prev) return prev;
          if (prev.password !== newPassword) {
            return { ...prev, password: newPassword };
          }
          return prev;
        });
        // Update localStorage
        const updatedUser = { ...userLocal, password: newPassword };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setSuccessMsg(res.data.message || 'Đổi mật khẩu thành công');
      } else {
        setError(res.data?.message || 'Đổi mật khẩu thất bại');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Đổi mật khẩu thất bại');
    } finally {
      setLoading(false);
    }
  };

  const fetchAndUpdateUser = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/account/${userLocal.id}`);
      if (res.data && res.data.success && res.data.user) {
        // Đảm bảo id luôn được encode lại sau khi cập nhật
        const encodedUser = { ...res.data.user, id: encodeId(res.data.user.id) };
        login(encodedUser); // Update context
        setUserLocal(encodedUser);
        localStorage.setItem('user', JSON.stringify(encodedUser));
      }
    } catch (err) {
      // Có thể show toast hoặc log lỗi nếu cần
    }
  };

  // Email
  const handleEditEmail = () => {
    setIsEditingEmail(true);
    setNewEmail(userLocal.email || '');
    setErrorEmail('');
  };
  const handleCancelEmail = () => {
    setIsEditingEmail(false);
    setNewEmail(userLocal.email || '');
    setErrorEmail('');
  };
  const handleSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setErrorEmail('Email không hợp lệ');
      return;
    }
    try {
      const payload = {
        id: userLocal.id,
        username: userLocal.username,
        password: userLocal.password,
        email: newEmail,
        phone: userLocal.phone,
        coin: userLocal.coin,
        createTime: userLocal.createTime,
        status: userLocal.status,
        lock: userLocal.lock
      };
      const res = await axios.put(`http://localhost:8080/api/accounts/${userLocal.id}`, payload);
      if (res.data && res.data.success) {
        setIsEditingEmail(false);
        setErrorEmail('');
        // Cập nhật userLocal ngay lập tức để UI phản ánh thay đổi
        setUserLocal(prev => prev ? { ...prev, email: newEmail } : prev);
        await fetchAndUpdateUser();
      } else {
        setErrorEmail(res.data?.message || 'Cập nhật email thất bại');
      }
    } catch (err: any) {
      setErrorEmail(err.response?.data?.message || 'Cập nhật email thất bại');
    }
  };

  // Phone
  const handleEditPhone = () => {
    setIsEditingPhone(true);
    setNewPhone(userLocal.phone || '');
    setErrorPhone('');
  };

  const handleCancelPhone = () => {
    setIsEditingPhone(false);
    setNewPhone(userLocal.phone || '');
    setErrorPhone('');
  };
  const handleSubmitPhone = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhone.match(/^0\d{9}$/)) {
      setErrorPhone('Số điện thoại không hợp lệ');
      return;
    }
    try {
      const res = await axios.put(`http://localhost:8080/api/accounts/${userLocal.id}`, {
        ...userLocal,
        phone: newPhone
      });
      if (res.data && res.data.success) {
        setIsEditingPhone(false);
        setErrorPhone('');
        // Cập nhật userLocal ngay lập tức để UI phản ánh thay đổi
        setUserLocal(prev => prev ? { ...prev, phone: newPhone } : prev);
        await fetchAndUpdateUser();
      } else {
        setErrorPhone(res.data?.message || 'Cập nhật số điện thoại thất bại');
      }
    } catch (err: any) {
      setErrorPhone(err.response?.data?.message || 'Cập nhật số điện thoại thất bại');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/home');
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Chưa có thông tin';
    const date = new Date(dateString);
    const d = date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const t = date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    return { d, t };
  };

  const displayValue = (value: any) => {
    if (value === null || value === undefined || value === '') {
      return 'Chưa có thông tin';
    }
    return value;
  };

  // Thêm hàm parseListChar để lấy danh sách tên nhân vật từ listChar
  const parseListChar = (listChar: any) => {
    if (!listChar) return [];
    // Nếu là chuỗi JSON
    if (typeof listChar === 'string') {
      try {
        const parsed = JSON.parse(listChar);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    // Nếu là mảng và phần tử đầu là chuỗi JSON
    if (Array.isArray(listChar) && listChar.length > 0 && typeof listChar[0] === 'string') {
      try {
        const parsed = JSON.parse(listChar[0]);
        return Array.isArray(parsed) ? parsed : listChar;
      } catch {
        return listChar;
      }
    }
    // Nếu là mảng string bình thường
    if (Array.isArray(listChar)) return listChar;
    return [];
  };

  // Thêm avatar lớn và tên tài khoản nổi bật
  return (
    <div className={styles.cardWrap}>
      <div className={styles.avatarSection}>
        <div className={styles.avatarCircle}>
          <FaUserCircle className={styles.avatarIcon} />
        </div>
        <div className={styles.username}>{displayValue(userLocal.username)}</div>
        <div className={styles.userMeta}>
          <span className={styles.userId}>ID: {userLocal.id}</span>
        </div>
        {/* Hiển thị danh sách nhân vật nếu có */}
        {userLocal.listChar && parseListChar(userLocal.listChar).length > 0 && (
          <div className={styles.charListWrap}>
            <div className={styles.charListLabel}>Nhân vật:</div>
            <div className={styles.charListBadges}>
              {parseListChar(userLocal.listChar).map((char: string, idx: number) => (
                <span className={styles.charName} key={idx}>{
                  typeof char === 'string' ? char.replace(/[\[\]"]/g, '') : char
                }</span>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className={styles.infoSection}>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Mật khẩu</span>
          <div className={styles.infoValueRow}>
            <span className={styles.passwordText}>
              {showPassword
                ? (userLocal.password ? userLocal.password : 'Chưa có thông tin')
                : '••••••••'}
            </span>
            <button
              className={`${styles.iconButton} ${styles.showButton}`}
              onClick={() => setShowPassword((prev) => !prev)}
              title={showPassword ? 'Ẩn mật khẩu' : 'Hiển thị mật khẩu'}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            <button
              className={`${styles.iconButton} ${styles.changeButton}`}
              onClick={handleChangePassword}
              title="Đổi mật khẩu"
            >
              <FaKey />
            </button>
          </div>
          {isChangingPassword && (
            <form onSubmit={handleSubmitPassword} className={styles.inlineForm}>
              <input
                type="password"
                placeholder="Mật khẩu cũ"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className={styles.input}
                disabled={loading}
              />
              <input
                type="password"
                placeholder="Mật khẩu mới"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={styles.input}
                disabled={loading}
              />
              <input
                type="password"
                placeholder="Xác nhận mật khẩu mới"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={styles.input}
                disabled={loading}
              />
              {(error || successMsg) && (
                <div className={error ? styles.errorMessage : styles.successMessage}>{error || successMsg}</div>
              )}
              <div className={styles.buttonGroup}>
                <button type="submit" className={styles.submitButton} title="Xác nhận" disabled={loading}>
                  <FaCheck />
                </button>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => {
                    setIsChangingPassword(false);
                    setOldPassword('');
                    setNewPassword('');
                    setConfirmPassword('');
                    setError('');
                    setSuccessMsg('');
                  }}
                  title="Hủy"
                  disabled={loading}
                >
                  <FaTimes />
                </button>
              </div>
            </form>
          )}
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Email</span>
          <div className={styles.infoValueRow}>
            <span>{displayValue(userLocal.email)}</span>
            {!isEditingEmail && (
              <button
                className={`${styles.iconButton} ${styles.updateButton}`}
                title="Cập nhật email"
                onClick={handleEditEmail}
              >
                <FaEdit />
              </button>
            )}
          </div>
          {isEditingEmail && (
            <form onSubmit={handleSubmitEmail} className={styles.inlineForm}>
              <input
                type="email"
                value={newEmail}
                onChange={e => setNewEmail(e.target.value)}
                className={styles.input}
                placeholder="Nhập email mới"
              />
              {errorEmail && <div className={styles.errorMessage}>{errorEmail}</div>}
              <div className={styles.buttonGroup}>
                <button type="submit" className={styles.submitButton} title="Xác nhận">
                  <FaCheck />
                </button>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={handleCancelEmail}
                  title="Hủy"
                >
                  <FaTimes />
                </button>
              </div>
            </form>
          )}
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Số điện thoại</span>
          <div className={styles.infoValueRow}>
            <span>{displayValue(userLocal.phone)}</span>
            {!isEditingPhone && (
              <button
                className={`${styles.iconButton} ${styles.updateButton}`}
                title="Cập nhật số điện thoại"
                onClick={handleEditPhone}
              >
                <FaEdit />
              </button>
            )}
          </div>
          {isEditingPhone && (
            <form onSubmit={handleSubmitPhone} className={styles.inlineForm}>
              <input
                type="text"
                value={newPhone}
                onChange={e => setNewPhone(e.target.value)}
                className={styles.input}
                placeholder="Nhập số điện thoại mới"
              />
              {errorPhone && <div className={styles.errorMessage}>{errorPhone}</div>}
              <div className={styles.buttonGroup}>
                <button type="submit" className={styles.submitButton} title="Xác nhận">
                  <FaCheck />
                </button>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={handleCancelPhone}
                  title="Hủy"
                >
                  <FaTimes />
                </button>
              </div>
            </form>
          )}
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Ngày tạo</span>
          <div className={styles.infoValueRow}>
            {(() => {
              const dateVal = formatDate(userLocal.createTime);
              if (typeof dateVal === 'string') {
                return dateVal;
              } else {
                return (
                  <span className={styles.createdAt}>
                    <FaRegCalendarAlt className={styles.calendarIcon} /> {dateVal.d}
                    <span className={styles.time}>- {dateVal.t}</span>
                  </span>
                );
              }
            })()}
          </div>
        </div>
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