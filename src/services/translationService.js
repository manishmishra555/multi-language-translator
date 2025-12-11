/**
 * Translation service with multiple backends and offline fallback
 * Supports LibreTranslate (free, no API key) and Google Translate API
 */
import { offlineTranslate, isOfflineAvailable } from '../utils/offlineTranslation';
import { getFromCache, saveToCache } from '../utils/db';

// Free LibreTranslate instance (public API)
const LIBRE_TRANSLATE_URL = 'https://libretranslate.com/translate';
const LIBRE_DETECT_URL = 'https://libretranslate.com/detect';

// MyMemory Translation API (free, no API key required)
const MYMEMORY_URL = 'https://api.mymemory.translated.net/get';

/**
 * Detect language using LibreTranslate
 * @param {string} text - Text to detect language for
 * @returns {Promise<string>} - Detected language code
 */
export const detectLanguage = async (text) => {
  try {
    // Check cache first
    const cacheKey = `detect:${text.substring(0, 100)}`;
    const cached = await getFromCache(cacheKey);
    if (cached) return cached;

    const response = await fetch(LIBRE_DETECT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
      }),
    });

    if (!response.ok) {
      throw new Error('Language detection failed');
    }

    const data = await response.json();
    
    if (data && data.length > 0) {
      const detectedLang = data[0].language;
      // Cache the result
      await saveToCache(cacheKey, detectedLang);
      return detectedLang;
    }

    return 'en'; // Default to English if detection fails
  } catch (error) {
    console.error('Error detecting language:', error);
    return 'en'; // Default fallback
  }
};

/**
 * Translate text using LibreTranslate API
 * @param {string} text - Text to translate
 * @param {string} fromLang - Source language code
 * @param {string} toLang - Target language code
 * @returns {Promise<object>} - Translation result
 */
const translateWithLibre = async (text, fromLang, toLang) => {
  const response = await fetch(LIBRE_TRANSLATE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      q: text,
      source: fromLang === 'auto' ? 'auto' : fromLang,
      target: toLang,
      format: 'text',
    }),
  });

  if (!response.ok) {
    throw new Error(`LibreTranslate API error: ${response.status}`);
  }

  const data = await response.json();
  return {
    translatedText: data.translatedText,
    detectedLanguage: fromLang === 'auto' ? data.detectedLanguage?.language : fromLang,
    source: 'LibreTranslate',
  };
};

/**
 * Translate text using MyMemory API (fallback)
 * @param {string} text - Text to translate
 * @param {string} fromLang - Source language code
 * @param {string} toLang - Target language code
 * @returns {Promise<object>} - Translation result
 */
const translateWithMyMemory = async (text, fromLang, toLang) => {
  const langPair = fromLang === 'auto' ? `en|${toLang}` : `${fromLang}|${toLang}`;
  const url = `${MYMEMORY_URL}?q=${encodeURIComponent(text)}&langpair=${langPair}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`MyMemory API error: ${response.status}`);
  }

  const data = await response.json();
  
  if (data.responseStatus === 200) {
    return {
      translatedText: data.responseData.translatedText,
      detectedLanguage: fromLang,
      source: 'MyMemory',
    };
  }

  throw new Error('MyMemory translation failed');
};

/**
 * Main translation function with multiple backends and offline fallback
 * @param {string} text - Text to translate
 * @param {string} fromLang - Source language code
 * @param {string} toLang - Target language code
 * @returns {Promise<object>} - Translation result
 */
export const translate = async (text, fromLang, toLang) => {
  if (!text || !toLang) {
    throw new Error('Text and target language are required');
  }

  // Normalize language codes
  let sourceLang = fromLang || 'auto';
  
  // Check if same language
  if (sourceLang !== 'auto' && sourceLang === toLang) {
    return {
      translatedText: text,
      detectedLanguage: sourceLang,
      source: 'Same Language',
      cached: false,
    };
  }

  // Generate cache key
  const cacheKey = `translate:${sourceLang}:${toLang}:${text.substring(0, 100)}`;

  try {
    // Try to get from cache first
    const cached = await getFromCache(cacheKey);
    if (cached) {
      return {
        ...cached,
        cached: true,
      };
    }

    // Auto-detect language if needed
    if (sourceLang === 'auto') {
      sourceLang = await detectLanguage(text);
      
      // Check again if same language after detection
      if (sourceLang === toLang) {
        return {
          translatedText: text,
          detectedLanguage: sourceLang,
          source: 'Same Language',
          cached: false,
        };
      }
    }

    let result = null;

    // Try LibreTranslate first (most reliable free option)
    try {
      result = await translateWithLibre(text, sourceLang, toLang);
    } catch (error) {
      console.warn('LibreTranslate failed, trying MyMemory:', error.message);
      
      // Fallback to MyMemory
      try {
        result = await translateWithMyMemory(text, sourceLang, toLang);
      } catch (error2) {
        console.warn('MyMemory failed:', error2.message);
      }
    }

    // If online translation succeeded, cache it
    if (result) {
      await saveToCache(cacheKey, result);
      return {
        ...result,
        cached: false,
      };
    }

    // If all online methods failed, try offline translation
    if (isOfflineAvailable(sourceLang, toLang)) {
      const offlineResult = offlineTranslate(text, sourceLang, toLang);
      if (offlineResult) {
        return {
          translatedText: offlineResult,
          detectedLanguage: sourceLang,
          source: 'Offline Dictionary',
          cached: false,
        };
      }
    }

    throw new Error('All translation methods failed');
  } catch (error) {
    console.error('Translation error:', error);

    // Last resort: try offline translation even if online failed
    if (sourceLang !== 'auto' && isOfflineAvailable(sourceLang, toLang)) {
      const offlineResult = offlineTranslate(text, sourceLang, toLang);
      if (offlineResult) {
        return {
          translatedText: offlineResult,
          detectedLanguage: sourceLang,
          source: 'Offline Dictionary (Fallback)',
          cached: false,
        };
      }
    }

    throw error;
  }
};

/**
 * Check if online (network available)
 * @returns {boolean} - Whether the app is online
 */
export const isOnline = () => {
  return navigator.onLine;
};

/**
 * Get available translation backends status
 * @returns {Promise<object>} - Status of translation backends
 */
export const getBackendsStatus = async () => {
  const status = {
    online: isOnline(),
    libreTranslate: false,
    myMemory: false,
    offline: true,
  };

  if (status.online) {
    // Test LibreTranslate
    try {
      const response = await fetch(LIBRE_TRANSLATE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: 'test', source: 'en', target: 'es' }),
      });
      status.libreTranslate = response.ok;
    } catch {
      status.libreTranslate = false;
    }

    // Test MyMemory
    try {
      const response = await fetch(`${MYMEMORY_URL}?q=test&langpair=en|es`);
      status.myMemory = response.ok;
    } catch {
      status.myMemory = false;
    }
  }

  return status;
};
