import React, { useState, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Recharge.module.css';

// Sinh addInfo: selectedChar + 4 số ngẫu nhiên
const generateAddInfo = (charName: string) => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000).toString();
    return `${charName}_${randomDigits}`;
};

type PaymentMethod = 'bank' | 'card';

const Recharge: React.FC = () => {
    const [showQRModal, setShowQRModal] = useState(false);
    const [qrInfo, setQrInfo] = useState<{ amount: string; addInfo: string } | null>(null);
    const { user } = useAuth();
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('bank');
    const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
    const [customAmount, setCustomAmount] = useState<string>('');
    const [formData, setFormData] = useState({
        provider: '',
        amount: '',
        cardCode: '',
        serial: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedChar, setSelectedChar] = useState<string | null>(null);
    const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
    const customInputRef = useRef<HTMLInputElement>(null);

    // Kiểm tra đăng nhập
    if (!user) {
        return (
            <div className={styles.recharge}>
                <div className={styles.errorNotification} style={{ marginTop: 32 }}>
                    <div className={styles.notificationIconWrap}>
                        <span className={styles.iconError}>✖</span>
                    </div>
                    <div className={styles.notificationContent}>
                        <span className={styles.notificationMessage}>Bạn chưa đăng nhập. Vui lòng đăng nhập để sử dụng chức năng nạp ngọc!</span>
                    </div>
                </div>
            </div>
        );
    }

    // Bảng giá nạp tiền mặc định (x1)
    const priceTableData = [
        { amount: 10000, basePoint: 200 },
        { amount: 20000, basePoint: 450 },
        { amount: 30000, basePoint: 700 },
        { amount: 50000, basePoint: 1250 },
        { amount: 100000, basePoint: 3000 },
        { amount: 200000, basePoint: 6800 },
        { amount: 300000, basePoint: 10800 },
        { amount: 500000, basePoint: 20000 }
    ];

    // Mapping provider to network code
    const providerToNetwork: Record<string, string> = {
        viettel: 'VTT',
        mobifone: 'VMS',
        vinaphone: 'VNP',
        vietnamobile: 'VNM',
        gate: 'GATE',
        zing: 'ZING',
    };

    // Generate trxId: character name + random digits
    const generateTrxId = (charName: string) => {
        const randomDigits = Math.floor(100000 + Math.random() * 900000).toString();
        return `${charName}_${randomDigits}`;
    };

    const handleMethodSelect = (method: PaymentMethod) => {
        setSelectedMethod(method);
        setSelectedAmount(null);
        setCustomAmount('');
        setFormData({ provider: '', amount: '', cardCode: '', serial: '' });
    };

    const handleAmountSelect = (amount: number) => {
        setSelectedAmount(amount);
        setCustomAmount(amount.toString());
        setFormData(prev => ({ ...prev, amount: amount.toString() }));

        if (customInputRef.current) {
            customInputRef.current.focus();
            customInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    const handleCustomAmountChange = (value: string) => {
        const numericValue = value.replace(/[^0-9]/g, '');
        setCustomAmount(numericValue);
        setSelectedAmount(numericValue ? parseInt(numericValue) : null);
    };

    const calculatePoints = (amount: number, method: PaymentMethod) => {
        // Tìm mệnh giá chính xác trong bảng
        const exactMatch = priceTableData.find(item => item.amount === amount);

        if (exactMatch) {
            if (method === 'bank') {
                return Math.floor(exactMatch.basePoint * 1.3); // ATM +30%
            } else {
                return exactMatch.basePoint; // Thẻ cào đúng mệnh giá
            }
        }

        // Nếu không có mệnh giá chính xác, tìm mệnh giá gần nhất
        const sortedPrices = [...priceTableData].sort((a, b) => a.amount - b.amount);
        const lowerMatch = sortedPrices.filter(item => item.amount <= amount).pop();
        const upperMatch = sortedPrices.find(item => item.amount > amount);

        if (lowerMatch && upperMatch) {
            // Nội suy tuyến tính
            const x0 = lowerMatch.amount;
            const y0 = lowerMatch.basePoint;
            const x1 = upperMatch.amount;
            const y1 = upperMatch.basePoint;

            const interpolatedPoints = y0 + (amount - x0) * (y1 - y0) / (x1 - x0);

            if (method === 'bank') {
                return Math.floor(interpolatedPoints * 1.3); // ATM +30%
            } else {
                return Math.floor(interpolatedPoints * 0.5); // Thẻ cào sai mệnh giá -50%
            }
        } else if (lowerMatch) {
            // Nếu lớn hơn mệnh giá cao nhất, dùng tỷ lệ của mệnh giá cao nhất
            const ratio = lowerMatch.basePoint / lowerMatch.amount;
            const basePoints = Math.floor(amount * ratio);

            if (method === 'bank') {
                return Math.floor(basePoints * 1.3);
            } else {
                return Math.floor(basePoints * 0.5);
            }
        }

        return 0; // Trường hợp không tính được
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            if (selectedMethod === 'card') {
                if (!selectedChar) throw new Error('Vui lòng chọn nhân vật');
                const network = providerToNetwork[formData.provider] || '';
                const trxId = generateTrxId(selectedChar);
                const payload = {
                    network: network,
                    cardCode: formData.cardCode,
                    cardSeri: formData.serial,
                    cardValue: Number(formData.amount), // số nguyên
                    urlCallback: window.location.origin + '/api/recharge/callback',
                    trxId: trxId,
                };
                console.log('Recharge payload:', payload);
                const res = await fetch('http://localhost:8080/api/recharge/card', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });
                let data: any = {};
                const contentType = res.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    try {
                        data = await res.json();
                    } catch {
                        data = {};
                    }
                } else {
                    setNotification({ type: 'error', message: 'Hệ thống đang bảo trì hoặc trả về dữ liệu không hợp lệ. Vui lòng thử lại sau!' });
                    setIsSubmitting(false);
                    return;
                }
                if (data.Code === "1") {
                    setNotification({ type: 'success', message: 'Đã nhận thẻ vui lòng đợi kiểm tra!' });
                } else if (data.Code === "0") {
                    setNotification({ type: 'error', message: data.Message || 'Nạp thẻ thất bại!' });
                } else {
                    setNotification({ type: 'error', message: 'Có lỗi xảy ra khi nạp thẻ!' });
                }
            } else {
                // Xử lý phương thức bank (ATM/Banking)
                // Hiển thị modal QR
                if (!selectedChar) throw new Error('Vui lòng chọn nhân vật');
                if (!customAmount || parseInt(customAmount) <= 0) throw new Error('Vui lòng nhập số tiền hợp lệ');
                const addInfo = generateAddInfo(selectedChar);
                setQrInfo({ amount: customAmount, addInfo });
                setShowQRModal(true);
            }
        } catch (error: any) {
            setNotification({ type: 'error', message: error.message || 'Có lỗi xảy ra khi nạp thẻ!' });
            console.error('Error submitting:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
    };

    const formatPoints = (points: number) => {
        return new Intl.NumberFormat('vi-VN').format(points) + ' Ngọc';
    };

    const isFormValid = () => {
        if (selectedMethod === 'card') {
            return formData.provider && formData.amount && formData.cardCode && formData.serial;
        }
        return selectedAmount !== null || (customAmount && parseInt(customAmount) > 0);
    };

    // Lấy danh sách nhân vật từ user
    const parseListChar = (listChar: any) => {
        if (!listChar) return [];
        if (typeof listChar === 'string') {
            try {
                const parsed = JSON.parse(listChar);
                return Array.isArray(parsed) ? parsed : [];
            } catch {
                return [];
            }
        }
        if (Array.isArray(listChar) && listChar.length > 0 && typeof listChar[0] === 'string') {
            try {
                const parsed = JSON.parse(listChar[0]);
                return Array.isArray(parsed) ? parsed : listChar;
            } catch {
                return listChar;
            }
        }
        if (Array.isArray(listChar)) return listChar;
        return [];
    };
    const charList = user && user.listChar ? parseListChar(user.listChar) : [];
    // Nếu không có nhân vật, hiển thị thông báo và không render chức năng nạp
    if (charList.length === 0) {
        return (
            <div className={styles.recharge}>
                <div className={styles.errorNotification} style={{ marginTop: 32 }}>
                    <div className={styles.notificationIconWrap}>
                        <span className={styles.iconError}>✖</span>
                    </div>
                    <div className={styles.notificationContent}>
                        <span className={styles.notificationMessage}>Bạn chưa có nhân vật nào, hãy tạo nhân vật trong game để nạp ngọc!</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.recharge}>
            {/* Modal QR chuyển khoản */}
            {showQRModal && qrInfo && (
                <div className="modal fade show" style={{ display: 'block', background: 'rgba(0,0,0,0.4)' }} tabIndex={-1}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Quét mã QR để chuyển khoản</h5>
                                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowQRModal(false)}></button>
                            </div>
                            <div className="modal-body" style={{ textAlign: 'center' }}>
                                <img
                                    src={`https://api.vietqr.io/image/546034-0365190926-H2GLMfw.jpg?accountName=NGUYEN%20NONG%20DUAT&amount=${qrInfo.amount}&addInfo=${qrInfo.addInfo}`}
                                    alt="QR chuyển khoản"
                                    style={{ maxWidth: '100%', marginBottom: 16 }}
                                />
                                <div style={{ marginBottom: 8 }}>
                                    <strong>Số tiền:</strong> <span style={{ color: '#2e7d32' }}>{formatCurrency(parseInt(qrInfo.amount))}</span>
                                </div>
                                <div style={{ marginBottom: 8 }}>
                                    <strong>Nội dung chuyển khoản:</strong> <span style={{ color: '#1565c0' }}>{qrInfo.addInfo}</span>
                                </div>
                                <div style={{ marginBottom: 8 }}>
                                    <strong>Tên tài khoản:</strong> <span>NGUYEN NONG DUAT</span>
                                </div>
                                <div style={{ marginBottom: 8 }}>
                                    <strong>Số tài khoản:</strong> <span>036519026</span>
                                </div>
                                <div style={{ fontSize: 13, color: '#b71c1c' }}>
                                    Vui lòng chuyển đúng số tiền và nội dung để hệ thống tự động cộng ngọc!
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowQRModal(false)}>Đóng</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Thông báo kết quả nạp thẻ */}
            {notification && (
                <div
                    className={
                        notification.type === 'success'
                            ? styles.successNotification
                            : styles.errorNotification
                    }
                    style={{ animation: 'fadeInDown 0.5s' }}
                >
                    <div className={styles.notificationIconWrap}>
                        <span className={
                            notification.type === 'success'
                                ? styles.iconSuccess
                                : styles.iconError
                        }>
                            {notification.type === 'success' ? '✔' : '✖'}
                        </span>
                    </div>
                    <div className={styles.notificationContent}>
                        <span className={styles.notificationMessage}>{notification.message}</span>
                    </div>
                </div>
            )}
            {/* ...existing code... */}
            <div className={styles.methodSection}>
                <div className={styles.methodOptions}>
                    <div
                        className={`${styles.methodCard} ${selectedMethod === 'bank' ? styles.selected : ''}`}
                        onClick={() => handleMethodSelect('bank')}
                    >
                        <div className={styles.methodIcon}>💳</div>
                        <span className={styles.methodLabel}>ATM/Banking</span>
                        <span className={styles.methodBonus}>+30% giá trị</span>
                    </div>
                    <div
                        className={`${styles.methodCard} ${selectedMethod === 'card' ? styles.selected : ''}`}
                        onClick={() => handleMethodSelect('card')}
                    >
                        <div className={styles.methodIcon}>🎫</div>
                        <span className={styles.methodLabel}>Thẻ Cào</span>
                        <span className={styles.methodBonus}>50% giá trị nếu sai mệnh giá</span>
                    </div>
                </div>
            </div>
            {/* ...existing code... */}
            <div className={styles.quickPriceSection}>
                <div className={styles.priceGrid}>
                    {priceTableData.map((item, index) => (
                        <div
                            key={index}
                            className={`${styles.priceCard} ${selectedAmount === item.amount ? styles.selected : ''}`}
                            onClick={() => handleAmountSelect(item.amount)}
                        >
                            <div className={styles.priceAmount}>{formatCurrency(item.amount)}</div>
                            <div className={styles.pricePoints}>
                                {formatPoints(calculatePoints(item.amount, selectedMethod))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.customAmount}>
                    <div className={styles.inputWrapper}>
                        <input
                            ref={customInputRef}
                            type="text"
                            placeholder="Nhập số tiền tùy chọn"
                            value={customAmount}
                            onChange={(e) => handleCustomAmountChange(e.target.value)}
                            className={styles.customInput}
                            disabled={selectedMethod === 'card'}
                        />
                        {customAmount && parseInt(customAmount) > 0 && selectedMethod !== 'card' && (
                            <div className={styles.inputPoints}>
                                <span className={styles.arrow}>⟹</span>
                                {formatPoints(calculatePoints(parseInt(customAmount), selectedMethod))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* ...existing code... */}
            {selectedMethod === 'card' && (
                <div className={styles.cardForm}>
                    <div className={styles.formGroup}>
                        <select
                            value={formData.provider}
                            onChange={(e) => handleInputChange('provider', e.target.value)}
                            className={styles.select}
                        >
                            <option value="">Chọn nhà mạng</option>
                            <option value="viettel">Viettel</option>
                            <option value="vinaphone">Vinaphone</option>
                            <option value="mobifone">Mobifone</option>
                            <option value="vietnamobile">Vietnamobile</option>
                            <option value="zing">Zing</option>
                            <option value="gate">Gate</option>
                        </select>
                    </div>
                    <div className={styles.formRow}>
                        <input
                            type="text"
                            placeholder="Mã thẻ"
                            value={formData.cardCode}
                            onChange={(e) => handleInputChange('cardCode', e.target.value)}
                            className={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="Số serial"
                            value={formData.serial}
                            onChange={(e) => handleInputChange('serial', e.target.value)}
                            className={styles.input}
                        />
                    </div>
                </div>
            )}
            {/* ...existing code... */}
            <div className={styles.charSelectSection}>
                <div className={styles.charSelectLabel}>Chọn nhân vật nhận ngọc:</div>
                <div className={styles.charSelectBadges}>
                    {charList.map((char: string, idx: number) => (
                        <span
                            key={idx}
                            className={
                                styles.charBadge +
                                (selectedChar === char.replace(/[\[\]"]/g, '') ? ' ' + styles.selectedChar : '')
                            }
                            onClick={() => setSelectedChar(char.replace(/[\[\]"]/g, ''))}
                        >
                            {typeof char === 'string' ? char.replace(/[\[\]"]/g, '') : char}
                        </span>
                    ))}
                </div>
            </div>
            {/* ...existing code... */}
            <button
                className={styles.submitButton}
                disabled={!isFormValid() || isSubmitting}
                onClick={handleSubmit}
            >
                {isSubmitting ? 'Đang xử lý...' : (
                    selectedMethod === 'bank' ? 'Tiếp tục thanh toán' : 'Nạp thẻ'
                )}
            </button>
            <div className={styles.note}>
                <strong>Lưu ý:</strong> {selectedMethod === 'bank'
                    ? 'Giao dịch được xử lý tự động, vui lòng kiểm tra kỹ thông tin trước khi thanh toán.'
                    : 'Vui lòng kiểm tra kỹ mã thẻ và số serial trước khi nạp. Nạp sai mệnh giá chỉ nhận 50% giá trị.'
                }
            </div>
        </div>
    );
};

export default Recharge;