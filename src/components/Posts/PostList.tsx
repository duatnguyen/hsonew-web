import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './PostList.module.css';
import avatar from '../../assets/images/avatar.gif';

interface Post {
  id: number;
  title: string;
  author: string;
  category: 'news' | 'event' | 'guide';
  date: string;
  summary: string;
  views: number;
  pinned?: boolean;
}

type Category = 'all' | 'news' | 'event' | 'guide';

const CATEGORIES = [
  { id: 'all', label: 'Tất Cả', icon: '🔍' },
  { id: 'news', label: 'Tin Tức', icon: '📢' },
  { id: 'event', label: 'Sự Kiện', icon: '🎉' },
  { id: 'guide', label: 'Hướng Dẫn', icon: '📖' }
] as const;

const POSTS: Post[] = [
  {
    id: 1,
    title: '💥HSO NEW 2025 - Khai mở chính thức💥',
    author: 'ADMIN',
    category: 'news',
    date: '06/05/2025',
    summary: 'Máy chủ mới HSO NEW 2025 chính thức khai mở! Cùng tham gia ngay để nhận nhiều phần quà hấp dẫn và trải nghiệm những tính năng mới nhất.',
    views: 1520,
    pinned: true
  },
  {
    id: 2,
    title: 'SỰ KIỆN MÙA HÈ 2025',
    author: 'ADMIN',
    category: 'event',
    date: '01/05/2025',
    summary: 'Chuỗi sự kiện mùa hè với nhiều phần quà giá trị: Săn boss mùa hè, Đua top level, Nhiệm vụ đặc biệt và nhiều hoạt động thú vị khác.',
    views: 856
  },
  {
    id: 3,
    title: 'Hướng dẫn - Chức năng LÔI ĐÀI',
    author: 'ADMIN',
    category: 'guide',
    date: '28/04/2025',
    summary: 'Hướng dẫn chi tiết về hệ thống Lôi Đài: Cách tham gia, luật chơi, phần thưởng và các chiến thuật để giành chiến thắng.',
    views: 723
  },
  {
    id: 6,
    title: 'Hướng Dẫn - Chức năng CHIẾN TRƯỜNG',
    author: 'ADMIN',
    category: 'guide',
    date: '25/04/2025',
    summary: 'Khám phá chiến trường liên server với các trận đánh quy mô lớn. Tìm hiểu cách tham gia và giành chiến thắng trong các trận chiến epic.',
    views: 645
  },
  {
    id: 5,
    title: 'Hướng Dẫn - Chức năng CHIẾM THÀNH',
    author: 'ADMIN',
    category: 'guide',
    date: '22/04/2025',
    summary: 'Hướng dẫn về hệ thống Chiếm Thành: Cách tổ chức guild, chiến thuật tấn công và phòng thủ, cùng các phần thưởng hấp dẫn.',
    views: 589
  },
  {
    id: 4,
    title: 'Hướng Dẫn - Chức năng SĂN BOSS',
    author: 'ADMIN',
    category: 'guide',
    date: '20/04/2025',
    summary: 'Tổng hợp thông tin về các Boss trong game: Thời gian xuất hiện, vị trí, cách đánh và những phần thưởng quý giá.',
    views: 934
  }
];

const PostList: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');

  const getCategoryIcon = (category: Post['category']) => {
    const categoryInfo = CATEGORIES.find(cat => cat.id === category);
    return categoryInfo?.icon || '📌';
  };

  const getCategoryLabel = (category: Post['category']) => {
    const categoryInfo = CATEGORIES.find(cat => cat.id === category);
    return categoryInfo?.label || 'Khác';
  };

  const filteredPosts = POSTS.filter(post => 
    selectedCategory === 'all' ? true : post.category === selectedCategory
  );

  const renderCategoryButtons = () => (
    <div className={styles.categories}>
      {CATEGORIES.map(category => (
        <button
          key={category.id}
          className={`${styles.categoryButton} ${selectedCategory === category.id ? styles.active : ''}`}
          onClick={() => setSelectedCategory(category.id as Category)}
        >
          <span className={styles.categoryIcon}>{category.icon}</span>
          <span className={styles.categoryLabel}>{category.label}</span>
        </button>
      ))}
    </div>
  );

  const renderPostMeta = (post: Post) => (
    <div className={styles.postMeta}>
      <div className={styles.metaLeft}>
        <span className={styles.author}>
          <img src={avatar} alt={post.author} className={styles.authorAvatar} />
          {post.author}
        </span>
        <span className={styles.date}>{post.date}</span>
      </div>
      <div className={styles.metaRight}>
        <span className={styles.views}>👁️ {post.views}</span>
      </div>
    </div>
  );

  const renderPost = (post: Post) => (
    <div key={post.id} className={`${styles.postItem} ${post.pinned ? styles.pinned : ''}`}>
     
      <div className={styles.postContent}>
        <div className={styles.categoryBadge}>
          {getCategoryIcon(post.category)} {getCategoryLabel(post.category)}
        </div>
        
        <Link to={`/post/${post.id}`} className={styles.postTitle}>
          {post.title}
        </Link>
        
        <p className={styles.postSummary}>{post.summary}</p>
        
        {renderPostMeta(post)}
      </div>
    </div>
  );

  return (
    <div className={styles.postList}>
      <div className={styles.header}>
        <h2 className={styles.sectionTitle}>Tin Tức & Sự Kiện</h2>
        {renderCategoryButtons()}
      </div>

      <div className={styles.posts}>
        {filteredPosts.map(renderPost)}
      </div>
    </div>
  );
};

export default PostList;