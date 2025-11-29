# 🚀 Hướng dẫn Cài đặt và Chạy VietFoodScanner

## Yêu cầu
- Node.js (v16 trở lên)
- npm hoặc yarn
- Google Gemini API Key

## Cài đặt

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Tạo file .env
Tạo file `.env` trong thư mục gốc với nội dung:
```
GEMINI_API_KEY=your_api_key_here
```

### 3. Chạy ứng dụng

#### Cách 1: Chạy riêng biệt (khuyến nghị cho development)

**Terminal 1 - Backend:**
```bash
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev:frontend
```

#### Cách 2: Chạy cùng lúc (cần cài concurrently)
```bash
npm run dev:all
```

## Truy cập ứng dụng

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Health check: http://localhost:3001/api/health

## Cấu trúc Project

```
VietFoodScanner/
├── src/
│   ├── components/       # React components
│   │   ├── HomeScreen.jsx
│   │   ├── CameraScreen.jsx
│   │   ├── LoadingScreen.jsx
│   │   ├── ResultCard.jsx
│   │   └── ErrorMessage.jsx
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── server.js            # Express backend server
├── gemini-api.js        # Original CLI script
├── gemini-api-utils.js  # Utility functions for API
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── package.json         # Dependencies
```

## Tính năng

✅ Chụp ảnh từ camera hoặc chọn từ thư viện
✅ Tự động nén ảnh nếu quá lớn
✅ Hiển thị loading animation
✅ Hiển thị kết quả chi tiết với:
   - Tên món ăn (tiếng Việt + tiếng Anh)
   - Phát âm
   - Mô tả
   - Nguyên liệu
   - Calories
   - Độ cay
   - Cảnh báo dị ứng
   - Ghi chú văn hóa
✅ Xử lý lỗi thân thiện
✅ Responsive design (mobile-first)

## Troubleshooting

### Lỗi "GEMINI_API_KEY not set"
- Kiểm tra file `.env` đã được tạo chưa
- Đảm bảo API key hợp lệ

### Lỗi CORS
- Đảm bảo backend đang chạy trên port 3001
- Kiểm tra proxy trong `vite.config.js`

### Camera không hoạt động
- Đảm bảo đã cấp quyền truy cập camera
- Thử trên HTTPS hoặc localhost
- Sử dụng tính năng chọn ảnh từ thư viện thay thế

