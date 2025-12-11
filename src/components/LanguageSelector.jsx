/**
 * Language selector component with dropdown
 * Supports auto-detect for source language
 */
import { FiChevronDown } from 'react-icons/fi';
import { getSourceLanguages, getTargetLanguages } from '../utils/languages';

const LanguageSelector = ({ value, onChange, type = 'source', disabled = false }) => {
  const languages = type === 'source' ? getSourceLanguages() : getTargetLanguages();

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="select-field pr-10 appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name} {lang.code !== 'auto' && `(${lang.nativeName})`}
          </option>
        ))}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <FiChevronDown className="text-gray-500 dark:text-gray-400" size={20} />
      </div>
    </div>
  );
};

export default LanguageSelector;
