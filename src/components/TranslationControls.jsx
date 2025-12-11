/**
 * Translation controls component
 * Language selection, swap button, and translate button
 */
import { FiArrowRight, FiRefreshCw } from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../hooks/useTranslation';
import LanguageSelector from './LanguageSelector';

const TranslationControls = () => {
  const {
    sourceLang,
    setSourceLang,
    targetLang,
    setTargetLang,
    swapLanguages,
    isTranslating,
    sourceText,
  } = useApp();

  const { performTranslation, translationSource } = useTranslation();

  const canSwap = sourceLang !== 'auto';

  return (
    <div className="card">
      {/* Language Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        {/* Source Language */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            From
          </label>
          <LanguageSelector
            value={sourceLang}
            onChange={setSourceLang}
            type="source"
            disabled={isTranslating}
          />
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <button
            onClick={swapLanguages}
            disabled={!canSwap || isTranslating}
            className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-110"
            title="Swap languages"
          >
            <FiRefreshCw
              className="text-gray-700 dark:text-gray-300"
              size={20}
            />
          </button>
        </div>

        {/* Target Language */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            To
          </label>
          <LanguageSelector
            value={targetLang}
            onChange={setTargetLang}
            type="target"
            disabled={isTranslating}
          />
        </div>
      </div>

      {/* Translate Button */}
      <div className="mt-6">
        <button
          onClick={performTranslation}
          disabled={isTranslating || !sourceText.trim()}
          className="w-full btn-primary py-3 text-lg font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isTranslating ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Translating...</span>
            </>
          ) : (
            <>
              <span>Translate</span>
              <FiArrowRight size={20} />
            </>
          )}
        </button>
      </div>

      {/* Translation Source Info */}
      {translationSource && (
        <div className="mt-3 text-center">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Translated using: <span className="font-medium">{translationSource}</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default TranslationControls;
