import React from 'react';
import Download from '../components/Download/Download';
import styles from './DownloadPage.module.css';

const DownloadPage: React.FC = () => {
  return (
    <div className={styles.downloadPage}>
      <h1 className={styles.pageTitle}>Tải Game</h1>
      <Download />
    </div>
  );
};

export default DownloadPage; 