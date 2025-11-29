# 🍜 Pho-tographer: Vietnamese Street Food Decoder

A mobile-first web application that allows users to photograph Vietnamese street food and instantly receive detailed information about the dish, including its name, ingredients, calorie estimates, cultural context, and pronunciation guide.

![Vietnamese Food Scanner](https://img.shields.io/badge/Vietnamese-Food%20Scanner-E23744?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)
![Gemini AI](https://img.shields.io/badge/Gemini-AI-4285F4?style=for-the-badge&logo=google)

## ✨ Features

### 🎯 Core Features
- **📸 Image Capture**: Take photos with camera or upload from gallery
- **🤖 AI-Powered Recognition**: Uses Google Gemini 2.5 Flash for accurate food identification
- **🌐 Multi-language Support**: Vietnamese, English, French, Chinese
- **📱 Mobile-First Design**: Optimized for mobile devices with responsive UI
- **🎆 Celebration Effects**: Fireworks animation when food is successfully identified

### 📋 Food Information Display
- **Name**: Vietnamese name with proper diacritics + English translation
- **Pronunciation**: IPA transcription with simplified phonetic guide
- **Description**: Detailed description in your selected language
- **Ingredients**: List of main ingredients
- **Calories**: Estimated calorie count with range
- **Allergens**: Common allergen warnings
- **Cultural Notes**: Historical and cultural context
- **Category-Specific Info**:
  - **Food**: Spice level, serving style
  - **Drink**: Temperature, sweetness level, caffeine content, serving size
  - **Dessert**: Sweetness level, texture, best served
  - **Snack**: Spice level, texture, eating occasion

### 🎨 User Experience
- **Loading Animations**: Beautiful pho bowl animation during processing
- **Error Handling**: Friendly error messages with retry options
- **Speech Synthesis**: Hear Vietnamese pronunciation with one click
- **Language Switcher**: Easy language selection with flag icons

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Google Gemini API Key** - Get one from [Google AI Studio](https://aistudio.google.com/app/apikey)

### Installation

1. **Clone the repository** (or download the project)
```bash
git clone <repository-url>
cd VietFoodScanner
```

2. **Install dependencies**
```bash
npm install
```

3. **Create `.env` file**
Create a `.env` file in the root directory:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

4. **Run the application**

#### Option 1: Run separately (Recommended for development)

**Terminal 1 - Backend Server:**
```bash
npm run dev
```

**Terminal 2 - Frontend Development Server:**
```bash
npm run dev:frontend
```

#### Option 2: Run both together
```bash
npm run dev:all
```

### Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Health Check**: http://localhost:3001/api/health

## 📁 Project Structure

```
VietFoodScanner/
├── src/
│   ├── components/          # React components
│   │   ├── HomeScreen.jsx   # Landing page
│   │   ├── CameraScreen.jsx # Camera/upload interface
│   │   ├── LoadingScreen.jsx # Loading animation
│   │   ├── ResultCard.jsx   # Food information display
│   │   ├── ErrorMessage.jsx # Error handling
│   │   ├── Fireworks.jsx    # Celebration animation
│   │   └── LanguageSwitcher.jsx # Language selector
│   ├── contexts/
│   │   └── LanguageContext.jsx # Language state management
│   ├── translations/
│   │   └── index.js         # Multi-language translations
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles & animations
├── server.js                 # Express backend server
├── gemini-api.js            # CLI script for testing
├── gemini-api-utils.js      # Gemini API utility functions
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── package.json             # Dependencies
└── .env                     # Environment variables (create this)
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **React Context API** - State management

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

### AI & Services
- **Google Gemini 2.5 Flash** - Vision AI model
- **@google/generative-ai** - Official Gemini SDK

## 📖 Usage

### Web Application

1. Open http://localhost:3000 in your browser
2. Click "📸 Scan Food" button
3. Take a photo or select from gallery
4. Wait for AI analysis (usually 3-5 seconds)
5. View detailed food information
6. Click speaker icon to hear Vietnamese pronunciation
7. Switch language using the language selector

### CLI Script

You can also test the API directly using the CLI script:

```bash
# Basic usage
node gemini-api.js ./image/pho.jpg

# With language option
node gemini-api.js ./image/banh-mi.jpg en
node gemini-api.js ./image/com-tam.jpg fr
```

## 🎯 Supported Categories

The app recognizes and provides specific information for:

- **🍜 Food**: Main dishes, soups, noodles (Phở, Bún, Cơm Tấm, Bánh Cuốn...)
- **🧋 Drink**: Beverages (Cà Phê, Trà, Sinh Tố, Nước Mía, Chè...)
- **🍮 Dessert**: Sweet treats, cakes, pastries (Bánh Flan, Bánh Bò, Bánh Chuối...)
- **🥟 Snack**: Street snacks (Bánh Tráng Trộn, Bột Chiên, Xôi...)

## 🌐 Supported Languages

- 🇻🇳 **Vietnamese** (Tiếng Việt)
- 🇬🇧 **English**
- 🇫🇷 **French** (Français)
- 🇨🇳 **Chinese** (中文)

All AI responses are automatically translated to your selected language, while the Vietnamese name always remains in Vietnamese with proper diacritics.

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Required
GEMINI_API_KEY=your_gemini_api_key_here
```

### API Endpoints

#### POST `/api/identify`
Identify food from an image.

**Request:**
```json
{
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
  "language": "en"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "category": "food",
    "name": {
      "vietnamese": "Phở Bò",
      "english": "Beef Pho",
      "pronunciation": {
        "ipa": "/fəː˧˩˧ ɓɔ˨˩/",
        "simplified": "fuh baw",
        "toneGuide": "falling tone on phở"
      }
    },
    "description": "...",
    "ingredients": [...],
    "calories": { "estimate": 450, "range": "400-500" },
    "allergens": [...],
    "spiceLevel": "mild",
    "culturalNote": "...",
    "confidence": 0.94
  }
}
```

#### GET `/api/health`
Health check endpoint.

## 🐛 Troubleshooting

### Error: "GEMINI_API_KEY not set"
- ✅ Check that `.env` file exists in the root directory
- ✅ Ensure the API key is valid and not expired
- ✅ Restart the server after creating/modifying `.env`

### CORS Errors
- ✅ Ensure backend is running on port 3001
- ✅ Check proxy configuration in `vite.config.js`
- ✅ Verify frontend is accessing via http://localhost:3000

### Camera Not Working
- ✅ Grant camera permissions in browser
- ✅ Use HTTPS or localhost (required for camera access)
- ✅ Use "Select from Library" feature as alternative
- ✅ Check browser compatibility (Chrome, Safari, Firefox recommended)

### API Rate Limits
- ✅ If you see 429 errors, you may have exceeded free tier limits
- ✅ Wait a few minutes before retrying
- ✅ Consider upgrading your Google Cloud plan

### Image Upload Fails
- ✅ Ensure image is under 10MB
- ✅ Supported formats: JPEG, PNG, WebP
- ✅ Check network connection

## 📝 Development

### Available Scripts

```bash
# Start backend server
npm run dev

# Start frontend dev server
npm run dev:frontend

# Start both concurrently
npm run dev:all

# Test CLI script
npm test

# Production build (if configured)
npm run build
```

### Adding New Languages

1. Open `src/translations/index.js`
2. Add a new language object with all required keys
3. Update `src/contexts/LanguageContext.jsx` to include the new language
4. Test the new language in the UI

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🙏 Acknowledgments

- **Google Gemini** - For the powerful vision AI model
- **Vietnamese Food Culture** - The inspiration for this project
- **Open Source Community** - For amazing tools and libraries

## 📧 Support

For issues, questions, or contributions, please open an issue on the repository.

---

**Made with ❤️ for Vietnamese food lovers around the world** 🇻🇳

