/**
 * Custom hook for handling translations
 * Encapsulates translation logic with error handling and history saving
 */
import { useState, useCallback } from 'react';
import { translate } from '../services/translationService';
import { saveToHistory } from '../utils/db';
import { useApp } from '../context/AppContext';

export const useTranslation = () => {
  const {
    sourceLang,
    targetLang,
    sourceText,
    setTranslatedText,
    setIsTranslating,
    setTranslationError,
    setDetectedLanguage,
    refreshHistory,
  } = useApp();

  const [translationSource, setTranslationSource] = useState(null);

  /**
   * Perform translation
   */
  const performTranslation = useCallback(async () => {
    if (!sourceText || !sourceText.trim()) {
      setTranslationError('Please enter text to translate');
      return;
    }

    if (!targetLang) {
      setTranslationError('Please select a target language');
      return;
    }

    setIsTranslating(true);
    setTranslationError(null);
    setTranslationSource(null);

    try {
      const result = await translate(sourceText, sourceLang, targetLang);

      setTranslatedText(result.translatedText);
      setDetectedLanguage(result.detectedLanguage);
      setTranslationSource(result.source);

      // Save to history
      try {
        await saveToHistory({
          sourceText,
          translatedText: result.translatedText,
          fromLang: result.detectedLanguage || sourceLang,
          toLang: targetLang,
          source: result.source,
        });
        refreshHistory();
      } catch (historyError) {
        console.error('Failed to save to history:', historyError);
        // Don't throw - translation was successful even if history save failed
      }
    } catch (error) {
      console.error('Translation error:', error);
      setTranslationError(
        error.message || 'Translation failed. Please check your connection and try again.'
      );
      setTranslatedText('');
    } finally {
      setIsTranslating(false);
    }
  }, [
    sourceText,
    sourceLang,
    targetLang,
    setTranslatedText,
    setIsTranslating,
    setTranslationError,
    setDetectedLanguage,
    refreshHistory,
  ]);

  return {
    performTranslation,
    translationSource,
  };
};
