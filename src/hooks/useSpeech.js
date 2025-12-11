/**
 * Custom hook for speech recognition and synthesis
 * Provides easy-to-use interface for voice features
 */
import { useState, useCallback, useRef, useEffect } from 'react';
import {
  createSpeechRecognition,
  speakText,
  stopSpeaking,
  getLanguageTag,
  isSpeechRecognitionSupported,
  isSpeechSynthesisSupported,
} from '../services/speechService';

export const useSpeech = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechError, setSpeechError] = useState(null);
  const recognitionRef = useRef(null);

  /**
   * Start voice recognition
   * @param {string} language - Language code for recognition
   * @param {function} onTranscript - Callback when transcript is received
   */
  const startListening = useCallback((language, onTranscript) => {
    if (!isSpeechRecognitionSupported()) {
      setSpeechError('Speech recognition is not supported in your browser');
      return;
    }

    if (isListening) {
      return; // Already listening
    }

    try {
      setSpeechError(null);
      
      const languageTag = getLanguageTag(language);
      
      const recognition = createSpeechRecognition(
        languageTag,
        (result) => {
          if (result.isFinal && result.final) {
            onTranscript(result.final);
            setIsListening(false);
          } else if (result.interim) {
            // You could show interim results in UI
            onTranscript(result.interim, true); // true = interim
          }
        },
        (error) => {
          console.error('Speech recognition error:', error);
          setSpeechError(`Recognition error: ${error}`);
          setIsListening(false);
        }
      );

      recognitionRef.current = recognition;
      recognition.start();
      setIsListening(true);
    } catch (error) {
      console.error('Failed to start speech recognition:', error);
      setSpeechError(error.message);
      setIsListening(false);
    }
  }, [isListening]);

  /**
   * Stop voice recognition
   */
  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, []);

  /**
   * Speak text
   * @param {string} text - Text to speak
   * @param {string} language - Language code for speech
   */
  const speak = useCallback(async (text, language) => {
    if (!isSpeechSynthesisSupported()) {
      setSpeechError('Speech synthesis is not supported in your browser');
      return;
    }

    if (!text) {
      return;
    }

    try {
      setSpeechError(null);
      setIsSpeaking(true);
      
      const languageTag = getLanguageTag(language);
      await speakText(text, languageTag);
      
      setIsSpeaking(false);
    } catch (error) {
      console.error('Speech synthesis error:', error);
      setSpeechError(`Speech error: ${error.message}`);
      setIsSpeaking(false);
    }
  }, []);

  /**
   * Stop speaking
   */
  const stopSpeech = useCallback(() => {
    stopSpeaking();
    setIsSpeaking(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      stopSpeaking();
    };
  }, []);

  return {
    // Recognition
    isListening,
    startListening,
    stopListening,
    
    // Synthesis
    isSpeaking,
    speak,
    stopSpeech,
    
    // Error
    speechError,
    clearSpeechError: () => setSpeechError(null),
    
    // Support detection
    recognitionSupported: isSpeechRecognitionSupported(),
    synthesisSupported: isSpeechSynthesisSupported(),
  };
};
