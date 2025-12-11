/**
 * Header component with app title, theme toggle, and online status
 */
import { FiMoon, FiSun, FiWifiOff, FiWifi } from 'react-icons/fi';
import { useApp } from '../context/AppContext';

const Header = () => {
  const { theme, toggleTheme, isOnline } = useApp();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="bg-primary-600 p-2 rounded-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                Multi-Language Translator
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Translate anywhere, anytime
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Online Status */}
            <div className="flex items-center space-x-2">
              {isOnline ? (
                <>
                  <FiWifi className="text-green-500" size={20} />
                  <span className="text-sm text-gray-600 dark:text-gray-400 hidden sm:inline">
                    Online
                  </span>
                </>
              ) : (
                <>
                  <FiWifiOff className="text-orange-500" size={20} />
                  <span className="text-sm text-gray-600 dark:text-gray-400 hidden sm:inline">
                    Offline
                  </span>
                </>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <FiMoon className="text-gray-700 dark:text-gray-300" size={20} />
              ) : (
                <FiSun className="text-gray-700 dark:text-gray-300" size={20} />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
