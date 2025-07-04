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

  const getTopClass = (top: number): string => {
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

  const getTabIcon = (tab: RankingTab): string => {
    switch (tab) {
      case 'cao-thu':
        return '⚔️';
      case 'tai-phu':
        return '💰';
      case 'nap-su-kien':
        return '🎁';
      default:
        return '📊';
    }
  };

  const renderRankBadge = (top: number) => {
    let crown = '';
    switch (top) {
      case 1:
        crown = '👑';
        break;
      case 2:
        crown = '🥈';
        break;
      case 3:
        crown = '🥉';
        break;
    }

    return (
      <div className={styles.rankNumber}>
        {top <= 3 ? (
          <>
            <span className={styles.crown}>{crown}</span>
            <div className={styles.rankBadge}>#{top}</div>
          </>
        ) : (
          <div className={styles.rankBadge}>#{top}</div>
        )}
      </div>
    );
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
                <span>{getTabIcon('cao-thu')} TOP Cao Thủ</span>
              </button>
              <button 
                className={`${styles.tab} ${activeTab === 'tai-phu' ? styles.active : ''}`}
                onClick={() => setActiveTab('tai-phu')}
              >
                <span>{getTabIcon('tai-phu')} TOP Tài Phú</span>
              </button>
              <button 
                className={`${styles.tab} ${activeTab === 'nap-su-kien' ? styles.active : ''}`}
                onClick={() => setActiveTab('nap-su-kien')}
              >
                <span>{getTabIcon('nap-su-kien')} TOP Nạp Sự Kiện</span>
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
                    <tr key={item.top} className={getTopClass(item.top)}>
                      <td>
                        {renderRankBadge(item.top)}
                      </td>
                      <td>{item.name}</td>
                      <td>Lv.{item.level}</td>
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