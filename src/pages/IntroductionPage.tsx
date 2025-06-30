import React from 'react';
import Introduction from '../components/Introduction/Introduction';
import styles from './IntroductionPage.module.css';

const IntroductionPage: React.FC = () => {
  return (
    <div className={styles.introductionPage}>
      <Introduction />
    </div>
  );
};

export default IntroductionPage; 