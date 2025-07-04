import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './PostDetail.module.css';
import avatar from '../assets/images/avatar.gif';

interface Post {
    id: number;
    title: string;
    date: string;
    author: string;
    type: 'announcement' | 'event' | 'update' | 'maintenance';
    pinned?: boolean;
    content: string;
}

const posts: Post[] = [
    {
        id: 1,
        title: '💥HSO NEW- Huyền Thoại TÂN Hiệp sĩ 💥',
        date: '18:05:17 06-05-2025',
        author: 'ADMIN',
        type: 'announcement',
        pinned: true,
        content: `💥HSO NEW- Huyền Thoại TÂN Hiệp sĩ 💥
------CHÍNH THỨC OPEN-------
⏰Thời gian mở Open: 20h00' ngày 19/04/2025
🌟Hiệp Sĩ Online - Huyền Thoại Hiệp Sĩ chính thức ra mắt, hứa hẹn vừa đem lại cho anh em những kỷ niệm tuổi thơ đáng nhớ, vừa có những cải tiến mới lạ và hấp dẫn
✅Server chuẩn dame gốc
✅Lối chơi chuẩn gốc nói không lạm phát vàng. Sẵn sàng tham chiến ngay nào!

------------------Chiến game ngay nào---------------
🔗 Trang chủ và tải game: https://hsonew.xyz/
#HSO #Hiepsionlinel #huyenthoaihiepsi #avatar #Ninja #Game`
    },
    {
        id: 2,
        title: '🎮 Cập Nhật Phiên Bản Mới v2.0.1 🎮',
        date: '15:30:00 05-05-2025',
        author: 'ADMIN',
        type: 'update',
        content: `Để giải nhiệt mùa hè thì không gì thích hợp bằng việc sử dụng trái cây , các hiệp sĩ hãy cùng nhau hái quả giải nhiệt nhé.
- Tất cả cây ngũ quả đều nằm rải rác tất cả map quái (chỉ khu 1 ,khu 3 ,khu 4). Để hái được quả các bạn cần có giỏ hái quả có bán ở cửa hàng.

- Có 5 loại quả : mãng cầu, sung, dừa, đu đủ và xoài. Trái cây ngũ quả có thể giao dịch.

- Tìm cây ngũ quả bấm vào "HÁI QUẢ " để cây mang tên mình và thu hoạch . Các bạn sẽ hái quả ngẫu nhiên trong 5 quả trên .

- Nhân vật có level 40 mới có thể hái quả

- Sau khi có đủ 5 loại quả , các bạn mua mâm bạc  ở cửa hàng và đem dâng MÂM TRÁI CÂY tại NPC SOPHIA để đối lấy các phần quà hấp dẫn.

• Exp luôn có
• Các loại lông xanh/đỏ/vàng
• Xương
• Thẻ mua bán đồ khóa đồng/bạc/vàng/kim cương
• 100 bình HP 6000
• 100 bình MP 600
• Hồi sinh tại chỗ
• Nguyên liệu mề đay bất kì cấp 1
• Nguyên liệu mề đay bất kì cấp 2
• Cỏ 4 lá
• Cỏ 3 lá
• Lửa thiêng
• Đá ba màu
• Tăng tốc cánh cấp 1-2-3
• Vé mở ly
• Thẻ tinh tú
• Nl tinh tú nhóm 1
• Lửa tinh tú
• Thánh giá
• Voi ma mút
• Sắt vụn
• Đá cường hóa
• Đá may mắn
• Ngẫu nhiên chuông vàng [có thể giao dịch]
• Phù về làng
• Trứng pet thiên thần random hạn
• Sách kỹ năng 110 ngẫu nhiên
• Đục cấp 1
• Tự động đánh
• Đá thạch anh cấp 1
• Đá thạch anh cấp 2
• Vé mua cánh
• Vé h vàng đi buôn
• Đá krypton cấp 1
• Mảnh sách ghép ngẫu nhiên

Lưu ý:
- Khi đang hái quả (đã bấm vào HÁI QUẢ) , sẽ thu hoạch ngay mà không cần chờ 5s như năm ngoái. Tuy nhiên bị đồ sát , mkn hay hành trang đầy thì sẽ thu hoạch thất bại và sẽ mất 1 giỏ hái

- Cứ 30 phút sẽ xuất hiện 500 cây, mỗi cây có thời gian tồn tại 45 phút. Hết thời gian này máy chủ sẽ hủy toàn bộ cây trên map còn lại.

- Khi dâng mâm các bạn phải dọn trống chỗ hành trang nhé. Hành trang đầy sẽ mất quà admin không chịu trách nhiệm.

- Nếu nhân vật có pet + trứng pet thiên thần = 3 sẽ không trúng thêm trứng pet thiên thần

- Các bạn muốn up quái trọn vẹn khu 1,3,4 mà không muốn focus vào cây ngũ quả sự kiện , hãy đến NPC Hammer/Black Eye -> Tắt Hái Quả , thế là các bạn có thể up thoải mái vì cây sẽ không hiển thị làm phiền các bạn và ngược lại nếu muốn HÁI QUẢ tham gia sk thì nhớ BẬT HÁI QUẢ
- Lưu ý mỗi khi thoát game các bạn nhớ cài lại nhé

ĐUA TOP ĐỔI MÂM TRÁI CÂY

- Trong thời gian diễn ra sự kiện , người nào đổi nhiều mâm trái cây sẽ có những phần quà hấp dẫn như sau :

Top 1 :
• 1 Bộ thời trang " giáp mùa hè nam/nữ " vĩnh viễn [có thể chọn nhân vật khác để tặng]
• 1 Voi ma mút hoặc Chuột Poro vĩnh viễn [có thể chọn nhân vật khác để tặng]
• 1 Trứng mèo thời hạn 6 tháng [có thể chọn nhân vật khác để tặng]
• 1 Tia sét vĩnh viễn
• 3 Đá Krypton cấp 2
• 5 thuốc biến dị

Top 2 :
• 1 Bộ thời trang " giáp mùa hè nam/nữ " vĩnh viễn [có thể chọn nhân vật khác để tặng]
• 1 Voi ma mút hoặc Chuột Poro vĩnh viễn [có thể chọn nhân vật khác để tặng]
• 1 Trứng mèo thời hạn 6 tháng [có thể chọn nhân vật khác để tặng]
• 1 Tia sét thời hạn 6 tháng
• 3 Đá Krypton cấp 2
• 5 thuốc biến dị

Top 3 :
• 1 Bộ thời trang " giáp mùa hè nam/nữ " vĩnh viễn [có thể chọn nhân vật khác để tặng]
• 1 Voi ma mút hoặc Chuột Poro vĩnh viễn [có thể chọn nhân vật khác để tặng]
• 1 Trứng mèo thời hạn 6 tháng
• 1 Tia sét thời hạn 3 tháng
• 1 Đá Krypton cấp 1

Top 5 người kế tiếp
• 1 tai nghe xanh/đỏ vĩnh viễn hoặc thú cưỡi [Voi hoặc Chuột Poro] vĩnh viễn. [có thể chọn nhân vật khác để tặng]
• 1 Bộ thời trang mùa hè thời hạn 6 tháng.
• 1 Tia sét thời hạn 1 tháng
• 1 cặp thẻ mua bán đồ khóa tự chọn

Lưu ý : TOP KHÔNG TÍNH ĐỒNG HẠNG [NGƯỜI NÀO ĐẠT SỐ LƯỢNG ĐÓ TRƯỚC XẾP TRƯỚC LẤY TRƯỚC]
- Tối thiểu top phải đạt số lượng > 4.000.

ĐỔI QUÀ

- Khi các bạn có chuông vàng + vàng có thể tự chọn đổi lấy các phần quà đặc biệt sau:

* 1 Mặt nạ đầu lâu random thời hạn từ 5-7 ngày : 5 chuông + vàng
* 1 Mặt nạ loki random thời hạn từ 5-7 ngày : 5 chuông + vàng
* 1 Mặt nạ đấu sĩ random thời hạn từ 5-7 ngày : 5 chuông + vàng
* 1 Mặt nạ thổ dân random thời hạn từ 5-7 ngày : 5 chuông + vàng
* 1 Găng tay vô cực random thời hạn từ 5-10 ngày : 5 chuông + vàng
* 1 Rương tím/đỏ : 1 chuông + vàng
* 10 Phượng hoàng lửa : 5 chuông + vàng
* 10 Hồ quang cấp 1 ngẫu nhiên loại : 5 chuông + vàng
* 1 Bình biến dị : 100 chuông + vàng

SĂN BOSS

- Boss tái sinh sau 4 giờ tính từ lúc bị đánh chết và chỉ xuất hiện ở map SUỐI MA
- Khi săn Boss, các hiệp sĩ tham gia đánh boss đều có thể nhặt được quà và , tùy vào sự chăm chỉ mà quà xịn hay không xịn
- Boss sẽ 3 con : khu 1 sẽ là boss cho 8x trở xuống , khu 3 cho 9x ->10x, khu 4 cho 11x trở lên
- Chỉ săn boss mùa hè khi các bạn mặc các áo thời trang mùa hè [giáp mùa hè hoặc đồ bơi]
- Phần thưởng của khi săn boss ngẫu nhiên các quà sau :

• Titan
• Kim loại vũ trụ
• Kẹo the
• Kẹo bạc hà
• Kẹo sữa
• Kẹo cam
• Đá bóng tối cấp 1,2
• Đá ánh sáng cấp 1,2
• Vé mở ly
• Bình HP siêu lớn
• Bình MP lớn
• Đá thạch anh cấp 1
• Lửa
• Bình dầu
• Tăng tốc cánh cấp 1-2
• Vé tự động đánh
• Đá Krypton cấp 1
• Đục cấp 1-2
• Cỏ ba lá
• Cỏ bốn lá
• Trang bị cam/tím
• Mây
• Ngẫu nhiên nl tinh tú
• Phù về làng
• Nước rửa tội
• Sách tri thức
• Cơm gà
• Mảnh sách ghép

PET THẦN TÌNH YÊU

- Khu vườn sẽ mở bán trứng pet thiên thần thời hạn 7 ngày
- Ngoài những thuộc tính trên khi dùng pet sẽ được không bị tính ip rơi đồ , được tăng thêm 10% tỷ lệ rơi vàng
- Pet có thêm 1 dòng đặc biệt của dòng ẩn Bộc phá của trang bị tinh tú. Bộc phá : khi bị đánh sẽ có tỷ lệ xảy ra, tạo vụ nổ gay sát thương random 10- 40% máu cho đối thủ trong khoảng cách 6 ô.

Lưu ý: Các hiệp sĩ chỉ có thể đổi tối đa 3 trứng. Nhưng nếu trong hành trang đã có trứng loại đó + pet loại đó mà hơn 3 thì không thể đổi được nhé. Luyện đệ tử không thể đổi trứng

SHOP THỜI TRANG SỰ KIỆN

- Bán các bộ thời trang mùa hè thời hạn 10 ngày , đồ bơi tại NPC Doubar
- Khẩu trang/tai nghe thời hạn 5 ngày tại NPC Hammer
- Shop thời trang sự kiện sẽ đóng bán hết ngày 29/6/2024

Thời gian diễn ra sự kiện sau bảo trì 10h30 ngày 6/6 và kết thúc vào hết ngày 23:59:59s ngày 30/6 . Nội dung sự kiện có thể thay đổi ngay khi đã bắt đầu ,các bạn lưu ý theo dõi thường xuyên thông báo từ BQT

Sau khi kết thúc sự kiện , các bạn sẽ có 3 ngày để các bạn tranh thủ đổi quà.
Trái cây ngũ quả cũng không thể giao dịch sau khi kết thúc sự kiện
Các vật phẩm trong sự kiện mùa hè 2024 không thể sử dụng sau khi kết thúc hay dùng cho sự kiện khác`,
    },
    {
        id: 3,
        title: '🎉 Event Tháng 5 - Săn Boss Nhận Quà 🎉',
        date: '10:00:00 01-05-2025',
        author: 'ADMIN',
        type: 'event',
        content: `🎉 Event Tháng 5 - Săn Boss Nhận Quà 🎉

⏰ Thời gian: 01/05 - 31/05/2025

🎯 Nội dung:
• Săn Boss thế giới nhận điểm tích lũy
• Top điểm cao nhận quà giá trị
• Cơ hội nhận Pet hiếm

🎁 Phần thưởng:
TOP 1: 
• 50.000 Ngọc
• Pet Rồng Thần [Vĩnh viễn]
• Set Trang Bị Thần [7 ngày]

TOP 2-5:
• 20.000 Ngọc
• Pet Phượng Hoàng [30 ngày]
• Vũ Khí Thần [7 ngày]

TOP 6-10:
• 10.000 Ngọc
• Pet Kỳ Lân [7 ngày]

📌 Lưu ý: Mỗi ngày chỉ tính điểm tối đa 1000 điểm
🔗 Chi tiết tại: https://hsonew.xyz/event-thang5
#HSO #Event #SanBoss`
    }
];

const PostDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const post = posts.find(p => p.id === Number(id));

    if (!post) {
        return <div className={styles.notFound}>Không tìm thấy bài viết</div>;
    }

    const formatContent = (content: string) => {
        const sections = content.split('\n\n');
        return sections.map((section, index) => {
            if (section.includes('TOP ')) {
                return (
                    <div key={index} className={styles.rewardTier}>
                        <h3>{section.split('\n')[0]}</h3>
                        <ul>
                            {section.split('\n').slice(1).map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                );
            } else if (section.startsWith('I.') || section.startsWith('II.')) {
                return (
                    <div key={index} className={styles.eventSection}>
                        <h2 className={styles.eventTitle}>
                            {section.split('\n')[0]}
                        </h2>
                        {section.split('\n').slice(1).map((line, i) => (
                            <p key={i} className={styles.eventContent}>{line}</p>
                        ))}
                    </div>
                );
            } else if (section.includes('Thời gian')) {
                return (
                    <div key={index} className={styles.timeSection}>
                        <span className={styles.timeIcon}>⏰</span>
                        {section}
                    </div>
                );
            } else if (section.includes('Lưu ý:')) {
                return (
                    <div key={index} className={styles.noteSection}>
                        <span className={styles.noteIcon}>ℹ️</span>
                        {section}
                    </div>
                );
            } else if (section.includes('🔗')) {
                return (
                    <div key={index} className={styles.linkSection}>
                        {section.split('\n').map((line, i) => (
                            <div key={i} className={styles.linkItem}>
                                {line.includes('🔗') ? (
                                    <a href={line.split(': ')[1]} target="_blank" rel="noopener noreferrer">
                                        {line}
                                    </a>
                                ) : (
                                    line
                                )}
                            </div>
                        ))}
                    </div>
                );
            } else if (section.includes('✅')) {
                return (
                    <div key={index} className={styles.featureList}>
                        {section.split('\n').map((line, i) => (
                            <div key={i} className={styles.featureItem}>{line}</div>
                        ))}
                    </div>
                );
            } else {
                return (
                    <div key={index} className={styles.textSection}>
                        {section.split('\n').map((line, i) => (
                            <p key={i}>{line}</p>
                        ))}
                    </div>
                );
            }
        });
    };

    const getPostIcon = (type: Post['type']) => {
        switch (type) {
            case 'announcement':
                return '📢';
            case 'event':
                return '🎉';
            case 'update':
                return '🎮';
            case 'maintenance':
                return '🛠️';
            default:
                return '📌';
        }
    };

    return (
        <div className={styles.postDetail}>
            <div className={styles.pageContainer}>
                <div className={styles.avatarSection}>
                    <img src={avatar} alt="Admin" className={styles.avatar} />
                    <div className={styles.adminLabel}>{post.author}</div>
                </div>

                <div className={styles.postSection}>
                    <div className={styles.cardBody}>
                        <div className={styles.postHeader}>
                            <div className={styles.postMeta}>
                                <span className={styles.postType}>
                                    {getPostIcon(post.type)} {post.type.toUpperCase()}
                                </span>
                                {post.pinned && (
                                    <span className={styles.pinnedPost}>
                                        📌 Ghim
                                    </span>
                                )}
                            </div>
                            <div className={styles.postTitle}>{post.title}</div>
                            <div className={styles.postDate}>{post.date}</div>
                        </div>
                        <div className={styles.postContent}>
                            {formatContent(post.content)}
                        </div>
                        <div className={styles.postFooter}>
                            <div className={styles.authorInfo}>
                                <img src={avatar} alt="Admin" className={styles.footerAvatar} />
                                <span>{post.author}</span>
                            </div>
                            <div className={styles.tags}>
                                {post.content.split('\n').slice(-1)[0].split(' ').filter(tag => tag.startsWith('#')).map((tag, index) => (
                                    <span key={index} className={styles.tag}>{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetail; 