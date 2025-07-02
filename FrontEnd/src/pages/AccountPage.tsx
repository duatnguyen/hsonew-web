import React from 'react';
import AccountManagement from '../components/Account/AccountManagement';
import TransactionHistory from '../components/Account/TransactionHistory';
import styles from './AccountPage.module.css';

const AccountPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <AccountManagement />
        <TransactionHistory />
      </div>
    </div>
  );
};

export default AccountPage; 