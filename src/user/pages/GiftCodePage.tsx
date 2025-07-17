import React, { useState, useEffect } from 'react';
import styles from './GiftCodePage.module.css';
import { FaGift, FaClock, FaUsers, FaCopy, FaCheck, FaGem, FaCoins, FaBoxOpen } from 'react-icons/fa';
import axios from 'axios';

interface GiftItem {
    id: number;
    name: string;
    quantity: number;
}

interface GiftCode {
    id: number;
    giftname: string;
    items: GiftItem[];
    vang: number;
    ngoc: number;
    limitUse: number;
    endTime: string;
}

const GiftCodePage: React.FC = () => {
    const [copiedCode, setCopiedCode] = useState<string | null>(null);
    const [giftCodes, setGiftCodes] = useState<GiftCode[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState<'all' | 'active' | 'expired'>('all');

    // Fetch giftcodes theo filter
    useEffect(() => {
        setLoading(true);
        setError('');
        const API_URL = import.meta.env.VITE_API_URL;
        const url = `${API_URL}/api/giftcodes`;
        axios.get<GiftCode[]>(url)
            .then(res => {
                if (Array.isArray(res.data)) {
                    setGiftCodes(res.data);
                } else if (res.data && typeof res.data === 'object') {
                    setGiftCodes([res.data]);
                } else if (res.data == null) {
                    setGiftCodes([]);
                } else {
                    setGiftCodes([]);
                }
                setLoading(false);
            })
            .catch((err) => {
                setError('Không thể tải danh sách giftcode.');
                setLoading(false);
                console.error('GiftCode API error:', err);
            });
    }, [filter]);

    const handleCopyCode = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    // Trạng thái còn hạn/hết hạn
    const getStatus = (gift: GiftCode) => {
        const now = new Date();
        const end = new Date(gift.endTime);
        return end > now ? 'active' : 'expired';
    };

    // Lọc theo trạng thái
    const filteredGiftCodes = giftCodes.filter(gift => {
        if (filter === 'all') return true;
        const status = getStatus(gift);
        return status === filter;
    });

    // Hiển thị phần thưởng
    const renderRewards = (gift: GiftCode) => {
        const rewards: React.ReactNode[] = [];
        if (gift.ngoc > 0) rewards.push(<div key="ngoc"><FaGem /> Ngọc: <b>{gift.ngoc.toLocaleString()}</b></div>);
        if (gift.vang > 0) rewards.push(<div key="vang"><FaCoins /> Vàng: <b>{gift.vang.toLocaleString()}</b></div>);
        if (gift.items && gift.items.length > 0) rewards.push(
            <div key="items">Vật phẩm:
                <ul className={styles.rewardList}>
                    {gift.items.map((item) => <li key={item.id}><FaBoxOpen /> {item.name} x{item.quantity}</li>)}
                </ul>
            </div>
        );
        return rewards.length > 0 ? rewards : <div>Không có phần thưởng</div>;
    };

    // Hiển thị thời gian
    const formatDate = (date: string) => {
        if (!date) return '';
        const d = new Date(date);
        return d.toLocaleString('vi-VN');
    };

    return (
        <div className={styles.giftCodePage}>
            <div className={styles.pageHeader}>
                <div className={styles.headerContent}>
                    <h1><FaGift /> Gift Code</h1>
                    <p>Nhập mã để nhận quà độc quyền</p>
                </div>
                <div className={styles.filterButtons}>
                    <button
                        className={`${styles.filterButton} ${filter === 'all' ? styles.active : ''}`}
                        onClick={() => setFilter('all')}
                    >Tất Cả</button>
                    <button
                        className={`${styles.filterButton} ${filter === 'active' ? styles.active : ''}`}
                        onClick={() => setFilter('active')}
                    >Còn Hiệu Lực</button>
                    <button
                        className={`${styles.filterButton} ${filter === 'expired' ? styles.active : ''}`}
                        onClick={() => setFilter('expired')}
                    >Đã Hết Hạn</button>
                </div>
            </div>

            {loading ? (
                <div className={styles.loading}>Đang tải giftcode...</div>
            ) : error ? (
                <div className={styles.error}>{error}</div>
            ) : (
                <div className={styles.giftCodeGrid}>
                    {filteredGiftCodes.length === 0 ? (
                        <div className={styles.empty}>Không có giftcode nào.</div>
                    ) : filteredGiftCodes.map((giftCode) => {
                        const status = getStatus(giftCode);
                        return (
                            <div
                                key={giftCode.id}
                                className={`${styles.giftCodeCard} ${status === 'expired' ? styles.expired : ''}`}
                            >
                                <div className={styles.cardHeader}>
                                    <h2>{giftCode.giftname}</h2>
                                    <span className={styles.statusBadge}>
                                        {status === 'active' ? 'Còn Hiệu Lực' : 'Đã Hết Hạn'}
                                    </span>
                                </div>

                                <div className={styles.codeSection}>
                                    <div className={styles.codeDisplay}>
                                        <span>{giftCode.giftname.toUpperCase()}</span>
                                        <button
                                            className={styles.copyButton}
                                            onClick={() => handleCopyCode(giftCode.giftname)}
                                            title="Sao chép mã"
                                        >
                                            {copiedCode === giftCode.giftname ? <FaCheck /> : <FaCopy />}
                                        </button>
                                    </div>
                                </div>

                                <div className={styles.rewardsList}>
                                    {renderRewards(giftCode)}
                                </div>

                                <div className={styles.cardFooter}>
                                    <div className={styles.footerItem}>
                                        <FaClock />
                                        <span>Hết hạn: {formatDate(giftCode.endTime)}</span>
                                    </div>
                                    <div className={styles.footerItem}>
                                        <FaUsers />
                                        <span>Giới hạn: {giftCode.limitUse}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default GiftCodePage;