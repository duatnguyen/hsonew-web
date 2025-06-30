import React from 'react';
import Recharge from '../components/Recharge/Recharge';
import styles from './RechargePage.module.css';

const RechargePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Recharge />
      </div>
    </div>
  );
};

export default RechargePage; 