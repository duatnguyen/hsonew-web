import axios from 'axios';
import React from 'react';
import styles from './TransactionHistory.module.css';
import { useAuth } from '../../../contexts/AuthContext';

import type { User } from '../../../contexts/AuthContext';

interface TransactionHistoryProps {
  user?: User | null;
}

interface Transaction {
  id: number;
  transactionCode: string;
  characterName: string;
  amount: number;
  gems: number;
  type: string;
  date: string;
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ user: userProp }) => {
  const context = useAuth();
  const user = userProp !== undefined ? userProp : context.user;

  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    if (!user || !user.listChar || user.listChar.length === 0) {
      setTransactions([]);
      setLoading(false);
      return;
    }

    // Xử lý listChar về đúng mảng string
    let listChar: string[] = [];
    if (Array.isArray(user.listChar)) {
      // Nếu phần tử đầu là chuỗi JSON, parse lại
      if (typeof user.listChar[0] === 'string' && user.listChar[0].startsWith('[')) {
        try {
          listChar = JSON.parse(user.listChar[0]);
        } catch {
          listChar = user.listChar.map(c => c.replace(/\[|\]|"/g, ''));
        }
      } else {
        listChar = user.listChar.map(c => c.replace(/\[|\]|"/g, ''));
      }
    }
    console.log('ListChar gửi lên API:', listChar);
    setLoading(true);
    setError('');
    const API_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem('token');
    axios.post(
      `${API_URL}/api/recharge/search-by-names`,
      listChar,
      { headers: token ? { Authorization: `Bearer ${token}` } : {} }
    )
      .then((res: { data: any }) => {
        if (Array.isArray(res.data)) {
          // Map API response to Transaction[]
          const mapped = res.data.map((item: any, idx: number) => ({
            id: item.id || idx + 1,
            transactionCode: item.code || item.transactionCode || item.id?.toString() || '',
            characterName: item.namePlayer || '',
            amount: item.soTien || 0,
            gems: item.ngocNap || 0,
            type: item.typeNap || '',
            date: item.thoiGian || '',
          }));
          setTransactions(mapped);
        } else if (res.data && typeof res.data === 'object') {
          // Nếu trả về 1 object
          setTransactions([
            {
              id: res.data.id || 1,
              transactionCode: res.data.code || res.data.transactionCode || res.data.id?.toString() || '',
              characterName: res.data.namePlayer || '',
              amount: res.data.soTien || 0,
              gems: res.data.ngocNap || 0,
              type: res.data.typeNap || '',
              date: res.data.thoiGian || '',
            }
          ]);
        } else {
          setError('Dữ liệu trả về không đúng định dạng.');
        }
        setLoading(false);
      })
      .catch((err: any) => {
        setError('Không thể tải lịch sử giao dịch.');
        setLoading(false);
        console.error('TransactionHistory API error:', err.response?.data || err);
      });
  }, [user]);

  if (!user) {
    return null;
  }

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
      {loading ? (
        <div className={styles.loading}>Đang tải...</div>
      ) : error ? (
        <div className={styles.error}>{error}</div>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Mã GD</th>
                <th>Tên nhân vật</th>
                <th>Số tiền</th>
                <th>Số ngọc</th>
                <th>Loại nạp</th>
                <th>Ngày nạp</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr><td colSpan={7}>Không có giao dịch nào.</td></tr>
              ) : transactions.map((transaction) => (
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
      )}
    </div>
  );
};

export default TransactionHistory;