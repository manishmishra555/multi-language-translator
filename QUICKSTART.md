# 🚀 Quick Start Guide

Get the Multi-Language Translator running in under 5 minutes!

## ⚡ Fast Setup

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser
# Visit: http://localhost:5173
```

That's it! The app is now running locally. 🎉

## 🎯 First Translation

1. **Select Languages**
   - Source: "Auto Detect" or choose a language
   - Target: Choose your target language

2. **Enter Text**
   - Type or paste text (up to 5000 characters)
   - OR click microphone icon 🎤 to speak

3. **Translate**
   - Click the blue "Translate" button
   - View translation instantly!

## 🔥 Key Features to Try

### 🎤 Voice Input
Click the microphone icon → Allow permissions → Speak clearly

### 🔊 Text-to-Speech
Click the speaker icon on translated text to hear it

### 📚 History
Click the clock icon (bottom-right) to see all past translations

### 🌓 Dark Mode
Click moon/sun icon in header to toggle theme

### 📋 Copy & Download
Use icons in output panel to copy or download translations

## 📦 Build for Production

```bash
# Build optimized production bundle
npm run build

# Preview production build
npm run preview
```

## 🌐 PWA Installation

### On Desktop (Chrome/Edge)
1. Visit the app in browser
2. Look for install icon in address bar
3. Click "Install"

### On Mobile (Chrome/Safari)
1. Open app in browser
2. Tap share/menu button
3. Select "Add to Home Screen"

## 🔧 Common Commands

```bash
# Development
npm run dev              # Start dev server

# Production
npm run build            # Build for production
npm run preview          # Preview production build

# Maintenance
npm install              # Install dependencies
npm update               # Update dependencies
```

## 🆘 Quick Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Or use different port
npm run dev -- --port 3000
```

### Voice Input Not Working
- Grant microphone permissions in browser settings
- Note: Not supported in Firefox

### Build Errors
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📖 Full Documentation

For detailed documentation, see [README.md](./README.md)

## 🎮 Testing Offline Mode

1. Open DevTools (F12)
2. Go to Application → Service Workers
3. Check "Offline" checkbox
4. Try translating - should use cache/offline dictionary

## 🌍 Supported Languages (Offline)

The app includes offline dictionaries for these pairs:
- 🇬🇧 English ↔ 🇪🇸 Spanish
- 🇬🇧 English ↔ 🇫🇷 French
- 🇬🇧 English ↔ 🇩🇪 German
- 🇬🇧 English ↔ 🇮🇹 Italian
- 🇬🇧 English ↔ 🇵🇹 Portuguese
- 🇬🇧 English ↔ 🇨🇳 Chinese
- 🇬🇧 English ↔ 🇯🇵 Japanese
- 🇬🇧 English ↔ 🇰🇷 Korean

All 50+ languages work online!

## 🎉 You're Ready!

Start translating! The app supports:
- ✅ 50+ languages
- ✅ Voice input/output
- ✅ Offline mode
- ✅ Translation history
- ✅ Dark/light theme
- ✅ Copy & download
- ✅ PWA installation

Happy translating! 🌐✨
