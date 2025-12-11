/**
 * Text output component for translated text
 * Supports copy to clipboard, download, and text-to-speech
 */
import { FiCopy, FiDownload, FiVolume2, FiCheck } from 'react-icons/fi';
import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useSpeech } from '../hooks/useSpeech';
import { getLanguageName } from '../utils/languages';

const TextOutput = () => {
  const { translatedText, targetLang, detectedLanguage, sourceLang } = useApp();
  const { speak, synthesisSupported, isSpeaking } = useSpeech();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!translatedText) return;

    try {
      await navigator.clipboard.writeText(translatedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleDownload = () => {
    if (!translatedText) return;

    const blob = new Blob([translatedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `translation_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleTextToSpeech = () => {
    if (translatedText) {
      speak(translatedText, targetLang);
    }
  };

  return (
    <div className="card h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Translation
          </h2>
          {detectedLanguage && sourceLang === 'auto' && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Detected: {getLanguageName(detectedLanguage)}
            </p>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {/* Text-to-Speech */}
          {synthesisSupported && translatedText && (
            <button
              onClick={handleTextToSpeech}
              disabled={isSpeaking}
              className={`p-2 rounded-lg transition-colors ${
                isSpeaking
                  ? 'bg-primary-500 text-white'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              title="Listen to translation"
            >
              <FiVolume2 
                className={isSpeaking ? 'text-white' : 'text-gray-600 dark:text-gray-400'} 
                size={20} 
              />
            </button>
          )}

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            disabled={!translatedText}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Copy to clipboard"
          >
            {copied ? (
              <FiCheck className="text-green-500" size={20} />
            ) : (
              <FiCopy className="text-gray-600 dark:text-gray-400" size={20} />
            )}
          </button>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            disabled={!translatedText}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Download translation"
          >
            <FiDownload className="text-gray-600 dark:text-gray-400" size={20} />
          </button>
        </div>
      </div>

      {/* Text Area */}
      <div className="flex-1 relative">
        <textarea
          value={translatedText}
          readOnly
          placeholder="Translation will appear here..."
          className="textarea-field h-full min-h-[200px] bg-gray-50 dark:bg-gray-900"
        />
      </div>

      {/* Word Count */}
      {translatedText && (
        <div className="mt-2 text-right">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {translatedText.split(/\s+/).filter(Boolean).length} words
          </span>
        </div>
      )}
    </div>
  );
};

export default TextOutput;
