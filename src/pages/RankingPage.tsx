import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './RankingPage.module.css';
import avatar from '../assets/images/avatar.gif';

type RankingTab = 'cao-thu' | 'tai-phu' | 'danh-vong' | 'tieu-sai' | 'san-boss';

interface RankingData {
  name: string;
  clazz: number;
  level: number;
  kimcuong: number;
  vang: number;
  pointArena: number;
  pointDanhVong: number;
  pointNapKcSave: number;
  pointUseKcSave: number;
  pointSanBoss: number;
}

const RankingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<RankingTab>('cao-thu');
  const [data, setData] = useState<{ [key: string]: RankingData[] }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await axios.get('http://localhost:8080/api/rankings');
        setData(res.data);
      } catch (err: any) {
        setError('Không thể tải dữ liệu bảng xếp hạng');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getTabIcon = (tab: RankingTab): string => {
    switch (tab) {
      case 'cao-thu':
        return '⚔️';
      case 'tai-phu':
        return '💰';
      case 'danh-vong':
        return '🏆';
      case 'tieu-sai':
        return '🛒';
      case 'san-boss':
        return '🐲';
      default:
        return '📊';
    }
  };

  // Map tab to API key
  const tabKeyMap: Record<RankingTab, string> = {
    'cao-thu': 'level',
    'tai-phu': 'point_nap_kc_save',
    'danh-vong': 'point_danh_vong',
    'tieu-sai': 'point_use_kc_save',
    'san-boss': 'point_san_boss',
  };

  const rankingData: RankingData[] = data[tabKeyMap[activeTab]] || [];

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

  // Table columns for each tab
  const columns: Record<RankingTab, { label: string; value: (item: RankingData, idx: number) => React.ReactNode }[]> = {
    'cao-thu': [
      { label: 'TOP', value: (_item, idx) => renderRankBadge(idx + 1) },
      { label: 'Nhân vật', value: item => item.name },
      { label: 'Cấp độ', value: item => `Lv.${item.level}` },
    ],
    'tai-phu': [
      { label: 'TOP', value: (_item, idx) => renderRankBadge(idx + 1) },
      { label: 'Nhân vật', value: item => item.name },
      { label: 'Điểm Nạp KC', value: item => item.pointNapKcSave },
    ],
    'danh-vong': [
      { label: 'TOP', value: (_item, idx) => renderRankBadge(idx + 1) },
      { label: 'Nhân vật', value: item => item.name },
      { label: 'Điểm Danh vọng', value: item => item.pointDanhVong },
    ],
    'tieu-sai': [
      { label: 'TOP', value: (_item, idx) => renderRankBadge(idx + 1) },
      { label: 'Nhân vật', value: item => item.name },
      { label: 'Điểm Tiêu KC', value: item => item.pointUseKcSave },
    ],
    'san-boss': [
      { label: 'TOP', value: (_item, idx) => renderRankBadge(idx + 1) },
      { label: 'Nhân vật', value: item => item.name },
      { label: 'Điểm Săn Boss', value: item => item.pointSanBoss },
    ],
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
              <button className={`${styles.tab} ${activeTab === 'cao-thu' ? styles.active : ''}`} onClick={() => setActiveTab('cao-thu')}>
                <span>{getTabIcon('cao-thu')} TOP Cao Thủ</span>
              </button>
              <button className={`${styles.tab} ${activeTab === 'tai-phu' ? styles.active : ''}`} onClick={() => setActiveTab('tai-phu')}>
                <span>{getTabIcon('tai-phu')} TOP Tài Phú</span>
              </button>
              <button className={`${styles.tab} ${activeTab === 'danh-vong' ? styles.active : ''}`} onClick={() => setActiveTab('danh-vong')}>
                <span>{getTabIcon('danh-vong')} TOP Danh Vọng</span>
              </button>
              <button className={`${styles.tab} ${activeTab === 'tieu-sai' ? styles.active : ''}`} onClick={() => setActiveTab('tieu-sai')}>
                <span>{getTabIcon('tieu-sai')} TOP Tiêu Sài</span>
              </button>
              <button className={`${styles.tab} ${activeTab === 'san-boss' ? styles.active : ''}`} onClick={() => setActiveTab('san-boss')}>
                <span>{getTabIcon('san-boss')} TOP Săn Boss</span>
              </button>
            </div>

            <div className={styles.tableContainer}>
              {loading ? (
                <div>Đang tải dữ liệu...</div>
              ) : error ? (
                <div className={styles.error}>{error}</div>
              ) : (
                <table className={styles.rankingTable}>
                  <thead>
                    <tr>
                      {columns[activeTab].map((col, idx) => (
                        <th key={idx}>{col.label}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rankingData.map((item, idx) => (
                      <tr key={item.name} className={getTopClass(idx + 1)}>
                        {columns[activeTab].map((col, colIdx) => (
                          <td key={colIdx}>{col.value(item, idx)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingPage;