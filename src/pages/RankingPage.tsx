import React, { useState } from 'react';
import styles from './RankingPage.module.css';
import avatar from '../assets/images/avatar.gif';

type RankingTab = 'cao-thu' | 'tai-phu' | 'nap-su-kien';

interface RankingData {
  top: number;
  name: string;
  level: number;
}

const RankingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<RankingTab>('cao-thu');

  const rankingData: RankingData[] = [
    { top: 1, name: 'GOIBODICON', level: 139 },
    { top: 2, name: 'PHAPSUBANG', level: 139 },
    { top: 3, name: 'AHIHIII', level: 139 },
    { top: 4, name: 'HANLAOMA', level: 139 },
    { top: 5, name: 'TRUMTOINE', level: 139 },
    { top: 6, name: 'BOCUACON', level: 139 },
    { top: 7, name: 'TROIDANH', level: 139 },
    { top: 8, name: 'CHIENHINH', level: 139 },
    { top: 9, name: 'AHUHUU', level: 139 },
    { top: 10, name: 'DANHLEE', level: 139 },
  ];

  const getTopColor = (top: number): string => {
    switch (top) {
      case 1:
        return styles.topOne;
      case 2:
        return styles.topTwo;
      case 3:
        return styles.topThree;
      default:
        return '';
    }
  };

  return (
    <div className={styles.rankingPage}>
      <div className={styles.pageContainer}>
        <div className={styles.avatarSection}>
          <img src={avatar} alt="Admin" className={styles.avatar} />
          <div className={styles.adminLabel}>Admin</div>
        </div>

        <div className={styles.rankingSection}>
          <div className={styles.container}>
            <h1 className={styles.title}>BẢNG XẾP HẠNG</h1>
            
            <div className={styles.tabs}>
              <button 
                className={`${styles.tab} ${activeTab === 'cao-thu' ? styles.active : ''}`}
                onClick={() => setActiveTab('cao-thu')}
              >
                TOP Cao Thủ
              </button>
              <button 
                className={`${styles.tab} ${activeTab === 'tai-phu' ? styles.active : ''}`}
                onClick={() => setActiveTab('tai-phu')}
              >
                TOP Tài Phú
              </button>
              <button 
                className={`${styles.tab} ${activeTab === 'nap-su-kien' ? styles.active : ''}`}
                onClick={() => setActiveTab('nap-su-kien')}
              >
                TOP Nạp Sự Kiện
              </button>
            </div>

            <div className={styles.tableContainer}>
              <table className={styles.rankingTable}>
                <thead>
                  <tr>
                    <th>TOP</th>
                    <th>Nhân vật</th>
                    <th>Cấp độ</th>
                  </tr>
                </thead>
                <tbody>
                  {rankingData.map((item) => (
                    <tr key={item.top}>
                      <td className={`${styles.rankNumber} ${getTopColor(item.top)}`}>
                        {item.top}
                      </td>
                      <td className={getTopColor(item.top)}>{item.name}</td>
                      <td className={getTopColor(item.top)}>{item.level}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingPage; 