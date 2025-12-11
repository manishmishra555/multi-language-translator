/**
 * Offline translation utility using pre-cached dictionaries
 * This provides basic word-level translation for common phrases when offline
 */

// Common phrases dictionary for offline translation
// This is a simplified example - in production, you'd want more comprehensive dictionaries
export const offlineDictionaries = {
  'en-es': {
    'hello': 'hola',
    'goodbye': 'adiós',
    'thank you': 'gracias',
    'please': 'por favor',
    'yes': 'sí',
    'no': 'no',
    'good morning': 'buenos días',
    'good night': 'buenas noches',
    'how are you': 'cómo estás',
    'i love you': 'te amo',
    'welcome': 'bienvenido',
    'sorry': 'lo siento',
    'excuse me': 'disculpe',
    'help': 'ayuda',
    'food': 'comida',
    'water': 'agua',
    'bathroom': 'baño',
    'restaurant': 'restaurante',
    'hotel': 'hotel',
    'airport': 'aeropuerto',
  },
  'en-fr': {
    'hello': 'bonjour',
    'goodbye': 'au revoir',
    'thank you': 'merci',
    'please': "s'il vous plaît",
    'yes': 'oui',
    'no': 'non',
    'good morning': 'bonjour',
    'good night': 'bonne nuit',
    'how are you': 'comment allez-vous',
    'i love you': 'je t\'aime',
    'welcome': 'bienvenue',
    'sorry': 'désolé',
    'excuse me': 'excusez-moi',
    'help': 'aide',
    'food': 'nourriture',
    'water': 'eau',
    'bathroom': 'toilette',
    'restaurant': 'restaurant',
    'hotel': 'hôtel',
    'airport': 'aéroport',
  },
  'en-de': {
    'hello': 'hallo',
    'goodbye': 'auf wiedersehen',
    'thank you': 'danke',
    'please': 'bitte',
    'yes': 'ja',
    'no': 'nein',
    'good morning': 'guten morgen',
    'good night': 'gute nacht',
    'how are you': 'wie geht es dir',
    'i love you': 'ich liebe dich',
    'welcome': 'willkommen',
    'sorry': 'entschuldigung',
    'excuse me': 'entschuldigen sie',
    'help': 'hilfe',
    'food': 'essen',
    'water': 'wasser',
    'bathroom': 'badezimmer',
    'restaurant': 'restaurant',
    'hotel': 'hotel',
    'airport': 'flughafen',
  },
  'en-it': {
    'hello': 'ciao',
    'goodbye': 'arrivederci',
    'thank you': 'grazie',
    'please': 'per favore',
    'yes': 'sì',
    'no': 'no',
    'good morning': 'buongiorno',
    'good night': 'buona notte',
    'how are you': 'come stai',
    'i love you': 'ti amo',
    'welcome': 'benvenuto',
    'sorry': 'scusa',
    'excuse me': 'mi scusi',
    'help': 'aiuto',
    'food': 'cibo',
    'water': 'acqua',
    'bathroom': 'bagno',
    'restaurant': 'ristorante',
    'hotel': 'hotel',
    'airport': 'aeroporto',
  },
  'en-pt': {
    'hello': 'olá',
    'goodbye': 'tchau',
    'thank you': 'obrigado',
    'please': 'por favor',
    'yes': 'sim',
    'no': 'não',
    'good morning': 'bom dia',
    'good night': 'boa noite',
    'how are you': 'como você está',
    'i love you': 'eu te amo',
    'welcome': 'bem-vindo',
    'sorry': 'desculpe',
    'excuse me': 'com licença',
    'help': 'ajuda',
    'food': 'comida',
    'water': 'água',
    'bathroom': 'banheiro',
    'restaurant': 'restaurante',
    'hotel': 'hotel',
    'airport': 'aeroporto',
  },
  'en-zh': {
    'hello': '你好',
    'goodbye': '再见',
    'thank you': '谢谢',
    'please': '请',
    'yes': '是',
    'no': '不',
    'good morning': '早上好',
    'good night': '晚安',
    'how are you': '你好吗',
    'i love you': '我爱你',
    'welcome': '欢迎',
    'sorry': '对不起',
    'excuse me': '打扰一下',
    'help': '帮助',
    'food': '食物',
    'water': '水',
    'bathroom': '洗手间',
    'restaurant': '餐厅',
    'hotel': '酒店',
    'airport': '机场',
  },
  'en-ja': {
    'hello': 'こんにちは',
    'goodbye': 'さようなら',
    'thank you': 'ありがとう',
    'please': 'お願いします',
    'yes': 'はい',
    'no': 'いいえ',
    'good morning': 'おはよう',
    'good night': 'おやすみ',
    'how are you': '元気ですか',
    'i love you': '愛してる',
    'welcome': 'ようこそ',
    'sorry': 'ごめんなさい',
    'excuse me': 'すみません',
    'help': '助けて',
    'food': '食べ物',
    'water': '水',
    'bathroom': 'トイレ',
    'restaurant': 'レストラン',
    'hotel': 'ホテル',
    'airport': '空港',
  },
  'en-ko': {
    'hello': '안녕하세요',
    'goodbye': '안녕히 가세요',
    'thank you': '감사합니다',
    'please': '부탁합니다',
    'yes': '네',
    'no': '아니요',
    'good morning': '좋은 아침',
    'good night': '안녕히 주무세요',
    'how are you': '어떻게 지내세요',
    'i love you': '사랑해요',
    'welcome': '환영합니다',
    'sorry': '미안합니다',
    'excuse me': '실례합니다',
    'help': '도움',
    'food': '음식',
    'water': '물',
    'bathroom': '화장실',
    'restaurant': '레스토랑',
    'hotel': '호텔',
    'airport': '공항',
  },
};

