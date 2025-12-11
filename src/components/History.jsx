/**
 * Translation history component
 * Shows list of past translations with ability to reuse or delete
 */
import { useState } from 'react';
import { FiTrash2, FiClock, FiArrowRight, FiX } from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import { deleteHistoryItem, clearHistory } from '../utils/db';
import { getLanguageName } from '../utils/languages';

const History = () => {
  const { history, refreshHistory, isLoadingHistory, setSourceText, setSourceLang, setTargetLang } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    try {
      setDeletingId(id);
      await deleteHistoryItem(id);
      refreshHistory();
    } catch (error) {
      console.error('Failed to delete history item:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm('Are you sure you want to clear all history?')) {
      return;
    }

    try {
      await clearHistory();
      refreshHistory();
    } catch (error) {
      console.error('Failed to clear history:', error);
    }
  };

  const handleUseTranslation = (item) => {
    setSourceText(item.sourceText);
    setSourceLang(item.fromLang);
    setTargetLang(item.toLang);
    setIsOpen(false);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    // Less than 1 minute
    if (diff < 60000) {
      return 'Just now';
    }
    
    // Less than 1 hour
    if (diff < 3600000) {
      const minutes = Math.floor(diff / 60000);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    }
    
    // Less than 1 day
    if (diff < 86400000) {
      const hours = Math.floor(diff / 3600000);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }
    
    // Default format
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110 z-40"
        title="Translation history"
      >
        <FiClock size={24} />
        {history.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
            {history.length > 99 ? '99+' : history.length}
          </span>
        )}
      </button>

      {/* History Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 animate-fade-in"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white dark:bg-gray-800 shadow-2xl z-50 transform transition-transform duration-300 animate-slide-up">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2">
                  <FiClock className="text-primary-600" size={24} />
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    History
                  </h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <FiX className="text-gray-600 dark:text-gray-400" size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4">
                {isLoadingHistory ? (
                  <div className="flex items-center justify-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                  </div>
                ) : history.length === 0 ? (
                  <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                    <FiClock size={48} className="mx-auto mb-4 opacity-50" />
                    <p>No translation history yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {history.map((item) => (
                      <div
                        key={item.id}
                        className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => handleUseTranslation(item)}
                      >
                        {/* Languages */}
                        <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
                          <span>{getLanguageName(item.fromLang)}</span>
                          <FiArrowRight size={12} />
                          <span>{getLanguageName(item.toLang)}</span>
                          <span className="ml-auto">{formatDate(item.timestamp)}</span>
                        </div>

                        {/* Text Preview */}
                        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 mb-1">
                          {item.sourceText}
                        </p>
                        <p className="text-sm text-primary-600 dark:text-primary-400 line-clamp-2">
                          {item.translatedText}
                        </p>

                        {/* Delete Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(item.id);
                          }}
                          disabled={deletingId === item.id}
                          className="mt-2 p-1 rounded hover:bg-red-100 dark:hover:bg-red-900 text-red-500 transition-colors"
                          title="Delete"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {history.length > 0 && (
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={handleClearAll}
                    className="w-full btn-secondary py-2 flex items-center justify-center space-x-2"
                  >
                    <FiTrash2 size={16} />
                    <span>Clear All History</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default History;
