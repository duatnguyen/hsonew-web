import React from 'react';
import styles from './Introduction.module.css';

const Introduction: React.FC = () => {
  const characterClasses = [
    {
      name: 'Chiến Binh',
      description: 'Dũng mãnh và kiên cường, là lá chắn bảo vệ đồng đội',
      features: ['Sức mạnh vượt trội', 'Phòng thủ cao', 'Kỹ năng khống chế']
    },
    {
      name: 'Pháp Sư',
      description: 'Thông thạo ma pháp, làm chủ sức mạnh nguyên tố',
      features: ['Sát thương phép mạnh', 'Kỹ năng diện rộng', 'Hỗ trợ đồng đội']
    },
    {
      name: 'Sát Thủ',
      description: 'Nhanh nhẹn và chết chóc, chuyên gia đột kích',
      features: ['Tốc độ cao', 'Sát thương tức thời', 'Khả năng ẩn thân']
    },
    {
      name: 'Xạ Thủ',
      description: 'Thiện xạ từ xa, kiểm soát chiến trường',
      features: ['Tầm đánh xa', 'Sát thương ổn định', 'Kỹ năng kiểm soát']
    }
  ];

  const gameFeatures = [
    {
      title: 'Thế Giới Mở Rộng Lớn',
      description: 'Khám phá các vùng đất huyền bí, từ sa mạc khô cằn đến rừng rậm nhiệt đới',
      icon: '🗺️'
    },
    {
      title: 'Nhiệm Vụ Đa Dạng',
      description: 'Hàng trăm nhiệm vụ với cốt truyện hấp dẫn và phần thưởng giá trị',
      icon: '📜'
    },
    {
      title: 'Boss Thế Giới',
      description: 'Thách thức các Boss khủng với phần thưởng độc quyền',
      icon: '👾'
    },
    {
      title: 'Hoạt Động Liên Server',
      description: 'Tham gia các sự kiện PvP, Guild War quy mô lớn',
      icon: '⚔️'
    }
  ];

  return (
    <div className={styles.introduction}>
      <div className={styles.heroSection}>
        <h1 className={styles.mainTitle}>Thời Đại Hiệp Sĩ</h1>
        <p className={styles.subtitle}>
          Bước vào thế giới phiêu lưu đầy màu sắc, nơi những huyền thoại được viết nên
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Về Trò Chơi</h2>
        <div className={styles.content}>
          <p className={styles.highlight}>
            Thời Đại Hiệp Sĩ là một MMORPG 2D đỉnh cao, kết hợp hoàn hảo giữa đồ họa hoài cổ và 
            gameplay hiện đại. Trò chơi mang đến trải nghiệm nhập vai sâu sắc trong một thế giới 
            giả tưởng đầy màu sắc.
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Lớp Nhân Vật</h2>
        <div className={styles.classesGrid}>
          {characterClasses.map((characterClass, index) => (
            <div key={index} className={styles.classCard}>
              <h3>{characterClass.name}</h3>
              <p>{characterClass.description}</p>
              <ul>
                {characterClass.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Tính Năng Nổi Bật</h2>
        <div className={styles.featuresGrid}>
          {gameFeatures.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <span className={styles.featureIcon}>{feature.icon}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Hoạt Động Xã Hội</h2>
        <div className={styles.socialFeatures}>
          <div className={styles.socialCard}>
            <h3>🏰 Bang Hội</h3>
            <p>Tham gia hoặc thành lập bang hội, xây dựng cộng đồng game thủ</p>
          </div>
          <div className={styles.socialCard}>
            <h3>💑 Kết Hôn</h3>
            <p>Tìm kiếm một nửa của bạn trong game, tổ chức đám cưới hoành tráng</p>
          </div>
          <div className={styles.socialCard}>
            <h3>💰 Giao Dịch</h3>
            <p>Hệ thống giao dịch an toàn, mua bán trang bị với người chơi khác</p>
          </div>
        </div>
      </div>

      <div className={styles.ctaSection}>
        <h2>Sẵn sàng bắt đầu cuộc phiêu lưu?</h2>
        <p>Tham gia ngay để trở thành một phần của thế giới Thời Đại Hiệp Sĩ!</p>
        <button className={styles.ctaButton}>Tải Game Ngay</button>
      </div>
    </div>
  );
};

export default Introduction; 