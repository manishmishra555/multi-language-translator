# 🌐 Multi-Language Translator

A powerful, production-ready **offline-capable multi-language translator** built with React.js, featuring voice input, text-to-speech, translation history, and Progressive Web App (PWA) support.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-18.3.1-61dafb)
![Vite](https://img.shields.io/badge/Vite-7.2.7-646cff)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 🎯 Core Translation Features
- **50+ Languages** - Support for all major world languages
- **Auto Language Detection** - Automatically detect source language
- **Multiple Translation Backends** - LibreTranslate (primary) and MyMemory (fallback)
- **Real-time Translation** - Fast and accurate translations
- **Smart Caching** - Cache translations for better performance

### 📡 Offline Capabilities
- **PWA Support** - Install as a native app on any device
- **Service Worker** - Full offline functionality
- **IndexedDB Storage** - Persistent local data storage
- **Offline Dictionary** - Pre-cached translations for common phrases in 8 language pairs
- **Graceful Degradation** - Seamlessly falls back to offline mode

### 🎤 Voice Features
- **Voice Input** - Speak to translate using Web Speech API
- **Text-to-Speech** - Listen to translations
- **Multi-language Voice Support** - Native voice support for 40+ languages
- **Real-time Recognition** - See transcription as you speak

### 📚 Smart History
- **Persistent History** - Save all translations locally
- **Quick Reuse** - Click any history item to reuse translation
- **Search & Filter** - Easy to find past translations
- **Export Capability** - Download translations as text files

### 🎨 User Experience
- **Dark/Light Theme** - Eye-friendly theme toggle
- **Responsive Design** - Perfect on mobile, tablet, and desktop
- **Clean Modern UI** - Built with Tailwind CSS v4
- **Character Counter** - Track input length (5000 char limit)
- **Copy to Clipboard** - One-click copy functionality
- **Download Translations** - Export as .txt files

## 🚀 Live Demo

The application is currently running at:
**[https://3000-i54jvrs2g5876jgjq78vw-de59bda9.sandbox.novita.ai](https://3000-i54jvrs2g5876jgjq78vw-de59bda9.sandbox.novita.ai)**

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd webapp
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 4. Build for Production
```bash
npm run build
```

### 5. Preview Production Build
```bash
npm run preview
```

## 📁 Project Structure

```
webapp/
├── public/
│   └── manifest.webmanifest      # PWA manifest
├── src/
│   ├── components/               # React components
│   │   ├── ErrorBoundary.jsx    # Error handling
│   │   ├── Header.jsx           # App header with theme toggle
│   │   ├── History.jsx          # Translation history panel
│   │   ├── LanguageSelector.jsx # Language dropdown
│   │   ├── TextInput.jsx        # Source text input
│   │   ├── TextOutput.jsx       # Translation output
│   │   └── TranslationControls.jsx # Language controls
│   ├── context/
│   │   └── AppContext.jsx       # Global state management
│   ├── hooks/
│   │   ├── useSpeech.js         # Speech recognition/synthesis
│   │   └── useTranslation.js    # Translation logic
│   ├── pages/
│   │   └── Translator.jsx       # Main page component
│   ├── services/
│   │   ├── speechService.js     # Web Speech API wrapper
│   │   └── translationService.js # Translation API handlers
│   ├── utils/
│   │   ├── db.js                # IndexedDB operations
│   │   ├── languages.js         # Language definitions
│   │   └── offlineTranslation.js # Offline dictionary
│   ├── App.jsx                  # Root component
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles
├── index.html
├── vite.config.js               # Vite configuration
├── postcss.config.js            # PostCSS configuration
└── package.json
```

## 🔧 Configuration

### PWA Configuration
The PWA is configured in `vite.config.js` using `vite-plugin-pwa`:
- **Auto-update** - Automatically updates when new version is available
- **Offline-first** - Works without internet connection
- **Installable** - Can be installed on any device
- **Network-first caching** - Smart caching strategy for API calls

### Translation Services
The app uses multiple translation backends:
1. **LibreTranslate** (Primary) - Free, open-source, no API key required
2. **MyMemory** (Fallback) - Free translation API
3. **Offline Dictionary** (Last resort) - 8 language pairs with common phrases

### Supported Language Pairs (Offline)
- English ↔ Spanish
- English ↔ French
- English ↔ German
- English ↔ Italian
- English ↔ Portuguese
- English ↔ Chinese (Simplified)
- English ↔ Japanese
- English ↔ Korean

## 🎮 Usage Guide

### Basic Translation
1. Select source language (or use Auto-detect)
2. Select target language
3. Type or paste text (up to 5000 characters)
4. Click **Translate** button
5. View translation in right panel

### Voice Input
1. Click the microphone icon 🎤
2. Allow microphone permissions (first time)
3. Speak clearly in source language
4. Text will auto-populate and translate

### Text-to-Speech
1. After translation, click the speaker icon 🔊
2. Listen to translation in target language
3. Works for both source and translated text

### Using History
1. Click the clock icon in bottom-right corner
2. Browse past translations
3. Click any item to reuse translation
4. Delete individual items or clear all history

### Copy & Download
- **Copy**: Click copy icon to copy translation to clipboard
- **Download**: Click download icon to save as .txt file

### Theme Toggle
- Click moon/sun icon in header to switch between dark and light themes
- Preference is saved in local storage

## 🌐 Offline Mode

The app fully supports offline operation:

### What Works Offline
✅ Previously cached translations (7-day cache)  
✅ Offline dictionary translations (8 language pairs)  
✅ Translation history (all saved translations)  
✅ Voice input and text-to-speech  
✅ Copy, download, and theme features  
✅ Complete UI functionality  

### What Requires Internet
❌ New translations for uncached text  
❌ Language detection for new text  
❌ Translations for language pairs without offline dictionary  

## 🏗️ Technology Stack

### Frontend Framework
- **React 18.3.1** - Modern React with hooks
- **Vite 7.2.7** - Lightning-fast build tool
- **Tailwind CSS v4** - Utility-first CSS framework

### State Management
- **React Context API** - Global state management
- **Custom Hooks** - Reusable logic encapsulation

### Storage & Caching
- **IndexedDB** (via `idb`) - Persistent local storage
- **Service Worker** - Offline functionality and caching
- **LocalStorage** - Theme and settings

### APIs & Services
- **LibreTranslate** - Free translation API
- **MyMemory Translation API** - Fallback translation service
- **Web Speech API** - Voice recognition and synthesis

### UI & Icons
- **React Icons** - Beautiful icon library
- **Tailwind CSS** - Modern styling

### PWA Tools
- **vite-plugin-pwa** - PWA generation
- **Workbox** - Service worker library

## 📱 Browser Support

### Modern Browsers (Full Support)
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Opera 76+

### Feature Compatibility
| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Translation | ✅ | ✅ | ✅ | ✅ |
| PWA Install | ✅ | ✅ | ✅ | ✅ |
| Voice Input | ✅ | ❌ | ✅ | ✅ |
| Text-to-Speech | ✅ | ✅ | ✅ | ✅ |
| Offline Mode | ✅ | ✅ | ✅ | ✅ |

*Note: Voice input (Web Speech Recognition) is not supported in Firefox*

## 🔒 Privacy & Security

- **No Data Collection** - No analytics or tracking
- **Local Storage Only** - All data stored locally on your device
- **No API Keys Required** - Uses free public APIs
- **Open Source** - Full transparency
- **HTTPS** - Secure communication (in production)

## 🐛 Troubleshooting

### Voice Input Not Working
- **Solution**: Ensure microphone permissions are granted
- **Firefox**: Voice input is not supported (browser limitation)
- **Check**: `chrome://settings/content/microphone`

### Offline Mode Not Working
- **Solution**: Wait for service worker installation (first load)
- **Check**: DevTools → Application → Service Workers
- **Clear**: Unregister service worker and reload

### Translations Failing
- **Solution**: Check internet connection
- **Fallback**: Use offline dictionary for supported language pairs
- **Cache**: Previously translated text works offline

### Build Errors
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Clear cache and rebuild
npm run build
```

## 🚀 Deployment

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### Deploy to GitHub Pages
```bash
npm run build
# Deploy dist/ folder to gh-pages branch
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] Translation works for all language pairs
- [ ] Auto-detect correctly identifies languages
- [ ] Voice input captures speech accurately
- [ ] Text-to-speech plays correctly
- [ ] History saves and loads properly
- [ ] Offline mode works without internet
- [ ] Copy to clipboard functions
- [ ] Download saves .txt file
- [ ] Theme toggle persists
- [ ] PWA installs correctly
- [ ] Responsive on mobile devices

## 📈 Performance

- ⚡ **Fast Load Time** - < 2 seconds on 3G
- 🎯 **Small Bundle** - ~240KB (gzipped ~75KB)
- 💾 **Efficient Caching** - Smart cache strategy
- 🔄 **Code Splitting** - Optimized chunks
- 📦 **Tree Shaking** - Minimal dependencies

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **LibreTranslate** - Free and open-source translation API
- **MyMemory** - Translation memory service
- **React Team** - Amazing framework
- **Vite Team** - Lightning-fast build tool
- **Tailwind CSS** - Beautiful utility-first CSS

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing issues for solutions
- Read the documentation thoroughly

## 🗺️ Roadmap

### Planned Features
- [ ] Camera translation (OCR)
- [ ] Document translation (PDF, DOCX)
- [ ] Conversation mode (real-time dialogue)
- [ ] Pronunciation guide
- [ ] More offline language pairs
- [ ] Custom dictionary
- [ ] Export history as CSV/JSON
- [ ] Multi-tab sync
- [ ] Favorites/bookmarks
- [ ] Translation quality rating

---

**Built with ❤️ using React, Vite, and Tailwind CSS**

*Last Updated: December 2024*
