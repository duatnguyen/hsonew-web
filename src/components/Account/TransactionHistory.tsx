import React from 'react';
import styles from './TransactionHistory.module.css';
import { useAuth } from '../../contexts/AuthContext';

interface Transaction {
  id: number;
  transactionCode: string;
  characterName: string;
  amount: number;
  gems: number;
  type: string;
  date: string;
}

const TransactionHistory: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  // Mock data - in real app this would come from an API
  const transactions: Transaction[] = [
    {
      id: 1,
      transactionCode: 'TX001',
      characterName: 'HeroKnight',
      amount: 100000,
      gems: 100,
      type: 'Card',
      date: '2024-03-20 10:30:00'
    },
    {
      id: 2,
      transactionCode: 'TX002',
      characterName: 'DragonSlayer',
      amount: 200000,
      gems: 200,
      type: 'Banking',
      date: '2024-03-19 15:45:00'
    },
    {
      id: 3,
      transactionCode: 'TX003',
      characterName: 'HeroKnight',
      amount: 500000,
      gems: 500,
      type: 'Momo',
      date: '2024-03-18 09:15:00'
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Lịch sử giao dịch</h2>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Mã giao dịch</th>
              <th>Tên nhân vật</th>
              <th>Số tiền</th>
              <th>Số ngọc nạp</th>
              <th>Loại nạp</th>
              <th>Ngày nạp</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.transactionCode}</td>
                <td>{transaction.characterName}</td>
                <td className={styles.amount}>
                  {formatCurrency(transaction.amount)}
                </td>
                <td className={styles.gems}>
                  {transaction.gems}
                </td>
                <td>
                  <span className={`${styles.type} ${styles[transaction.type.toLowerCase()]}`}>
                    {transaction.type}
                  </span>
                </td>
                <td>{formatDate(transaction.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory; 