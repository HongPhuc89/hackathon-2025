# WanderPlan Mobile 🗺️

App gợi ý lịch trình du lịch thông minh với AI, được xây dựng bằng React Native Expo.

## ✨ Tính năng

- 🤖 **Trợ lý AI thông minh**: Chat với AI để tạo lịch trình phù hợp
- 📍 **Gợi ý địa điểm**: Tự động đề xuất các điểm đến tốt nhất
- 🏨 **Đề xuất khách sạn**: Tìm chỗ nghỉ phù hợp với ngân sách
- 💾 **Lưu lịch trình**: Quản lý các chuyến đi đã lên kế hoạch
- ⭐ **Đánh giá trải nghiệm**: Review và feedback về AI assistant
- 🎨 **Giao diện đẹp mắt**: Thiết kế hiện đại, dễ sử dụng

## 🚀 Công nghệ

- **React Native** 0.81.5
- **Expo SDK** 54
- **Expo Router** (File-based routing)
- **TypeScript**
- **Zustand** (State management)
- **React Native Reanimated** (Animations)
- **Bottom Sheet** (Modern UI)

## 📁 Cấu trúc dự án

```
travel_planner_mobile/
├── app/                    # Expo Router screens
│   ├── (app)/             # Authenticated screens
│   │   ├── trips.tsx      # Danh sách chuyến đi
│   │   ├── chat.tsx       # Chat với AI
│   │   └── itinerary.tsx  # Chi tiết lịch trình
│   ├── _layout.tsx        # Root layout
│   ├── index.tsx          # Entry point
│   ├── onboarding.tsx     # Màn hình giới thiệu
│   └── auth.tsx           # Đăng nhập
├── modules/
│   ├── features/          # Feature modules
│   └── shared/            # Shared code
│       ├── components/    # Reusable components
│       ├── types.ts       # TypeScript types
│       ├── theme.ts       # Design tokens
│       ├── constants.ts   # App constants
│       └── store.ts       # Zustand store
├── assets/                # Images, fonts
└── configs/               # Configuration files
```

## 🛠️ Cài đặt

1. **Clone repository**

```bash
cd /Users/phucnh/projects/hackathon-2025/travel_planner_mobile
```

2. **Cài đặt dependencies**

```bash
npm install
```

3. **Chạy app**

```bash
# Development
npm start

# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## 📱 Hướng dẫn sử dụng

1. **Onboarding**: Xem giới thiệu về app
2. **Đăng nhập**: Nhập email và mật khẩu (demo)
3. **Chat với AI**: Trả lời các câu hỏi để AI tạo lịch trình
4. **Xem lịch trình**: Duyệt qua các gợi ý từ AI
5. **Lưu chuyến đi**: Lưu lịch trình yêu thích

## 🎨 Thiết kế

App được thiết kế với:

- **Modern UI/UX**: Giao diện hiện đại, trực quan
- **Smooth Animations**: Chuyển động mượt mà
- **Responsive**: Tối ưu cho mọi kích thước màn hình
- **Accessibility**: Dễ sử dụng cho mọi người

## 🔧 Scripts

```bash
npm start          # Start Expo dev server
npm run android    # Run on Android
npm run ios        # Run on iOS
npm run web        # Run on web
npm run reset      # Clear cache and restart
npm run typecheck  # Check TypeScript errors
```

## 📝 Tham khảo

- Giao diện: `google_studio` folder
- Kiến trúc: `zenia_mobile` folder
- Expo Router: https://docs.expo.dev/router/introduction/
- React Native: https://reactnative.dev/

## 👨‍💻 Phát triển

Dự án sử dụng:

- **Expo Router** cho navigation
- **Zustand** cho state management
- **TypeScript** cho type safety
- **Module aliases** cho imports sạch hơn

## 📚 Tài liệu

- **[Quick Start Guide](../documents/QUICKSTART.md)** - Hướng dẫn chạy nhanh trong 3 bước
- **[Development Guide](../documents/DEVELOPMENT.md)** - Architecture, patterns, best practices
- **[Project Summary](../documents/PROJECT_SUMMARY.md)** - Tóm tắt chi tiết dự án
- **[Review Screen Update](../documents/UPDATE_REVIEW_SCREEN.md)** - Cập nhật màn hình đánh giá

## 📄 License

MIT
