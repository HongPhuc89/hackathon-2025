# 🚀 Quick Start Guide - WanderPlan Mobile

## Chạy app trong 3 bước

### 1️⃣ Di chuyển vào thư mục dự án
```bash
cd /Users/phucnh/projects/hackathon-2025/travel_planner_mobile
```

### 2️⃣ Cài đặt dependencies (nếu chưa)
```bash
npm install
```

### 3️⃣ Chạy app
```bash
npm start
```

Sau đó:
- Nhấn `i` để mở iOS simulator
- Nhấn `a` để mở Android emulator
- Scan QR code bằng Expo Go app trên điện thoại

     3. Chọn số ngày (vd: 3 Ngày)
     4. Chọn loại du khách (vd: Gia đình)
     5. Chọn phong cách (vd: Thư giãn)
     6. Chọn ngân sách (vd: Vừa phải)

5. **Itinerary Screen**
   - Xem loading animation
   - Xem lịch trình được tạo
   - Chuyển đổi giữa các ngày
   - Nhấn "Lưu hành trình"

6. **Back to My Trips**
   - Xem chuyến đi vừa lưu
   - Có thể tạo thêm chuyến đi mới

## 🔧 Troubleshooting

### Lỗi: "Metro bundler not starting"
```bash
npm run reset
```

### Lỗi: "TypeScript errors"
```bash
npm run typecheck
```

### Lỗi: "Module not found"
```bash
rm -rf node_modules
npm install
```

### Lỗi: "iOS simulator not opening"
```bash
# Mở Xcode và cài đặt Command Line Tools
xcode-select --install
```

## 📚 Tài liệu

- **README.md**: Tổng quan dự án
- **DEVELOPMENT.md**: Hướng dẫn phát triển
- **PROJECT_SUMMARY.md**: Tóm tắt chi tiết

## 💡 Tips

- Sử dụng `r` trong terminal để reload app
- Sử dụng `m` để toggle menu
- Shake device để mở developer menu
- Nhấn `j` để mở debugger

## 🎯 Features đã hoàn thành

✅ Onboarding flow
✅ Authentication
✅ AI chatbot conversation
✅ Itinerary generation
✅ Save trips
✅ Beautiful UI/UX
✅ TypeScript support
✅ State management (Zustand)

Enjoy coding! 🎉
