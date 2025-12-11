/**
 * Main Translator page component
 * Combines all translation UI components
 */
import { FiAlertCircle } from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import Header from '../components/Header';
import TranslationControls from '../components/TranslationControls';
import TextInput from '../components/TextInput';
import TextOutput from '../components/TextOutput';
import History from '../components/History';

const Translator = () => {
  const { translationError, isOnline } = useApp();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Offline Warning */}
        {!isOnline && (
          <div className="bg-orange-100 dark:bg-orange-900 border border-orange-200 dark:border-orange-700 rounded-lg p-4 mb-6 animate-fade-in">
            <div className="flex items-center space-x-3">
              <FiAlertCircle className="text-orange-600 dark:text-orange-400 flex-shrink-0" size={24} />
              <div>
                <p className="font-semibold text-orange-800 dark:text-orange-200">
                  You're offline
                </p>
                <p className="text-sm text-orange-700 dark:text-orange-300">
                  Limited translations available using cached data and offline dictionaries
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {translationError && (
          <div className="bg-red-100 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-4 mb-6 animate-fade-in">
            <div className="flex items-center space-x-3">
              <FiAlertCircle className="text-red-600 dark:text-red-400 flex-shrink-0" size={24} />
              <div>
                <p className="font-semibold text-red-800 dark:text-red-200">
                  Translation Error
                </p>
                <p className="text-sm text-red-700 dark:text-red-300">
                  {translationError}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Translation Controls */}
        <div className="mb-6">
          <TranslationControls />
        </div>

        {/* Translation Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TextInput />
          <TextOutput />
        </div>

        {/* Features Info */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <FeatureCard
            icon="🌐"
            title="50+ Languages"
            description="Support for major world languages"
          />
          <FeatureCard
            icon="📡"
            title="Offline Mode"
            description="Basic translations work offline"
          />
          <FeatureCard
            icon="🎤"
            title="Voice Input"
            description="Speak to translate"
          />
          <FeatureCard
            icon="🔊"
            title="Text-to-Speech"
            description="Listen to translations"
          />
        </div>
      </main>

      {/* History Panel */}
      <History />
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center hover:shadow-lg transition-shadow">
    <div className="text-4xl mb-2">{icon}</div>
    <h3 className="font-semibold text-gray-800 dark:text-white mb-1">{title}</h3>
    <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
  </div>
);

export default Translator;
