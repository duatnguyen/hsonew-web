import React, { useState } from 'react';
import styles from './Recharge.module.css';

type PaymentMethod = 'bank' | 'card';

const Recharge: React.FC = () => {
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('card');
    const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        provider: '',
        amount: '',
        cardCode: '',
        serial: ''
    });

    const amounts = [
        { price: 20000, coins: 20000 },
        { price: 50000, coins: 50000 },
        { price: 100000, coins: 100000 },
        { price: 200000, coins: 200000 },
        { price: 500000, coins: 500000 },
        { price: 1000000, coins: 1000000 },
        { price: 2000000, coins: 2000000 },
        { price: 5000000, coins: 5000000 },
        { price: 10000000, coins: 10000000 }
    ];

    const handleMethodSelect = (method: PaymentMethod) => {
        setSelectedMethod(method);
        setSelectedAmount(null);
        setFormData({ provider: '', amount: '', cardCode: '', serial: '' });
    };

    const handleAmountSelect = (amount: number) => {
        setSelectedAmount(amount);
        setFormData(prev => ({ ...prev, amount: amount.toString() }));
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        console.log('Submit recharge:', { selectedMethod, formData });
        // Xử lý logic nạp tiền ở đây
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
    };

    const formatCoins = (coins: number) => {
        return new Intl.NumberFormat('vi-VN').format(coins) + 'Coin';
    };

    return (
        <div className={styles.recharge}>
            {/* Chọn hình thức nạp */}
            <div className={styles.methodSection}>
                <h3 className={styles.sectionTitle}>Chọn hình thức nạp</h3>
                <div className={styles.methodOptions}>
                    <div
                        className={`${styles.methodCard} ${selectedMethod === 'bank' ? styles.selected : ''}`}
                        onClick={() => handleMethodSelect('bank')}
                    >
                        <div className={styles.methodIcon}>
                            💳
                        </div>
                        <span className={styles.methodLabel}>Ngân Hàng</span>
                    </div>
                    <div
                        className={`${styles.methodCard} ${selectedMethod === 'card' ? styles.selected : ''}`}
                        onClick={() => handleMethodSelect('card')}
                    >
                        <div className={styles.methodIcon}>
                            🎫
                        </div>
                        <span className={styles.methodLabel}>Thẻ Cào</span>
                    </div>
                </div>
            </div>
            {selectedMethod === 'card' && (
                <>
                    <div className={styles.formSection}>
                        <h3 className={styles.sectionTitle}>Hình thức nạp thẻ</h3>
                        <div className={styles.form}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Nhà mạng</label>
                                <select
                                    className={styles.select}
                                    value={formData.provider}
                                    onChange={(e) => handleInputChange('provider', e.target.value)}
                                >
                                    <option value="">Chọn nhà mạng</option>
                                    <option value="viettel">Viettel</option>
                                    <option value="vinaphone">Vinaphone</option>
                                    <option value="mobifone">Mobifone</option>
                                    <option value="vietnamobile">Vietnamobile</option>
                                    <option value="gmobile">Gmobile</option>
                                </select>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Mệnh giá</label>
                                <select
                                    className={styles.select}
                                    value={formData.amount}
                                    onChange={(e) => handleInputChange('amount', e.target.value)}
                                >
                                    <option value="">Chọn mệnh giá</option>
                                    <option value="10000">10,000đ</option>
                                    <option value="20000">20,000đ</option>
                                    <option value="30000">30,000đ</option>
                                    <option value="50000">50,000đ</option>
                                    <option value="100000">100,000đ</option>
                                    <option value="200000">200,000đ</option>
                                    <option value="300000">300,000đ</option>
                                    <option value="500000">500,000đ</option>
                                </select>
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Mã thẻ</label>
                                <input
                                    type="text"
                                    className={styles.input}
                                    placeholder="Nhập mã thẻ"
                                    value={formData.cardCode}
                                    onChange={(e) => handleInputChange('cardCode', e.target.value)}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Mã serial</label>
                                <input
                                    type="text"
                                    className={styles.input}
                                    placeholder="Nhập mã serial"
                                    value={formData.serial}
                                    onChange={(e) => handleInputChange('serial', e.target.value)}
                                />
                            </div>

                            <button className={styles.submitButton} onClick={handleSubmit}>
                                Xác nhận
                            </button>
                        </div>
                    </div>

                    {/* Lịch sử nạp thẻ */}
                    <div className={styles.historySection}>
                        <h3 className={styles.sectionTitle}>Lịch sử nạp thẻ</h3>
                        <div className={styles.historyTable}>
                            <div className={styles.tableHeader}>
                                <div className={styles.headerCell}>#ID</div>
                                <div className={styles.headerCell}>NHÀ MẠNG</div>
                                <div className={styles.headerCell}>MỆNH GIÁ</div>
                                <div className={styles.headerCell}>NHẬN ĐƯỢC</div>
                                <div className={styles.headerCell}>TRẠNG THÁI</div>
                                <div className={styles.headerCell}>NGÀY TẠO</div>
                            </div>
                            <div className={styles.emptyRow}>
                                <span>Không có bản ghi nào</span>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {selectedMethod === 'bank' && (
                <>
                    <div className={styles.amountSection}>
                        <h3 className={styles.sectionTitle}>Chọn mệnh giá</h3>
                        <div className={styles.amountGrid}>
                            {amounts.map((item, index) => (
                                <div
                                    key={index}
                                    className={`${styles.amountCard} ${selectedAmount === item.price ? styles.selected : ''}`}
                                    onClick={() => handleAmountSelect(item.price)}
                                >
                                    <div className={styles.amountPrice}>{formatCurrency(item.price)}</div>
                                    <div className={styles.amountDivider}>⸺ Nhận ⸺</div>
                                    <div className={styles.amountCoins}>{formatCoins(item.coins)}</div>
                                </div>
                            ))}
                        </div>
                        <button className={styles.paymentButton} disabled={!selectedAmount}>
                            Thanh toán
                        </button>
                        <div className={styles.paymentNote}>
                            Lưu ý khi thanh toán: Giao dịch trên hoàn toàn được kiểm duyệt tự động, yêu cầu kiểm tra kỹ nội dung
                            chuyển tiền trước khi thực hiện chuyển tiền. Nếu ghi thiếu, sai hoặc quá 10 phút không thấy cộng tiền, các bạn
                            hãy liên hệ với Fanpage để được hỗ trợ
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Recharge; 