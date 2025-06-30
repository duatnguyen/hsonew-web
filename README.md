# Thời Đại Hiệp Sĩ - React Website

Website chính thức của game "Thời Đại Hiệp Sĩ" được xây dựng bằng React + TypeScript + Vite với React Router.

## 🎮 Giới thiệu

Thời Đại Hiệp Sĩ là một game nhập vai Việt Nam được yêu thích nhất trên Mobile. Website này cung cấp thông tin về game, hướng dẫn tải về và các tin tức mới nhất.

## 🚀 Tính năng

- **Single Page Application (SPA)**: Sử dụng React Router cho navigation mượt mà
- **Responsive Design**: Tương thích với mọi thiết bị
- **Hiệu ứng tuyết rơi**: Tạo không khí lãng mạn
- **Nút Back to Top**: Dễ dàng quay lại đầu trang
- **Download Section**: Hỗ trợ nhiều nền tảng (Java, Android, iOS, PC)
- **News Section**: Hiển thị tin tức và thông báo mới
- **Modern UI**: Giao diện hiện đại với gradient và glassmorphism

## 🛠️ Công nghệ sử dụng

- **React 19.1.0**: Framework chính
- **TypeScript 5.8.3**: Type safety
- **Vite 7.0.0**: Build tool
- **React Router 6**: Client-side routing
- **CSS3**: Styling với modern features
- **Canvas API**: Hiệu ứng tuyết rơi

## 📁 Cấu trúc project

```
src/
├── components/
│   ├── Header.tsx              # Header với logo và navigation
│   ├── DownloadSection.tsx     # Section tải game
│   ├── NewsSection.tsx         # Section tin tức
│   ├── Footer.tsx              # Footer
│   ├── SnowEffect.tsx          # Hiệu ứng tuyết rơi
│   ├── BackToTop.tsx           # Nút quay lại đầu trang
│   └── *.css                   # CSS cho từng component
├── pages/
│   ├── HomePage.tsx            # Trang chủ
│   ├── NewsPage.tsx            # Trang tin tức chi tiết
│   ├── GuidePage.tsx           # Trang hướng dẫn tân thủ
│   ├── DownloadPage.tsx        # Trang hướng dẫn tải game
│   ├── RulesPage.tsx           # Trang nội quy
│   └── pages.css               # CSS cho các trang
├── App.tsx                     # Component chính với routing
├── App.css                     # Global styles
└── main.tsx                    # Entry point
```

## 🎨 Components

### Header
- Logo game
- Menu navigation với React Router
- Thông báo sức khỏe
- Responsive design với hamburger menu

### DownloadSection
- Nút tải cho Java, Android, iOS, PC
- Hiệu ứng hover đẹp mắt
- Thông tin phiên bản

### NewsSection
- Hiển thị tin tức mới nhất
- Layout responsive
- Hover effects

### Footer
- Thông tin liên hệ
- Social media links
- Copyright

### SnowEffect
- Hiệu ứng tuyết rơi bằng Canvas
- Performance optimized
- Responsive

### BackToTop
- Nút quay lại đầu trang
- Smooth scroll
- Hiển thị/ẩn tự động

## 📄 Pages

### HomePage (/)
- Trang chủ với tất cả sections
- DownloadSection và NewsSection
- Header và Footer

### NewsPage (/news)
- Tin tức chi tiết
- Cập nhật game
- Thông báo mới

### GuidePage (/guide)
- Hướng dẫn tân thủ
- Thông tin về Boss
- Hướng dẫn điều khiển

### DownloadPage (/download)
- Hướng dẫn tải game
- Nút download cho từng nền tảng
- Hướng dẫn cài đặt

### RulesPage (/rules)
- Nội quy game
- Quy định chung
- Hình thức xử phạt

## 🎯 Routing

```typescript
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/news" element={<NewsPage />} />
  <Route path="/guide" element={<GuidePage />} />
  <Route path="/download" element={<DownloadPage />} />
  <Route path="/rules" element={<RulesPage />} />
</Routes>
```

## 🎨 Design System

### Colors
- **Primary**: #FFD700 (Gold)
- **Secondary**: #FFA500 (Orange)
- **Background**: #1a0f0a (Dark Brown)
- **Text**: #fff (White)
- **Accent**: #FF6B6B (Red)

### Typography
- **Font Family**: Arial, Helvetica Neue, sans-serif
- **Headings**: Bold, Gold color
- **Body**: Regular, White color

### Responsive Breakpoints
- **Large Desktop**: 1400px+
- **Desktop**: 1200px - 1399px
- **Tablet Landscape**: 992px - 1199px
- **Tablet Portrait**: 768px - 991px
- **Mobile Large**: 576px - 767px
- **Mobile Medium**: 375px - 575px
- **Mobile Small**: 320px - 374px

## 🚀 Cài đặt và chạy

```bash
# Clone repository
git clone <repository-url>

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build cho production
npm run build

# Preview build
npm run preview
```

## 📱 Responsive Features

- **Mobile-first approach**
- **Flexbox và CSS Grid**
- **Hamburger menu cho mobile**
- **Touch-friendly buttons**
- **Optimized images**
- **Performance optimized**

## 🎭 Animations & Effects

- **Smooth transitions**
- **Hover effects**
- **Snow effect**
- **Loading animations**
- **Scroll animations**

## 🔧 Development

### Scripts
- `npm run dev`: Chạy development server
- `npm run build`: Build cho production
- `npm run preview`: Preview build
- `npm run lint`: Kiểm tra code style

### Code Style
- TypeScript strict mode
- ESLint configuration
- Prettier formatting
- Component-based architecture

## 📄 License

© 2024 Thời Đại Hiệp Sĩ. Tất cả quyền được bảo lưu.

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch
3. Commit changes
4. Push to branch
5. Tạo Pull Request

## 📞 Support

- **Email**: support@knightageonline.com
- **Fanpage**: Facebook Thời Đại Hiệp Sĩ
- **Forum**: forum.knightageonline.com

---

**Lưu ý**: Chơi quá 180 phút một ngày sẽ ảnh hưởng xấu đến sức khỏe.
