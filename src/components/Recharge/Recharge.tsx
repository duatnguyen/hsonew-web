import React, { useState } from 'react';
import styles from './Recharge.module.css';

type PaymentMethod = 'bank' | 'card';

const Recharge: React.FC = () => {
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('card');
    const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
    const [customAmount, setCustomAmount] = useState<string>('');
    const [formData, setFormData] = useState({
        provider: '',
        amount: '',
        cardCode: '',
        serial: ''
    });

    const amounts = [
        { price: 20000, gems: 26000 },
        { price: 50000, gems: 65000 },
        { price: 100000, gems: 130000 },
        { price: 200000, gems: 260000 },
        { price: 500000, gems: 650000 },
        { price: 1000000, gems: 1300000 },
        { price: 2000000, gems: 2600000 },
        { price: 5000000, gems: 6500000 },
        { price: 10000000, gems: 13000000 }
    ];

    // Dữ liệu bảng giá nạp thẻ
    const priceTableData = [
        { amount: '10.000đ', cardRecharge: '9.000', atmRecharge: '13.000' },
        { amount: '20.000đ', cardRecharge: '18.000', atmRecharge: '26.000' },
        { amount: '30.000đ', cardRecharge: '27.000', atmRecharge: '39.000' },
        { amount: '50.000đ', cardRecharge: '45.000', atmRecharge: '65.000' },
        { amount: '100.000đ', cardRecharge: '90.000', atmRecharge: '130.000' },
        { amount: '200.000đ', cardRecharge: '180.000', atmRecharge: '260.000' },
        { amount: '300.000đ', cardRecharge: '270.000', atmRecharge: '390.000' },
        { amount: '500.000đ', cardRecharge: '450.000', atmRecharge: '650.000' },
        { amount: '1.000.000đ', cardRecharge: '900.000', atmRecharge: '1.300.000' }
    ];

    const handleMethodSelect = (method: PaymentMethod) => {
        setSelectedMethod(method);
        setSelectedAmount(null);
        setCustomAmount('');
        setFormData({ provider: '', amount: '', cardCode: '', serial: '' });
    };

    const handleAmountSelect = (amount: number) => {
        setSelectedAmount(amount);
        setCustomAmount('');
        setFormData(prev => ({ ...prev, amount: amount.toString() }));
    };

    const handleCustomAmountChange = (value: string) => {
        // Chỉ cho phép số
        const numericValue = value.replace(/[^0-9]/g, '');
        setCustomAmount(numericValue);
        setSelectedAmount(null);
    };

    const calculateGemsFromAmount = (amount: number) => {
        return Math.floor(amount * 1.3); // +30%
    };

    const getDisplayAmount = () => {
        if (customAmount && parseInt(customAmount) > 0) {
            return parseInt(customAmount);
        }
        return selectedAmount;
    };

    const getDisplayGems = () => {
        const amount = getDisplayAmount();
        if (amount) {
            return calculateGemsFromAmount(amount);
        }
        return 0;
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

    const formatGems = (gems: number) => {
        return new Intl.NumberFormat('vi-VN').format(gems) + ' Ngọc';
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

            {/* Bảng giá nạp thẻ */}
            <div className={styles.priceTableSection}>
                <h3 className={styles.priceTableTitle}>Bảng Giá Nạp Thẻ</h3>
                <div className={styles.priceTableContainer}>
                    <div className={styles.priceTable}>
                        <div className={styles.priceTableHeader}>
                            <div className={styles.priceHeaderCell}>Mệnh giá</div>
                            <div className={styles.priceHeaderCell}>Thẻ Cào (Ngọc)</div>
                            <div className={styles.priceHeaderCell}>ATM (Ngọc)</div>
                        </div>
                        {priceTableData.map((row, index) => (
                            <div key={index} className={`${styles.priceTableRow} ${index % 2 === 0 ? styles.evenRow : styles.oddRow}`}>
                                <div className={styles.priceTableCell}>{row.amount}</div>
                                <div className={styles.priceTableCell}>{row.cardRecharge}</div>
                                <div className={styles.priceTableCell}>{row.atmRecharge}</div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.priceTableNote}>
                        <p>💳 <strong>ATM:</strong> Nhận +30% mệnh giá (1.000đ = 1.300 Ngọc)</p>
                        <p>🎫 <strong>Thẻ Cào:</strong> Nhận 90% mệnh giá (1.000đ = 900 Ngọc)</p>
                        <p>🔄 <strong>Lưu ý:</strong> Tỷ lệ quy đổi có thể thay đổi theo từng thời điểm</p>
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
                                    <div className={styles.amountCoins}>{formatGems(item.gems)}</div>
                                </div>
                            ))}
                        </div>
                        
                        {/* Custom Amount Input */}
                        <div className={styles.customAmountSection}>
                            <h4 className={styles.customAmountTitle}>Hoặc nhập mệnh giá tùy chỉnh</h4>
                            <div className={styles.customAmountForm}>
                                <div className={styles.customAmountInput}>
                                    <input
                                        type="text"
                                        placeholder="Nhập số tiền (VNĐ)"
                                        value={customAmount}
                                        onChange={(e) => handleCustomAmountChange(e.target.value)}
                                        className={styles.customInput}
                                    />
                                    <span className={styles.currencyLabel}></span>
                                </div>
                                {customAmount && parseInt(customAmount) > 0 && (
                                    <div className={styles.customAmountResult}>
                                        <div className={styles.resultAmount}>
                                            {formatCurrency(parseInt(customAmount))}
                                        </div>
                                        <div className={styles.resultArrow}>⟹</div>
                                        <div className={styles.resultGems}>
                                            {formatGems(calculateGemsFromAmount(parseInt(customAmount)))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <button 
                            className={styles.paymentButton} 
                            disabled={!getDisplayAmount()}
                        >
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