import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Helper to check if storage is available
const isStorageAvailable = () => {
  try {
    const testKey = '__storage_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

// Create a fallback memory storage
const createFallbackStorage = () => {
  const map = new Map();
  return {
    getItem: (name) => {
      const item = map.get(name);
      return item ? JSON.parse(item) : null;
    },
    setItem: (name, value) => {
      map.set(name, JSON.stringify(value));
    },
    removeItem: (name) => map.delete(name),
  };
};

// Select appropriate storage
const getStorage = () => {
  if (isStorageAvailable()) {
    return createJSONStorage(() => localStorage);
  }
  console.warn('localStorage not available, using in-memory storage');
  return createJSONStorage(() => createFallbackStorage());
};

const useAuthenticationStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setUser: (user) => set({ user }),
      logout: () => set({ isAuthenticated: false, user: null }),
    }),
    {
      name: 'admin-storage',
      storage: getStorage(),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
      onError: (error) => {
        console.warn('Storage error:', error);
        // You could add additional error handling here if needed
      },
    }
  )
);

export default useAuthenticationStore;
