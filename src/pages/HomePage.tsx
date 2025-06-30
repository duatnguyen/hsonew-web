import React from 'react';
import Introduction from '../components/Introduction/Introduction';
import PostList from '../components/Posts/PostList';
import styles from './HomePage.module.css';

const HomePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <PostList />
        <Introduction />
      </div>
    </div>
  );
};

export default HomePage; 