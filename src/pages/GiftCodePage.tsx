import React, { useState } from 'react';
import styles from './GiftCodePage.module.css';
import { FaGift, FaClock, FaUsers, FaCopy, FaCheck } from 'react-icons/fa';

interface GiftCode {
    id: number;
    code: string;
    title: string;
    rewards: {
        type: 'ngoc' | 'pet' | 'mount' | 'item';
        name: string;
        amount?: number;
        duration?: string;
    }[];
    expiryDate: string;
    status: 'active' | 'expired';
    usageLimit: number;
    usageCount: number;
}

const GiftCodePage: React.FC = () => {
    const [filter, setFilter] = useState<'all' | 'active' | 'expired'>('all');
    const [copiedCode, setCopiedCode] = useState<string | null>(null);

    const giftCodes: GiftCode[] = [
        {
            id: 1,
            code: 'HTHS2024KM',
            title: 'Gift Code Khai Trương',
            rewards: [
                { type: 'ngoc', name: 'Ngọc Xanh', amount: 50000 },
                { type: 'mount', name: 'Voi Ma Mút', duration: '7 ngày' },
                { type: 'pet', name: 'Mèo', duration: '3 ngày' },
            ],
            expiryDate: '30-06-2024',
            status: 'active',
            usageLimit: 1000,
            usageCount: 450
        },
        {
            id: 2,
            code: 'HTHS2024VIP',
            title: 'Gift Code VIP Member',
            rewards: [
                { type: 'ngoc', name: 'Ngọc Xanh', amount: 100000 },
                { type: 'mount', name: 'Rồng Lửa', duration: '15 ngày' },
                { type: 'pet', name: 'Phượng Hoàng', duration: '7 ngày' },
                { type: 'item', name: 'Thuốc Tăng Exp', amount: 10 },
            ],
            expiryDate: '31-07-2024',
            status: 'active',
            usageLimit: 500,
            usageCount: 123
        },
        {
            id: 3,
            code: 'HTHS2024TET',
            title: 'Gift Code Tết 2024',
            rewards: [
                { type: 'ngoc', name: 'Ngọc Xanh', amount: 30000 },
                { type: 'pet', name: 'Dê Con', duration: '3 ngày' },
                { type: 'item', name: 'Thuốc Tăng Exp', amount: 5 },
            ],
            expiryDate: '15-02-2024',
            status: 'expired',
            usageLimit: 2000,
            usageCount: 1985
        }
    ];

    const handleCopyCode = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    const filteredGiftCodes = giftCodes.filter(code => 
        filter === 'all' ? true : code.status === filter
    );

    const getRewardText = (reward: GiftCode['rewards'][0]) => {
        if (reward.amount && reward.duration) {
            return `${reward.amount}x ${reward.name} (${reward.duration})`;
        } else if (reward.amount) {
            return `${reward.amount.toLocaleString()}${reward.type === 'ngoc' ? '' : 'x'} ${reward.name}`;
        } else if (reward.duration) {
            return `${reward.name} (${reward.duration})`;
        }
        return reward.name;
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
                    >
                        Tất Cả
                    </button>
                    <button 
                        className={`${styles.filterButton} ${filter === 'active' ? styles.active : ''}`}
                        onClick={() => setFilter('active')}
                    >
                        Còn Hiệu Lực
                    </button>
                    <button 
                        className={`${styles.filterButton} ${filter === 'expired' ? styles.active : ''}`}
                        onClick={() => setFilter('expired')}
                    >
                        Đã Hết Hạn
                    </button>
                </div>
            </div>

            <div className={styles.giftCodeGrid}>
                {filteredGiftCodes.map((giftCode) => (
                    <div 
                        key={giftCode.id} 
                        className={`${styles.giftCodeCard} ${giftCode.status === 'expired' ? styles.expired : ''}`}
                    >
                        <div className={styles.cardHeader}>
                            <h2>{giftCode.title}</h2>
                            <span className={styles.statusBadge}>
                                {giftCode.status === 'active' ? 'Còn Hiệu Lực' : 'Đã Hết Hạn'}
                            </span>
                        </div>

                        <div className={styles.codeSection}>
                            <div className={styles.codeDisplay}>
                                <span>{giftCode.code}</span>
                                <button 
                                    className={styles.copyButton}
                                    onClick={() => handleCopyCode(giftCode.code)}
                                    title="Sao chép mã"
                                >
                                    {copiedCode === giftCode.code ? <FaCheck /> : <FaCopy />}
                                </button>
                            </div>
                        </div>

                        <div className={styles.rewardsList}>
                            {giftCode.rewards.map((reward, index) => (
                                <div key={index} className={styles.rewardItem}>
                                    {getRewardText(reward)}
                                </div>
                            ))}
                        </div>

                        <div className={styles.cardFooter}>
                            <div className={styles.footerItem}>
                                <FaClock />
                                <span>Hết hạn: {giftCode.expiryDate}</span>
                            </div>
                            <div className={styles.footerItem}>
                                <FaUsers />
                                <span>Còn lại: {giftCode.usageLimit - giftCode.usageCount}/{giftCode.usageLimit}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GiftCodePage; 