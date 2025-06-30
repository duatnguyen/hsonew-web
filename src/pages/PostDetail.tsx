import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './PostDetail.module.css';
import avatar from '../assets/images/avatar.gif';

const PostDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const posts = [
        {
            id: 1,
            title: '💥HIỆP SĨ ONLINE- Huyền Thoại Hiệp Sĩ 💥',
            date: '18:05:17 06-05-2025',
            author: 'ADMIN',
            content: `💥HIỆP SĨ ONLINE- Huyền Thoại Hiệp Sĩ 💥
------CHÍNH THỨC OPEN-------
⏰Thời gian mở Open: 20h00' ngày 19/04/2025
🌟Hiệp Sĩ Online - Huyền Thoại Hiệp Sĩ chính thức ra mắt, hứa hẹn vừa đem lại cho anh em những kỷ niệm tuổi thơ đáng nhớ, vừa có những cải tiến mới lạ và hấp dẫn
✅Trọn Bộ Skill mới đã có tại HUYENTHOAIHIEPSI
✅SRC chuẩn dame gốc
✅Lối chơi chuẩn gốc nói không lạm phát vàng. Sẵn sàng tham chiến ngay nào!
🌟Dưới đây là chuỗi sự kiện Đua TOP
I. Đua TOP Cao Thủ HUYENTHOAIHIEPSI
Thời gian đua TOP: từ 20h 19/04 - 23h59 10/05

TOP 1:
• 300.000 Ngọc Xanh
• 1 Bộ thời trang giáp mùa hè vĩnh viễn
• 1 Trứng Pet rồng lửa [vĩnh viễn]
• 1 Trứng mèo thời hạn 6 tháng
• 1 Tia sét vĩnh viễn
• 3 Đá Krypton cấp 2
• 5 thuốc biến dị

TOP 2:
• 200.000 Ngọc Xanh
• 1 Bộ thời trang giáp mùa hè vĩnh viễn
• 1 Voi ma mút hoặc Chuột Poro vĩnh viễn
• 1 Trứng mèo thời hạn 6 tháng
• 1 Tia sét thời hạn 6 tháng
• 3 Đá Krypton cấp 2
• 5 thuốc biến dị

TOP 3:
• 100.000 Ngọc Xanh
• 1 Bộ thời trang giáp mùa hè vĩnh viễn
• 1 Voi ma mút hoặc Chuột Poro vĩnh viễn
• 1 Trứng mèo thời hạn 6 tháng
• 1 Tia sét thời hạn 3 tháng
• 1 Đá Krypton cấp 1

TOP 4-10:
• 50.000 Ngọc Xanh
• 1 tai nghe xanh/đỏ vĩnh viễn hoặc thú cưỡi Voi/Chuột vĩnh viễn.
• 1 Bộ thời trang mùa hè thời hạn 6 tháng.
• 1 Tia sét thời hạn 1 tháng
• 1 cặp thẻ mua bán đồ khóa tự chọn

II. ĐUA TOP NẠP
Thời gian đua TOP: từ 20h 19/04 - 23h59 19/05

TOP 1:
300.000 Ngọc Xanh
1 trứng Pet Phượng Hoàng Băng [vĩnh viễn]
3 đá Krypton cấp 2
1 Sách Skill 110 [tự chọn]

TOP 2:
200.000 Ngọc Xanh
1 trứng Pet Phượng Hoàng Băng [3 tháng]
3 đá Krypton cấp 2
1 Sách Skill 110 [tự chọn]

TOP 3:
100.000 Ngọc Xanh
1 trứng Pet Phượng Hoàng Băng [1 tháng]
2 đá Krypton cấp 2
1 Sách Skill 110 [tự chọn]

TOP 4-10:
50.000 Ngọc Xanh
1 trứng Pet Dê Con [1 tháng]

Lưu ý: Nạp 1tr tích lũy trở lên mới đủ yêu cầu

------------------Chiến game ngay nào---------------
🔗 Trang chủ và tải game: https://huyenthoaihiepsi.com/
🔗 Group Zalo: https://zalo.me/g/rjagqg623
#HSO #Hiepsionlinel #huyenthoaihiepsi #avatar #Ninja #Game`
        }
    ];

    const post = posts.find(p => p.id === Number(id));

    if (!post) {
        return <div className={styles.notFound}>Không tìm thấy bài viết</div>;
    }

    return (
        <div className={styles.postDetail}>
            <div className={styles.pageContainer}>
                <div className={styles.avatarSection}>
                    <img src={avatar} alt="Admin" className={styles.avatar} />
                    <div className={styles.adminLabel}>{post.author}</div>
                </div>

                <div className={styles.postSection}>
                    <div className={styles.cardBody}>
                        <div className={styles.postTitle}>{post.title}</div>
                        <div className={styles.postDate}>{post.date}</div>
                        <div className={styles.postContent}>
                            {post.content.split('\n').map((line, index) => (
                                <React.Fragment key={index}>
                                    {line}
                                    <br />
                                </React.Fragment>
                            ))}
                        </div>
                        <div className={styles.postInfo}>
                            Đăng bởi {post.author}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetail; 