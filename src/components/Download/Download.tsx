import React from 'react';
import styles from './Download.module.css';
// import javaIcon from '../../assets/images/java.png';
// import androidIcon from '../../assets/images/apk.png';
// import iosIcon from '../../assets/images/avatar.gif';
// import pcIcon from '../../assets/images/pc.png';

interface DownloadButtonProps {
  version: string;
  type?: string;
  downloadUrl: string;
  icon?: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ version, type, downloadUrl, icon }) => (
  <a 
    href={downloadUrl}
    className={styles.downloadButton}
    target="_blank"
    rel="noopener noreferrer"
  >
    {icon && <img src={icon} alt="platform" className={styles.platformIcon} />}
    {`HSONEW ${version}${type ? ` ${type}` : ''}`}
  </a>
);

interface DownloadSectionProps {
  title: string;
  description: string;
  buttons: { version: string; type?: string; downloadUrl: string }[];
  icon?: string;
}

const DownloadSection: React.FC<DownloadSectionProps> = ({ title, description, buttons, icon }) => (
  <div className={styles.downloadSection}>
    <h2>{title}</h2>
    <p>{description}</p>
    <div className={styles.buttonContainer}>
      {buttons.map((btn, index) => (
        <DownloadButton 
          key={index} 
          version={btn.version} 
          type={btn.type} 
          downloadUrl={btn.downloadUrl}
          icon={icon}
        />
      ))}
    </div>
  </div>
);

const Download: React.FC = () => {
  const sections = [
    {
      title: 'Tải game cho Java (ver SPEED)',
      description: 'Nhấn vào đây để tải game cho điện thoại Java của bạn.',
    //   icon: javaIcon,
      buttons: [
        { 
          version: '301', 
          type: 'X1',
          downloadUrl: 'https://hsonew.xyz/download/HSONEWspeedJarX1.jar'
        },
        { 
          version: '301', 
          type: 'X3',
          downloadUrl: 'https://hsonew.xyz/download/HSONEWspeedX3.jar'
        },
      ]
    },
    {
      title: 'Tải game cho Android (APK)',
      description: 'Nhấn vào đây để tải game cho điện thoại Android của bạn.',
    //   icon: androidIcon,
      buttons: [{ 
        version: '280',
        downloadUrl: 'https://hsonew.xyz/download/HSONEW.apk'
      }]
    },
    {
      title: 'Tải game cho IOS (IPA)',
      description: 'Nhấn vào đây để tải game cho điện thoại IOS của bạn.',
    //   icon: iosIcon,
      buttons: [{ 
        version: '301',
        downloadUrl: 'https://hsonew.xyz/download/HSONEW.ipa'
      }]
    },
    {
      title: 'Tải game cho PC (EXE)',
      description: 'Nhấn vào đây để tải game cho máy tính để bàn của bạn.',
    //   icon: pcIcon,
      buttons: [{ 
        version: '301',
        downloadUrl: 'https://hsonew.xyz/download/HSONEW_PC.rar'
      }]
    },
  ];

  return (
    <div className={styles.downloadContainer}>
      {sections.map((section, index) => (
        <DownloadSection
          key={index}
          title={section.title}
          description={section.description}
          buttons={section.buttons}
        //   icon={section.icon}
        />
      ))}
    </div>
  );
};

export default Download; 