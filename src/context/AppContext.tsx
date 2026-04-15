// import React, { createContext, useContext, useState, useCallback } from 'react';
// import type { Currency, Booking, WalletState } from '@/types';
// import * as api from '@/services/api';

// interface AppContextType {
//   currency: Currency;
//   setCurrency: (c: Currency) => void;
//   wallet: WalletState;
//   refreshWallet: () => Promise<void>;
//   bookings: Booking[];
//   refreshBookings: () => Promise<void>;
//   createBooking: (data: { hospitalId: string; doctorId: string; roomId: string; priceUSD: number }) => Promise<Booking>;
//   updateTask: (bookingId: string, taskId: string, completed: boolean) => Promise<void>;
//   vendorAuth: boolean;
//   vendorLogin: (u: string, p: string) => Promise<boolean>;
//   vendorLogout: () => void;
// }

// const AppContext = createContext<AppContextType | null>(null);

// export function AppProvider({ children }: { children: React.ReactNode }) {
//   const [currency, setCurrency] = useState<Currency>('USD');
//   const [wallet, setWallet] = useState<WalletState>({ balanceUSD: 0, transactions: [] });
//   const [bookings, setBookings] = useState<Booking[]>([]);
//   const [vendorAuth, setVendorAuth] = useState(false);

//   const refreshWallet = useCallback(async () => {
//     const w = await api.fetchWallet();
//     setWallet(w);
//   }, []);

//   const refreshBookings = useCallback(async () => {
//     const b = await api.fetchBookings();
//     setBookings(b);
//   }, []);

//   const createBooking = useCallback(async (data: { hospitalId: string; doctorId: string; roomId: string; priceUSD: number }) => {
//     const booking = await api.createBooking(data);
//     await refreshBookings();
//     await refreshWallet();
//     return booking;
//   }, [refreshBookings, refreshWallet]);

//   const updateTask = useCallback(async (bookingId: string, taskId: string, completed: boolean) => {
//     await api.updateTaskStatus(bookingId, taskId, completed);
//     await refreshBookings();
//   }, [refreshBookings]);

//   const vendorLogin = useCallback(async (u: string, p: string) => {
//     const ok = await api.vendorLogin(u, p);
//     if (ok) setVendorAuth(true);
//     return ok;
//   }, []);

//   const vendorLogout = useCallback(() => setVendorAuth(false), []);

//   return (
//     <AppContext.Provider value={{ currency, setCurrency, wallet, refreshWallet, bookings, refreshBookings, createBooking, updateTask, vendorAuth, vendorLogin, vendorLogout }}>
//       {children}
//     </AppContext.Provider>
//   );
// }

// export function useApp() {
//   const ctx = useContext(AppContext);
//   if (!ctx) throw new Error('useApp must be used within AppProvider');
//   return ctx;
// }







import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { Currency, Booking, WalletState } from '@/types';
import * as api from '@/services/api';
import { auth } from '@/lib/firebase';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider,
  signOut
} from 'firebase/auth';

interface Patient {
  id: string;
  name: string;
  email: string;
}

interface AppContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  wallet: WalletState;
  refreshWallet: () => Promise<void>;
  bookings: Booking[];
  refreshBookings: () => Promise<void>;
  createBooking: (data: { hospitalId: string; doctorId: string; roomId: string; priceUSD: number }) => Promise<Booking>;
  updateTask: (bookingId: string, taskId: string, completed: boolean) => Promise<void>;
  vendorAuth: boolean;
  vendorLogin: (u: string, p: string) => Promise<boolean>;
  vendorLogout: () => void;
  patient: Patient | null;
  patientLogin: () => Promise<void>; // Simplified!
  patientLogout: () => Promise<void>;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('USD');
  const [wallet, setWallet] = useState<WalletState>({ balanceUSD: 0, transactions: [] });
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [vendorAuth, setVendorAuth] = useState(false);
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setPatient({
          id: user.uid,
          name: user.displayName || 'International Patient',
          email: user.email || ''
        });
      } else {
        setPatient(null);
        setWallet({ balanceUSD: 0, transactions: [] });
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (patient) {
      api.fetchWallet(patient.id).then(setWallet);
    }
  }, [patient]);

  const refreshWallet = useCallback(async () => {
    if (patient) {
      const w = await api.fetchWallet(patient.id);
      setWallet(w);
    }
  }, [patient]);

  const refreshBookings = useCallback(async () => {
    const b = await api.fetchBookings();
    setBookings(b);
  }, []);

  const createBooking = useCallback(async (data: { hospitalId: string; doctorId: string; roomId: string; priceUSD: number }) => {
    if (!patient) throw new Error("Must be logged in to book");
    const booking = await api.createBooking(data, patient.id, patient.name);
    await refreshBookings();
    await refreshWallet();
    return booking;
  }, [patient, refreshBookings, refreshWallet]);

  const updateTask = useCallback(async (bookingId: string, taskId: string, completed: boolean) => {
    await api.updateTaskStatus(bookingId, taskId, completed);
    await refreshBookings();
  }, [refreshBookings]);

  const vendorLogin = useCallback(async (u: string, p: string) => {
    const ok = await api.vendorLogin(u, p);
    if (ok) setVendorAuth(true);
    return ok;
  }, []);

  const vendorLogout = useCallback(() => setVendorAuth(false), []);

  // 🚀 The new, frictionless Google Login
  const patientLogin = useCallback(async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  }, []);

  const patientLogout = useCallback(async () => {
    await signOut(auth);
  }, []);

  return (
    <AppContext.Provider value={{ 
      currency, setCurrency, wallet, refreshWallet, bookings, refreshBookings, 
      createBooking, updateTask, vendorAuth, vendorLogin, vendorLogout,
      patient, patientLogin, patientLogout 
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}