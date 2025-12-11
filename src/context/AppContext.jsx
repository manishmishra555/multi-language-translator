/**
 * Global application context for state management
 * Manages theme, translation state, history, and app-wide settings
 */
import { createContext, useContext, useState, useEffect } from 'react';
import { getHistory } from '../utils/db';
import { initializeSpeechSynthesis } from '../services/speechService';

const AppContext = createContext(null);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // Theme management
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || 'light';
  });

  // Translation state
  const [sourceLang, setSourceLang] = useState('auto');
  const [targetLang, setTargetLang] = useState('es');
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationError, setTranslationError] = useState(null);
  const [detectedLanguage, setDetectedLanguage] = useState(null);

  // History state
  const [history, setHistory] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);

  // Online/Offline state
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Speech synthesis voices
  const [voices, setVoices] = useState([]);

  // Initialize theme
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Toggle theme
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Load translation history
  const loadHistory = async () => {
    try {
      setIsLoadingHistory(true);
      const historyData = await getHistory(50);
      setHistory(historyData);
    } catch (error) {
      console.error('Error loading history:', error);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  // Refresh history after new translation
  const refreshHistory = () => {
    loadHistory();
  };

  // Online/Offline listeners
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Initialize app
  useEffect(() => {
    // Load history on mount
    loadHistory();

    // Initialize speech synthesis
    initializeSpeechSynthesis().then(loadedVoices => {
      setVoices(loadedVoices);
    });
  }, []);

  // Swap languages
  const swapLanguages = () => {
    if (sourceLang === 'auto') return; // Can't swap with auto-detect

    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
    
    // Swap detected language if available
    if (detectedLanguage) {
      setDetectedLanguage(targetLang);
    }
  };

  // Clear translation
  const clearTranslation = () => {
    setSourceText('');
    setTranslatedText('');
    setTranslationError(null);
    setDetectedLanguage(null);
  };

  const value = {
    // Theme
    theme,
    toggleTheme,

    // Translation state
    sourceLang,
    setSourceLang,
    targetLang,
    setTargetLang,
    sourceText,
    setSourceText,
    translatedText,
    setTranslatedText,
    isTranslating,
    setIsTranslating,
    translationError,
    setTranslationError,
    detectedLanguage,
    setDetectedLanguage,

    // Actions
    swapLanguages,
    clearTranslation,

    // History
    history,
    refreshHistory,
    isLoadingHistory,

    // App state
    isOnline,

    // Speech
    voices,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
