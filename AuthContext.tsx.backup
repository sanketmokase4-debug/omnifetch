import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import {
  auth,
  signInWithGoogle as fbSignIn,
  logOut as fbSignOut,
  saveToUserHistory,
  getUserHistory,
  deleteUserHistoryItem
} from './firebase'
import { UserHistoryRecord } from './types'

const ADMIN_EMAIL = 'babalumokase@gmail.com';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  history: UserHistoryRecord[];
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  addToHistory: (item: Omit<UserHistoryRecord, 'id' | 'userId'>) => Promise<void>;
  removeFromHistory: (id: string) => Promise<void>;
  refreshHistory: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  loading: true,
  history: [],
  signIn: async () => {},
  signOut: async () => {},
  addToHistory: async () => {},
  removeFromHistory: async () => {},
  refreshHistory: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<UserHistoryRecord[]>([]);

  const isAdmin = Boolean(user && user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase());

  const loadHistory = async (userId: string) => {
    try {
      const items = await getUserHistory(userId);
      setHistory(items);
    } catch (err) {
      console.warn('Could not load history:', err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        await loadHistory(currentUser.uid);
      } else {
        setHistory([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const signIn = async () => {
    try {
      const loggedUser = await fbSignIn();
      if (loggedUser) {
        await loadHistory(loggedUser.uid);
      }
    } catch (error) {
      console.error('Sign-in failed:', error);
    }
  };

  const signOut = async () => {
    try {
      await fbSignOut();
      setUser(null);
      setHistory([]);
    } catch (error) {
      console.error('Sign-out failed:', error);
    }
  };

  const addToHistory = async (item: Omit<UserHistoryRecord, 'id' | 'userId'>) => {
    if (!user) {
      // Store in localStorage for guest
      const guestHistory = JSON.parse(localStorage.getItem('omnifetch_guest_history') || '[]');
      const newRecord: UserHistoryRecord = {
        id: 'guest_' + Date.now(),
        userId: 'guest',
        ...item
      };
      const updated = [newRecord, ...guestHistory].slice(0, 30);
      localStorage.setItem('omnifetch_guest_history', JSON.stringify(updated));
      setHistory(updated);
      return;
    }

    try {
      const newId = await saveToUserHistory(user.uid, item);
      if (newId) {
        setHistory(prev => [{ id: newId, userId: user.uid, ...item }, ...prev]);
      }
    } catch (err) {
      console.error('Failed to save to history:', err);
    }
  };

  const removeFromHistory = async (id: string) => {
    if (!user) {
      const guestHistory = JSON.parse(localStorage.getItem('omnifetch_guest_history') || '[]');
      const updated = guestHistory.filter((i: UserHistoryRecord) => i.id !== id);
      localStorage.setItem('omnifetch_guest_history', JSON.stringify(updated));
      setHistory(updated);
      return;
    }

    try {
      await deleteUserHistoryItem(user.uid, id);
      setHistory(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error('Failed to remove history item:', err);
    }
  };

  const refreshHistory = async () => {
    if (user) {
      await loadHistory(user.uid);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        loading,
        history,
        signIn,
        signOut,
        addToHistory,
        removeFromHistory,
        refreshHistory
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
