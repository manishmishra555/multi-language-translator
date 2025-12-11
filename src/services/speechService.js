/**
 * Speech service for voice input (Speech Recognition) and voice output (Speech Synthesis)
 * Uses Web Speech API available in modern browsers
 */

/**
 * Check if Speech Recognition is supported
 * @returns {boolean} - Whether speech recognition is supported
 */
export const isSpeechRecognitionSupported = () => {
  return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
};

/**
 * Check if Speech Synthesis is supported
 * @returns {boolean} - Whether speech synthesis is supported
 */
export const isSpeechSynthesisSupported = () => {
  return 'speechSynthesis' in window;
};

/**
 * Create a speech recognition instance
 * @param {string} language - Language code for recognition
 * @param {function} onResult - Callback for recognition result
 * @param {function} onError - Callback for recognition error
 * @returns {object} - Speech recognition instance with control methods
 */
export const createSpeechRecognition = (language, onResult, onError) => {
  if (!isSpeechRecognitionSupported()) {
    throw new Error('Speech recognition is not supported in this browser');
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  // Configuration
  recognition.continuous = false; // Stop after one result
  recognition.interimResults = true; // Show interim results
  recognition.maxAlternatives = 1;
  recognition.lang = language || 'en-US';

  let isListening = false;
  let finalTranscript = '';
  let interimTranscript = '';

  // Event handlers
  recognition.onstart = () => {
    isListening = true;
    finalTranscript = '';
    interimTranscript = '';
  };

  recognition.onresult = (event) => {
    interimTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;

      if (event.results[i].isFinal) {
        finalTranscript += transcript;
      } else {
        interimTranscript += transcript;
      }
    }

    // Call the result callback with both final and interim results
    if (onResult) {
      onResult({
        final: finalTranscript,
        interim: interimTranscript,
        isFinal: event.results[event.results.length - 1].isFinal,
      });
    }
  };

  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
    isListening = false;

    if (onError) {
      onError(event.error);
    }
  };

  recognition.onend = () => {
    isListening = false;
  };

  // Control methods
  return {
    start: () => {
      if (!isListening) {
        recognition.start();
      }
    },
    stop: () => {
      if (isListening) {
        recognition.stop();
      }
    },
    abort: () => {
      recognition.abort();
    },
    setLanguage: (lang) => {
      recognition.lang = lang;
    },
    isListening: () => isListening,
    instance: recognition,
  };
};

/**
 * Speak text using Speech Synthesis
 * @param {string} text - Text to speak
 * @param {string} language - Language code for speech
 * @param {number} rate - Speech rate (0.1 to 10, default 1)
 * @param {number} pitch - Speech pitch (0 to 2, default 1)
 * @param {number} volume - Speech volume (0 to 1, default 1)
 * @returns {Promise} - Promise that resolves when speech ends
 */
export const speakText = (text, language = 'en-US', rate = 1, pitch = 1, volume = 1) => {
  return new Promise((resolve, reject) => {
    if (!isSpeechSynthesisSupported()) {
      reject(new Error('Speech synthesis is not supported in this browser'));
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;

    // Try to find a voice for the specified language
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang.startsWith(language.split('-')[0]));
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onend = () => {
      resolve();
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event.error);
      reject(event.error);
    };

    window.speechSynthesis.speak(utterance);
  });
};

/**
 * Stop current speech synthesis
 */
export const stopSpeaking = () => {
  if (isSpeechSynthesisSupported()) {
    window.speechSynthesis.cancel();
  }
};

/**
 * Get available voices for speech synthesis
 * @returns {Array} - Array of available voices
 */
export const getAvailableVoices = () => {
  if (!isSpeechSynthesisSupported()) {
    return [];
  }

  return window.speechSynthesis.getVoices();
};

/**
 * Get voices for a specific language
 * @param {string} language - Language code
 * @returns {Array} - Array of voices for the specified language
 */
export const getVoicesForLanguage = (language) => {
  const voices = getAvailableVoices();
  const langCode = language.split('-')[0];
  return voices.filter(voice => voice.lang.startsWith(langCode));
};

/**
 * Convert language code to Speech API format
 * @param {string} langCode - ISO 639-1 language code (e.g., 'en', 'es')
 * @returns {string} - BCP 47 language tag (e.g., 'en-US', 'es-ES')
 */
export const getLanguageTag = (langCode) => {
  const languageTags = {
    'en': 'en-US',
    'es': 'es-ES',
    'fr': 'fr-FR',
    'de': 'de-DE',
    'it': 'it-IT',
    'pt': 'pt-PT',
    'ru': 'ru-RU',
    'zh': 'zh-CN',
    'ja': 'ja-JP',
    'ko': 'ko-KR',
    'ar': 'ar-SA',
    'hi': 'hi-IN',
    'bn': 'bn-IN',
    'tr': 'tr-TR',
    'vi': 'vi-VN',
    'th': 'th-TH',
    'pl': 'pl-PL',
    'nl': 'nl-NL',
    'uk': 'uk-UA',
    'cs': 'cs-CZ',
    'sv': 'sv-SE',
    'da': 'da-DK',
    'fi': 'fi-FI',
    'el': 'el-GR',
    'he': 'he-IL',
    'id': 'id-ID',
    'ms': 'ms-MY',
    'no': 'no-NO',
    'ro': 'ro-RO',
    'hu': 'hu-HU',
    'sk': 'sk-SK',
    'bg': 'bg-BG',
    'hr': 'hr-HR',
    'sr': 'sr-RS',
    'lt': 'lt-LT',
    'lv': 'lv-LV',
    'et': 'et-EE',
    'sl': 'sl-SI',
    'fa': 'fa-IR',
    'ur': 'ur-PK',
    'sw': 'sw-KE',
    'ta': 'ta-IN',
    'te': 'te-IN',
    'mr': 'mr-IN',
    'ml': 'ml-IN',
    'kn': 'kn-IN',
    'gu': 'gu-IN',
    'pa': 'pa-IN',
  };

  return languageTags[langCode] || `${langCode}-${langCode.toUpperCase()}`;
};

/**
 * Initialize speech synthesis voices (load them)
 * Call this on app initialization to ensure voices are loaded
 * @returns {Promise<Array>} - Promise that resolves with available voices
 */
export const initializeSpeechSynthesis = () => {
  return new Promise((resolve) => {
    if (!isSpeechSynthesisSupported()) {
      resolve([]);
      return;
    }

    // Voices might not be loaded immediately
    const voices = window.speechSynthesis.getVoices();
    
    if (voices.length > 0) {
      resolve(voices);
    } else {
      // Wait for voices to be loaded
      window.speechSynthesis.onvoiceschanged = () => {
        const loadedVoices = window.speechSynthesis.getVoices();
        resolve(loadedVoices);
      };
    }
  });
};
