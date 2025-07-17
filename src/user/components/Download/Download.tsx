import React from 'react';
import styles from './Download.module.css';
// import javaIcon from '../../assets/images/java.png';
// import androidIcon from '../../assets/images/apk.png';
// import iosIcon from '../../assets/images/avatar.gif';
// import pcIcon from '../../assets/images/pc.png';

interface Platform {
  id: string;
  name: string;
  icon: string;
  description: string;
  requirements: string[];
  versions: {
    version: string;
    type?: string;
    size: string;
    downloadUrl: string;
  }[];
}

const platforms: Platform[] = [
  {
    id: 'java',
    name: 'Java (SPEED)',
    icon: '📱',
    description: 'Phiên bản tối ưu cho điện thoại Java',
    requirements: [
      'Java MIDP 2.0',
      'Bộ nhớ: 2MB',
      'Kết nối: 2G'
    ],
    versions: [
      {
        version: '301',
        type: 'X1',
        size: '1.2MB',
        downloadUrl: 'https://hsonew.xyz/download/HSONEWspeedJarX1.jar'
      },
      {
        version: '301',
        type: 'X3',
        size: '1.5MB',
        downloadUrl: 'https://hsonew.xyz/download/HSONEWspeedX3.jar'
      }
    ]
  },
  {
    id: 'android',
    name: 'Android',
    icon: '🤖',
    description: 'Phiên bản dành cho thiết bị Android',
    requirements: [
      'Android 5.0+',
      'RAM: 2GB',
      'Bộ nhớ: 500MB'
    ],
    versions: [
      {
        version: '280',
        size: '45MB',
        downloadUrl: 'https://hsonew.xyz/download/HSONEW.apk'
      }
    ]
  },
  {
    id: 'ios',
    name: 'iOS',
    icon: '🍎',
    description: 'Phiên bản iOS tối ưu cho thiết bị Apple',
    requirements: [
      'iOS 12.0+',
      'iPhone 6s+',
      'Bộ nhớ: 1GB'
    ],
    versions: [
      {
        version: '301',
        size: '52MB',
        downloadUrl: 'https://hsonew.xyz/download/HSONEW.ipa'
      }
    ]
  },
  {
    id: 'pc',
    name: 'PC Windows',
    icon: '🖥️',
    description: 'Phiên bản PC với đồ họa full HD',
    requirements: [
      'Windows 7/8/10/11',
      'RAM: 4GB',
      'Bộ nhớ: 1GB'
    ],
    versions: [
      {
        version: '301',
        size: '125MB',
        downloadUrl: 'https://hsonew.xyz/download/HSONEW_PC.rar'
      }
    ]
  }
];

const Download: React.FC = () => {
  return (
    <div className={styles.downloadPage}>
      <div className={styles.header}>
        <h1>Tải Game</h1>
        <p>Chọn phiên bản phù hợp với thiết bị của bạn</p>
      </div>

      <div className={styles.platforms}>
        {platforms.map((platform) => (
          <div key={platform.id} className={styles.platformCard}>
            <div className={styles.platformHeader}>
              <span className={styles.platformIcon}>{platform.icon}</span>
              <h2>{platform.name}</h2>
            </div>

            <p className={styles.description}>{platform.description}</p>

            <div className={styles.requirements}>
              <h3>Yêu cầu</h3>
              <ul>
                {platform.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>

            {platform.versions.map((version, index) => (
              <div key={index} className={styles.versionSection}>
                <div className={styles.versionInfo}>
                  <div className={styles.versionHeader}>
                    <span className={styles.versionNumber}>
                      v{version.version} {version.type && `(${version.type})`}
                    </span>
                    <span className={styles.versionMeta}>
                      {version.size}
                    </span>
                  </div>
                </div>

                <a 
                  href={version.downloadUrl}
                  className={styles.downloadButton}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className={styles.downloadIcon}>⬇️</span>
                  Tải
                </a>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className={styles.notice}>
        <h3>Lưu ý</h3>
        <ul>
          <li>Vui lòng tải game từ nguồn chính thức</li>
          <li>Cập nhật phiên bản mới nhất</li>
          <li>Liên hệ hỗ trợ nếu gặp sự cố</li>
        </ul>
      </div>
    </div>
  );
};

export default Download; 