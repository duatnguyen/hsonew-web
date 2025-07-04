import React, { useState, useRef } from 'react';
import styles from './Recharge.module.css';

type PaymentMethod = 'bank' | 'card';

const Recharge: React.FC = () => {
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
    const customInputRef = useRef<HTMLInputElement>(null);

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
            await new Promise(resolve => setTimeout(resolve, 1500));
            console.log('Submit recharge:', { selectedMethod, formData });
        } catch (error) {
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

    return (
        <div className={styles.recharge}>
            {/* Phương thức nạp */}
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

            {/* Bảng giá nhanh */}
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

                {/* Custom Amount */}
                <div className={styles.customAmount}>
                    <div className={styles.inputWrapper}>
                        <input
                            ref={customInputRef}
                            type="text"
                            placeholder="Nhập số tiền tùy chọn"
                            value={customAmount}
                            onChange={(e) => handleCustomAmountChange(e.target.value)}
                            className={styles.customInput}
                        />
                        {customAmount && parseInt(customAmount) > 0 && (
                            <div className={styles.inputPoints}>
                                <span className={styles.arrow}>⟹</span>
                                {formatPoints(calculatePoints(parseInt(customAmount), selectedMethod))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Form nạp thẻ */}
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

            {/* Nút thanh toán */}
            <button 
                className={styles.submitButton}
                disabled={!isFormValid() || isSubmitting}
                onClick={handleSubmit}
            >
                {isSubmitting ? 'Đang xử lý...' : (
                    selectedMethod === 'bank' ? 'Tiếp tục thanh toán' : 'Nạp thẻ'
                )}
            </button>

            {/* Ghi chú */}
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