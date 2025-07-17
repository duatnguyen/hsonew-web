import React from 'react';
import AccountManagement from '../components/Account/AccountManagement';
import TransactionHistory from '../components/Account/TransactionHistory';
import styles from './AccountPage.module.css';
import { useAuth } from '../../contexts/AuthContext';

const AccountPage: React.FC = () => {
  const { user } = useAuth();
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <AccountManagement user={user} />
        <TransactionHistory user={user} />
      </div>
    </div>
  );
};

export default AccountPage; 