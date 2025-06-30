import React from 'react';
import styles from './Introduction.module.css';

const Introduction: React.FC = () => {
  return (
    <div className={styles.introduction}>
      <h5 className={styles.sectionTitle}>Giới thiệu</h5>
      <hr />
      <div className={styles.content}>
        <p>
          🎮 Chào mừng đến với{' '}
          <strong className={styles.highlight}>Thời Đại Hiệp Sĩ</strong>! ⚔️
        </p>
        <p>
          Nếu bạn đã từng mơ ước trở thành một hiệp sĩ oai phong, phiêu lưu khắp
          chốn giang hồ, đánh bại quái vật và săn tìm kho báu, thì{' '}
          <span className={styles.highlight}>Thời Đại Hiệp Sĩ</span> chính là thế
          giới dành cho bạn! 🏰
        </p>
        <p>
          Đây là một tựa game MMORPG 2D kinh điển, nơi bạn có thể chọn một trong
          bốn lớp nhân vật đặc trưng:{' '}
          <span className={styles.highlight}>Chiến Binh</span> mạnh mẽ,{' '}
          <span className={styles.highlight}>Pháp Sư</span> quyền năng,{' '}
          <span className={styles.highlight}>Sát Thủ</span> nhanh nhẹn hoặc{' '}
          <span className={styles.highlight}>Xạ Thủ</span> tinh nhuệ. Mỗi nhân vật
          đều có những kỹ năng bá đạo và phong cách chiến đấu riêng, giúp bạn
          khẳng định bản lĩnh trên chiến trường. 🔥
        </p>
        <p className={styles.fun}>
          Còn gì vui hơn khi có thể tụ tập anh em, lập tổ đội chiến đấu với boss
          khủng, farm quái cả ngày mà không chán? Bạn còn có thể tham gia các trận
          chiến PvP gay cấn, săn đồ hiếm, giao dịch với người chơi khác và thậm
          chí kết hôn trong game! 💍🎉
        </p>
        <p>
          Với đồ họa đơn giản nhưng đầy màu sắc, cùng gameplay hấp dẫn và cộng
          đồng game thủ đông đảo,{' '}
          <span className={styles.highlight}>Thời Đại Hiệp Sĩ</span> đã trở thành
          một phần tuổi thơ của biết bao game thủ. Bạn đã sẵn sàng lên đường chinh
          phục thế giới hiệp sĩ chưa? 🏹🛡️
        </p>
        <p className={styles.fun}>
          Hãy cầm kiếm lên, trang bị giáp thật ngầu và bước vào hành trình vĩ đại
          ngay thôi! 🚀
        </p>
      </div>
    </div>
  );
};

export default Introduction; 