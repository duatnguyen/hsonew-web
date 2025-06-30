import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PostList.module.css';
import avatar from '../../assets/images/avatar.gif';

interface Post {
  id: number;
  title: string;
  author: string;
  image: string;
}

const PostList: React.FC = () => {
  const posts: Post[] = [
    { id: 1, title: '💥HSO NEW 2025 - Khai mở chính thức💥', author: 'ADMIN', image: avatar },
    { id: 9, title: 'SỰ KIỆN MÙA HÈ 2025', author: 'ADMIN', image: avatar },
    { id: 7, title: 'Hướng dẫn - Chức năng LÔI ĐÀI', author: 'ADMIN', image: avatar },
    { id: 6, title: 'Hướng Dẫn - Chức năng CHIẾN TRƯỜNG', author: 'ADMIN', image: avatar },
    { id: 5, title: 'Hướng Dẫn - Chức năng CHIẾM THÀNH', author: 'ADMIN', image: avatar },
    { id: 4, title: 'Hướng Dẫn - Chức năng SĂN BOSS', author: 'ADMIN', image: avatar },
  ];

  return (
    <div className={styles.postList}>
      <h5 className={styles.sectionTitle}>Bài viết mới</h5>
      <hr />
      <div className={styles.posts}>
        {posts.map((post) => (
          <div key={post.id} className={styles.postItem}>
            <div className={styles.postImage}>
              <img src={post.image} alt={post.title} />
            </div>
            <div className={styles.postContent}>
              <Link to={`/post/${post.id}`} className={styles.postTitle}>
                {post.title}
              </Link>
              <div className={styles.postMeta}>
                Đăng bởi <span className={styles.author}>{post.author}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList; 