# Tổng quan Project "Thời Đại Hiệp Sĩ"

## 🎯 Giới thiệu
Website game portal cho "Thời Đại Hiệp Sĩ" - game nhập vai Việt Nam được xây dựng bằng React + TypeScript.

## 🛠️ Tech Stack
- **React 18.2.0** + TypeScript
- **Vite** (build tool)
- **React Router 6.21.1** (routing)
- **Bootstrap 5.3.2** (UI framework)
- **CSS Modules** (styling)
- **Context API** (state management)

## 📱 Tính năng chính
1. **Authentication** - Đăng nhập/đăng ký
2. **Ranking System** - Bảng xếp hạng
3. **Payment** - Nạp tiền
4. **Gift Code** - Nhập mã quà tặng
5. **News** - Tin tức game
6. **Download** - Tải game

## 🏗️ Cấu trúc
```
src/
├── components/
│   ├── Layout/      # Header, Navigation
│   ├── Auth/        # Login/Register modals
│   ├── Posts/       # Tin tức
│   ├── Account/     # Quản lý tài khoản
│   └── ...
├── pages/
│   ├── HomePage     # Trang chủ
│   ├── AccountPage  # Tài khoản
│   ├── RankingPage  # Bảng xếp hạng
│   └── ...
└── contexts/
    └── AuthContext # Authentication state
```

## 🚀 Commands
```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview build
```

## ✅ Điểm mạnh
- Architecture hiện đại
- TypeScript cho type safety
- Modular design
- Authentication system hoàn chỉnh
- Responsive design

## 🎯 Kết luận
Project được xây dựng chuyên nghiệp với đầy đủ tính năng cần thiết cho một game portal.