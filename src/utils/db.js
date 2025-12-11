/**
 * IndexedDB utility for storing translation history and offline data
 * Uses idb library for better Promise-based API
 */
import { openDB } from 'idb';

const DB_NAME = 'TranslatorDB';
const DB_VERSION = 1;
const HISTORY_STORE = 'translationHistory';
const CACHE_STORE = 'translationCache';

/**
 * Initialize and open the IndexedDB database
 */
export const initDB = async () => {
  try {
    const db = await openDB(DB_NAME, DB_VERSION, {
      upgrade(db, oldVersion, newVersion, transaction) {
        // Create history store
        if (!db.objectStoreNames.contains(HISTORY_STORE)) {
          const historyStore = db.createObjectStore(HISTORY_STORE, {
            keyPath: 'id',
            autoIncrement: true,
          });
          historyStore.createIndex('timestamp', 'timestamp', { unique: false });
          historyStore.createIndex('fromLang', 'fromLang', { unique: false });
          historyStore.createIndex('toLang', 'toLang', { unique: false });
        }

        // Create cache store for offline translations
        if (!db.objectStoreNames.contains(CACHE_STORE)) {
          const cacheStore = db.createObjectStore(CACHE_STORE, {
            keyPath: 'key',
          });
          cacheStore.createIndex('timestamp', 'timestamp', { unique: false });
        }
      },
    });
    return db;
  } catch (error) {
    console.error('Error initializing IndexedDB:', error);
    throw error;
  }
};

/**
 * Save translation to history
 */
export const saveToHistory = async (translation) => {
  try {
    const db = await initDB();
    const tx = db.transaction(HISTORY_STORE, 'readwrite');
    const store = tx.objectStore(HISTORY_STORE);
    
    const historyItem = {
      ...translation,
      timestamp: Date.now(),
    };
    
    await store.add(historyItem);
    await tx.done;
    
    return historyItem;
  } catch (error) {
    console.error('Error saving to history:', error);
    throw error;
  }
};

/**
 * Get translation history (latest first)
 */
export const getHistory = async (limit = 50) => {
  try {
    const db = await initDB();
    const tx = db.transaction(HISTORY_STORE, 'readonly');
    const store = tx.objectStore(HISTORY_STORE);
    const index = store.index('timestamp');
    
    const history = await index.getAll();
    
    // Sort by timestamp descending (latest first)
    return history.reverse().slice(0, limit);
  } catch (error) {
    console.error('Error getting history:', error);
    return [];
  }
};

/**
 * Delete history item by id
 */
export const deleteHistoryItem = async (id) => {
  try {
    const db = await initDB();
    const tx = db.transaction(HISTORY_STORE, 'readwrite');
    const store = tx.objectStore(HISTORY_STORE);
    
    await store.delete(id);
    await tx.done;
    
    return true;
  } catch (error) {
    console.error('Error deleting history item:', error);
    throw error;
  }
};

/**
 * Clear all history
 */
export const clearHistory = async () => {
  try {
    const db = await initDB();
    const tx = db.transaction(HISTORY_STORE, 'readwrite');
    const store = tx.objectStore(HISTORY_STORE);
    
    await store.clear();
    await tx.done;
    
    return true;
  } catch (error) {
    console.error('Error clearing history:', error);
    throw error;
  }
};

/**
 * Save translation to cache for offline use
 */
export const saveToCache = async (key, translation) => {
  try {
    const db = await initDB();
    const tx = db.transaction(CACHE_STORE, 'readwrite');
    const store = tx.objectStore(CACHE_STORE);
    
    const cacheItem = {
      key,
      translation,
      timestamp: Date.now(),
    };
    
    await store.put(cacheItem);
    await tx.done;
    
    return cacheItem;
  } catch (error) {
    console.error('Error saving to cache:', error);
    throw error;
  }
};

/**
 * Get cached translation
 */
export const getFromCache = async (key) => {
  try {
    const db = await initDB();
    const tx = db.transaction(CACHE_STORE, 'readonly');
    const store = tx.objectStore(CACHE_STORE);
    
    const cached = await store.get(key);
    
    if (cached) {
      // Check if cache is still valid (7 days)
      const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
      if (Date.now() - cached.timestamp < maxAge) {
        return cached.translation;
      } else {
        // Delete expired cache
        await deleteFromCache(key);
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error getting from cache:', error);
    return null;
  }
};

/**
 * Delete cached translation
 */
export const deleteFromCache = async (key) => {
  try {
    const db = await initDB();
    const tx = db.transaction(CACHE_STORE, 'readwrite');
    const store = tx.objectStore(CACHE_STORE);
    
    await store.delete(key);
    await tx.done;
    
    return true;
  } catch (error) {
    console.error('Error deleting from cache:', error);
    throw error;
  }
};

/**
 * Clear all cache
 */
export const clearCache = async () => {
  try {
    const db = await initDB();
    const tx = db.transaction(CACHE_STORE, 'readwrite');
    const store = tx.objectStore(CACHE_STORE);
    
    await store.clear();
    await tx.done;
    
    return true;
  } catch (error) {
    console.error('Error clearing cache:', error);
    throw error;
  }
};
