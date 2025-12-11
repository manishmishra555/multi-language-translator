/**
 * Text input component for source text
 * Supports voice input, character count, and clear button
 */
import { FiMic, FiMicOff, FiX, FiVolume2 } from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import { useSpeech } from '../hooks/useSpeech';

const TextInput = () => {
  const { sourceText, setSourceText, sourceLang, clearTranslation } = useApp();
  const { isListening, startListening, stopListening, recognitionSupported, speak, synthesisSupported } = useSpeech();

  const handleVoiceInput = () => {
    if (isListening) {
      stopListening();
    } else {
      const lang = sourceLang === 'auto' ? 'en' : sourceLang;
      startListening(lang, (transcript, isInterim) => {
        if (!isInterim) {
          setSourceText(transcript);
        }
      });
    }
  };

  const handleTextToSpeech = () => {
    if (sourceText && sourceLang !== 'auto') {
      speak(sourceText, sourceLang);
    }
  };

  const handleClear = () => {
    clearTranslation();
  };

  const charCount = sourceText.length;
  const maxChars = 5000;

  return (
    <div className="card h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Source Text
        </h2>
        <div className="flex items-center space-x-2">
          {/* Text-to-Speech */}
          {synthesisSupported && sourceText && sourceLang !== 'auto' && (
            <button
              onClick={handleTextToSpeech}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="Listen to text"
            >
              <FiVolume2 className="text-gray-600 dark:text-gray-400" size={20} />
            </button>
          )}

          {/* Voice Input */}
          {recognitionSupported && (
            <button
              onClick={handleVoiceInput}
              className={`p-2 rounded-lg transition-colors ${
                isListening
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              title={isListening ? 'Stop recording' : 'Start voice input'}
            >
              {isListening ? (
                <FiMicOff size={20} />
              ) : (
                <FiMic className="text-gray-600 dark:text-gray-400" size={20} />
              )}
            </button>
          )}

          {/* Clear Button */}
          {sourceText && (
            <button
              onClick={handleClear}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="Clear text"
            >
              <FiX className="text-gray-600 dark:text-gray-400" size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Text Area */}
      <div className="flex-1 relative">
        <textarea
          value={sourceText}
          onChange={(e) => setSourceText(e.target.value.slice(0, maxChars))}
          placeholder="Enter text to translate..."
          className="textarea-field h-full min-h-[200px]"
          maxLength={maxChars}
        />
        
        {/* Listening Indicator */}
        {isListening && (
          <div className="absolute top-4 left-4 flex items-center space-x-2 bg-red-500 text-white px-3 py-1 rounded-full animate-pulse">
            <FiMic size={16} />
            <span className="text-sm font-medium">Listening...</span>
          </div>
        )}
      </div>

      {/* Character Count */}
      <div className="mt-2 text-right">
        <span className={`text-sm ${
          charCount > maxChars * 0.9
            ? 'text-red-500'
            : 'text-gray-500 dark:text-gray-400'
        }`}>
          {charCount} / {maxChars}
        </span>
      </div>
    </div>
  );
};

export default TextInput;