/**
 * Attempt offline translation using cached dictionaries
 * @param {string} text - Text to translate
 * @param {string} fromLang - Source language code
 * @param {string} toLang - Target language code
 * @returns {string|null} - Translated text or null if not found
 */
export const offlineTranslate = (text, fromLang, toLang) => {
  if (!text || !fromLang || !toLang) return null;
  
  const dictionaryKey = `${fromLang}-${toLang}`;
  const dictionary = offlineDictionaries[dictionaryKey];
  
  if (!dictionary) {
    // Try reverse dictionary
    const reverseDictionaryKey = `${toLang}-${fromLang}`;
    const reverseDictionary = offlineDictionaries[reverseDictionaryKey];
    
    if (reverseDictionary) {
      // Create reverse lookup
      const reverseLookup = {};
      Object.entries(reverseDictionary).forEach(([key, value]) => {
        reverseLookup[value.toLowerCase()] = key;
      });
      
      const translation = reverseLookup[text.toLowerCase()];
      return translation || null;
    }
    
    return null;
  }
  
  // Look up direct translation
  const normalizedText = text.toLowerCase().trim();
  const translation = dictionary[normalizedText];
  
  if (translation) {
    // Preserve original capitalization
    if (text[0] === text[0].toUpperCase()) {
      return translation.charAt(0).toUpperCase() + translation.slice(1);
    }
    return translation;
  }
  
  // Try word-by-word translation for phrases
  const words = normalizedText.split(' ');
  if (words.length > 1) {
    const translatedWords = words.map(word => {
      const wordTranslation = dictionary[word];
      return wordTranslation || word;
    });
    
    // Check if any words were actually translated
    if (translatedWords.some((word, idx) => word !== words[idx])) {
      return translatedWords.join(' ');
    }
  }
  
  return null;
};

/**
 * Check if offline translation is available for a language pair
 * @param {string} fromLang - Source language code
 * @param {string} toLang - Target language code
 * @returns {boolean} - Whether offline translation is available
 */
export const isOfflineAvailable = (fromLang, toLang) => {
  const dictionaryKey = `${fromLang}-${toLang}`;
  const reverseDictionaryKey = `${toLang}-${fromLang}`;
  
  return !!(offlineDictionaries[dictionaryKey] || offlineDictionaries[reverseDictionaryKey]);
};

/**
 * Get list of languages with offline support
 * @returns {Array} - Array of language codes with offline support
 */
export const getOfflineLanguages = () => {
  const languages = new Set();
  
  Object.keys(offlineDictionaries).forEach(key => {
    const [from, to] = key.split('-');
    languages.add(from);
    languages.add(to);
  });
  
  return Array.from(languages);
};

/**
 * Get offline dictionary size for a language pair
 * @param {string} fromLang - Source language code
 * @param {string} toLang - Target language code
 * @returns {number} - Number of cached translations
 */
export const getOfflineDictionarySize = (fromLang, toLang) => {
  const dictionaryKey = `${fromLang}-${toLang}`;
  const dictionary = offlineDictionaries[dictionaryKey];
  
  if (!dictionary) {
    const reverseDictionaryKey = `${toLang}-${fromLang}`;
    const reverseDictionary = offlineDictionaries[reverseDictionaryKey];
    return reverseDictionary ? Object.keys(reverseDictionary).length : 0;
  }
  
  return Object.keys(dictionary).length;
};
