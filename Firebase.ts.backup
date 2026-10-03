import { initializeApp } from 'firebase/app';

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
} from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBgJFlQoo8mozQ_Gs5uvDQJZEGXYUIineM',
  authDomain: 'fourth-kayak-cvr20.firebaseapp.com',
  projectId: 'fourth-kayak-cvr20',
  storageBucket: 'fourth-kayak-cvr20.firebasestorage.app',
  messagingSenderId: '851538867326',
  appId: '1:851538867326:web:e2262117ea4d62560c542f',
  measurementId: '',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Auth
export const auth = getAuth(app);

// Firestore
export const db = getFirestore(app);

// Google authentication provider
const googleProvider = new GoogleAuthProvider();

// -----------------------------
// Google Sign In
// -----------------------------
export async function signInWithGoogle() {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

// -----------------------------
// Logout
// -----------------------------
export async function logOut() {
  await signOut(auth);
}

// -----------------------------
// Save user history
// -----------------------------
export async function saveToUserHistory(
  userId: string,
  item: Record<string, unknown>
) {
  const docRef = await addDoc(collection(db, 'userHistory'), {
    userId,
    ...item,
    createdAt: Date.now(),
  });

  return docRef.id;
}

// -----------------------------
// Get user history
// -----------------------------
export async function getUserHistory(userId: string) {
  const q = query(
    collection(db, 'userHistory'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }));
}

// -----------------------------
// Delete history item
// -----------------------------
export async function deleteUserHistoryItem(
  userId: string,
  id: string
) {
  const itemRef = doc(db, 'userHistory', id);

  await deleteDoc(itemRef);
}

// -----------------------------
// Submit DMCA report
// -----------------------------
export async function submitDmcaReport(data: {
  claimantName: string;
  claimantEmail: string;
  targetUrl: string;
  statement: string;
}) {
  const docRef = await addDoc(collection(db, 'dmcaReports'), {
    claimantName: data.claimantName,
    claimantEmail: data.claimantEmail,
    targetUrl: data.targetUrl,
    statement: data.statement,
    createdAt: Date.now(),
  });

  return docRef.id;
}

export default app;
