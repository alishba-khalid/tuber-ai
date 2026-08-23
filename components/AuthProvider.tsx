'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db, isFirebaseConfigured } from '@/lib/firebase';
import { doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs, onSnapshot } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: any;
  loading: boolean;
  logout: () => Promise<void>;
  credits: number;
  projects: any[];
  isMock: boolean;
  loginMockUser: (email: string) => Promise<void>;
  signupMockUser: (email: string) => Promise<void>;
  saveProject: (project: any) => Promise<void>;
  updateProjectProgress: (id: string, status: string, stageIndex: number, progressPercent: number) => Promise<void>;
  deductCredits: (amount: number) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: async () => {},
  credits: 0,
  projects: [],
  isMock: true,
  loginMockUser: async () => {},
  signupMockUser: async () => {},
  saveProject: async () => {},
  updateProjectProgress: async () => {},
  deductCredits: async () => false,
});

const defaultMockProjects = [
  { id: '1', title: 'The Complete History of Ancient Rome', status: 'completed', duration: '2h 15m', format: 'Documentary', credits: 405, date: '2026-08-18', views: '12.4K', voice: 'Marcus', aspect: '16:9', topic: 'Roman Empire from rise to collapse' },
  { id: '2', title: 'How Black Holes Actually Work', status: 'generating', duration: '45 min', format: 'Explainer', credits: 225, date: '2026-08-18', stageIndex: 2, progress: 67, voice: 'Aria', aspect: '16:9', topic: 'Visual guide to black hole physics' },
  { id: '3', title: 'A Quiet Night in the Amazon Rainforest', status: 'completed', duration: '8h 00m', format: 'Sleep Story', credits: 2400, date: '2026-08-17', views: '8.2K', voice: 'Luna', aspect: '16:9', topic: 'Soothing rain and ambient sound story' },
  { id: '4', title: 'The Rise and Fall of Wall Street', status: 'completed', duration: '1h 30m', format: 'Documentary', credits: 450, date: '2026-08-17', views: '5.1K', voice: 'James', aspect: '16:9', topic: 'Financial markets and crashes' },
  { id: '5', title: 'Atomic Habits — Complete Book Summary', status: 'completed', duration: '1h 00m', format: 'Book Summary', credits: 300, date: '2026-08-16', views: '22.3K', voice: 'Nova', aspect: '16:9', topic: 'Review of James Clear book' },
  { id: '6', title: 'True Crime: The Zodiac Killer', status: 'completed', duration: '1h 45m', format: 'True Crime', credits: 525, date: '2026-08-15', views: '45.1K', voice: 'Ethan', aspect: '16:9', topic: 'Unsolved serial murder mystery' },
  { id: '7', title: 'The Psychology of Money', status: 'queued', duration: '2h 00m', format: 'Book Summary', credits: 600, date: '2026-08-18', voice: 'Marcus', aspect: '16:9', topic: 'Morgan Housel book summary' },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [credits, setCredits] = useState(0);
  const [projects, setProjects] = useState<any[]>([]);
  const router = useRouter();

  // Load and subscribe to authentication changes
  useEffect(() => {
    let unsubscribeUser: (() => void) | null = null;

    if (isFirebaseConfigured && auth) {
      const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          setUser(currentUser);
          
          // 1. Fetch or create user record in Firestore
          const userRef = doc(db, 'users', currentUser.uid);
          try {
            const userDoc = await getDoc(userRef);
            if (!userDoc.exists()) {
              await setDoc(userRef, {
                email: currentUser.email,
                credits: 300,
                createdAt: new Date().toISOString(),
              });

              // Seed initial transaction history
              const txRef = doc(collection(db, 'users', currentUser.uid, 'transactions'));
              await setDoc(txRef, {
                id: txRef.id,
                desc: 'Setup founding user credits',
                credits: 300,
                amount: 0,
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                createdAt: new Date().toISOString(),
                type: 'renewal'
              });
            }
          } catch (e) {
            console.error("Firestore user doc check failed:", e);
          }

          // Realtime user doc subscription
          unsubscribeUser = onSnapshot(userRef, (docSnap) => {
            if (docSnap.exists()) {
              setCredits(docSnap.data().credits ?? 0);
            }
          }, (err) => {
            console.error("Firestore user doc subscription failed:", err);
          });

          // 2. Fetch projects from Firestore
          try {
            const q = query(collection(db, 'projects'), where('userId', '==', currentUser.uid));
            const querySnapshot = await getDocs(q);
            const userProjects: any[] = [];
            querySnapshot.forEach((d) => {
              userProjects.push({ id: d.id, ...d.data() });
            });
            
            // We do not automatically seed mock projects for real Firestore accounts to keep it clean.
            setProjects(userProjects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
          } catch (e) {
            console.error("Firestore projects fetch failed:", e);
          }
        } else {
          setUser(null);
          setCredits(0);
          setProjects([]);
          if (unsubscribeUser) {
            unsubscribeUser();
            unsubscribeUser = null;
          }
        }
        setLoading(false);
      });
      return () => {
        unsubscribeAuth();
        if (unsubscribeUser) unsubscribeUser();
      };
    } else {
      // --- MOCK MODE: localStorage-based fallback ---
      const loadMockUser = () => {
        const storedUser = localStorage.getItem('genbyghost_mock_user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          
          // Load Credits
          const storedCredits = localStorage.getItem(`genbyghost_credits_${parsedUser.uid}`);
          if (storedCredits !== null) {
            setCredits(parseInt(storedCredits, 10));
          } else {
            localStorage.setItem(`genbyghost_credits_${parsedUser.uid}`, '300');
            setCredits(300);
          }

          // Load Projects
          const storedProjects = localStorage.getItem(`genbyghost_projects_${parsedUser.uid}`);
          if (storedProjects) {
            setProjects(JSON.parse(storedProjects));
          } else {
            localStorage.setItem(`genbyghost_projects_${parsedUser.uid}`, JSON.stringify(defaultMockProjects));
            setProjects(defaultMockProjects);
          }
        } else {
          setUser(null);
          setCredits(0);
          setProjects([]);
        }
        setLoading(false);
      };

      loadMockUser();
      
      // Listen to storage events to sync multiple tabs if needed
      window.addEventListener('storage', loadMockUser);
      return () => window.removeEventListener('storage', loadMockUser);
    }
  }, []);

  const loginMockUser = async (email: string) => {
    const mockUser = {
      uid: 'mock-uid-' + email.replace(/[^a-zA-Z0-9]/g, ''),
      email: email,
    };
    localStorage.setItem('genbyghost_mock_user', JSON.stringify(mockUser));
    
    // Check if credits exist, otherwise set 300
    const credKey = `genbyghost_credits_${mockUser.uid}`;
    if (localStorage.getItem(credKey) === null) {
      localStorage.setItem(credKey, '300');
    }
    
    // Check if projects exist, otherwise set default projects
    const projKey = `genbyghost_projects_${mockUser.uid}`;
    if (localStorage.getItem(projKey) === null) {
      localStorage.setItem(projKey, JSON.stringify(defaultMockProjects));
    }

    // Trigger state update
    setUser(mockUser);
    setCredits(parseInt(localStorage.getItem(credKey) || '300', 10));
    setProjects(JSON.parse(localStorage.getItem(projKey) || '[]'));
  };

  const signupMockUser = async (email: string) => {
    await loginMockUser(email);
  };

  const logout = async () => {
    if (isFirebaseConfigured && auth) {
      await signOut(auth);
    } else {
      localStorage.removeItem('genbyghost_mock_user');
      setUser(null);
      setCredits(0);
      setProjects([]);
    }
    router.push('/');
  };

  const saveProject = async (project: any) => {
    if (!user) return;

    const newProject = {
      ...project,
      userId: user.uid,
      date: new Date().toISOString().split('T')[0],
    };

    if (isFirebaseConfigured && db) {
      try {
        const projectRef = doc(collection(db, 'projects'), newProject.id);
        await setDoc(projectRef, newProject);
        setProjects(prev => [newProject, ...prev]);
      } catch (e) {
        console.error("Firestore save project failed:", e);
      }
    } else {
      const updatedProjects = [newProject, ...projects];
      localStorage.setItem(`genbyghost_projects_${user.uid}`, JSON.stringify(updatedProjects));
      setProjects(updatedProjects);
    }
  };

  const updateProjectProgress = async (id: string, status: string, stageIndex: number, progressPercent: number) => {
    if (!user) return;

    if (isFirebaseConfigured && db) {
      try {
        const projectRef = doc(db, 'projects', id);
        await updateDoc(projectRef, {
          status,
          stageIndex,
          progress: progressPercent,
        });
        setProjects(prev => prev.map(p => p.id === id ? { ...p, status, stageIndex, progress: progressPercent } : p));
      } catch (e) {
        console.error("Firestore project progress update failed:", e);
      }
    } else {
      const updatedProjects = projects.map(p => {
        if (p.id === id) {
          return {
            ...p,
            status,
            stageIndex,
            progress: progressPercent,
            // If completed, add mock views to look premium
            views: status === 'completed' ? '12.4K' : p.views,
          };
        }
        return p;
      });
      localStorage.setItem(`genbyghost_projects_${user.uid}`, JSON.stringify(updatedProjects));
      setProjects(updatedProjects);
    }
  };

  const deductCredits = async (amount: number): Promise<boolean> => {
    if (!user || credits < amount) return false;

    const newBalance = credits - amount;

    if (isFirebaseConfigured && db) {
      try {
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, { credits: newBalance });
        setCredits(newBalance);
        return true;
      } catch (e) {
        console.error("Firestore deduct credits failed:", e);
        return false;
      }
    } else {
      localStorage.setItem(`genbyghost_credits_${user.uid}`, newBalance.toString());
      setCredits(newBalance);
      return true;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      logout, 
      credits, 
      projects, 
      isMock: !isFirebaseConfigured,
      loginMockUser,
      signupMockUser,
      saveProject,
      updateProjectProgress,
      deductCredits
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

