// import type { Hospital, Doctor, RoomType, PricingEntry, Booking, BookingTask, WalletState, WalletTransaction } from '@/types';

// // ── Seed Data ──

// const hospitals: Hospital[] = [
//   { id: 'h1', name: 'Apollo Spectra', location: 'Delhi', procedure: 'Total Knee Replacement', imageUrl: '', accredited: true },
//   { id: 'h2', name: 'Max Saket', location: 'Delhi', procedure: 'Total Knee Replacement', imageUrl: '', accredited: true },
//   { id: 'h3', name: 'Fortis Gurgaon', location: 'Gurgaon', procedure: 'Total Knee Replacement', imageUrl: '', accredited: true },
// ];

// const doctors: Doctor[] = [
//   { id: 'd1', name: 'Dr. Ramesh Kumar', experience: 16, hospitalId: 'h1' },
//   { id: 'd2', name: 'Dr. Priya Sharma', experience: 12, hospitalId: 'h1' },
//   { id: 'd3', name: 'Dr. Vikram Singh', experience: 18, hospitalId: 'h2' },
//   { id: 'd4', name: 'Dr. Anita Desai', experience: 15, hospitalId: 'h2' },
//   { id: 'd5', name: 'Dr. Mohit Verma', experience: 10, hospitalId: 'h2' },
//   { id: 'd6', name: 'Dr. Sunil Mehta', experience: 20, hospitalId: 'h3' },
// ];

// const roomTypes: RoomType[] = [
//   { id: 'r1', name: 'General Ward' },
//   { id: 'r2', name: 'Semi-Private' },
//   { id: 'r3', name: 'Private' },
//   { id: 'r4', name: 'Suite' },
// ];

// const pricing: PricingEntry[] = [
//   // Apollo Spectra
//   { hospitalId: 'h1', doctorId: 'd1', roomId: 'r1', priceUSD: 3200 },
//   { hospitalId: 'h1', doctorId: 'd2', roomId: 'r1', priceUSD: 3000 },
//   { hospitalId: 'h1', doctorId: 'd1', roomId: 'r2', priceUSD: 3800 },
//   { hospitalId: 'h1', doctorId: 'd2', roomId: 'r2', priceUSD: 3600 },
//   { hospitalId: 'h1', doctorId: 'd1', roomId: 'r3', priceUSD: 4500 },
//   { hospitalId: 'h1', doctorId: 'd2', roomId: 'r3', priceUSD: 4200 },
//   // Max Saket
//   { hospitalId: 'h2', doctorId: 'd3', roomId: 'r1', priceUSD: 3500 },
//   { hospitalId: 'h2', doctorId: 'd4', roomId: 'r1', priceUSD: 3400 },
//   { hospitalId: 'h2', doctorId: 'd5', roomId: 'r1', priceUSD: 3100 },
//   { hospitalId: 'h2', doctorId: 'd3', roomId: 'r2', priceUSD: 4200 },
//   { hospitalId: 'h2', doctorId: 'd4', roomId: 'r2', priceUSD: 4000 },
//   { hospitalId: 'h2', doctorId: 'd5', roomId: 'r2', priceUSD: 3700 },
//   { hospitalId: 'h2', doctorId: 'd3', roomId: 'r3', priceUSD: 5000 },
//   { hospitalId: 'h2', doctorId: 'd4', roomId: 'r3', priceUSD: 4800 },
//   { hospitalId: 'h2', doctorId: 'd5', roomId: 'r3', priceUSD: 4400 },
//   { hospitalId: 'h2', doctorId: 'd3', roomId: 'r4', priceUSD: 6500 },
//   { hospitalId: 'h2', doctorId: 'd4', roomId: 'r4', priceUSD: 6200 },
//   { hospitalId: 'h2', doctorId: 'd5', roomId: 'r4', priceUSD: 5800 },
//   // Fortis Gurgaon
//   { hospitalId: 'h3', doctorId: 'd6', roomId: 'r2', priceUSD: 3900 },
//   { hospitalId: 'h3', doctorId: 'd6', roomId: 'r3', priceUSD: 4600 },
// ];

// // ── In-memory state ──

// let bookings: Booking[] = [];
// let wallet: WalletState = { balanceUSD: 0, transactions: [] };

// // ── Async API Functions ──

// const delay = (ms = 300) => new Promise(r => setTimeout(r, ms));

// export async function fetchHospitals(): Promise<Hospital[]> {
//   await delay();
//   return [...hospitals];
// }

// export async function fetchDoctorsForHospital(hospitalId: string): Promise<Doctor[]> {
//   await delay(100);
//   return doctors.filter(d => d.hospitalId === hospitalId);
// }

// export async function fetchRoomTypesForHospital(hospitalId: string): Promise<RoomType[]> {
//   await delay(100);
//   const roomIds = [...new Set(pricing.filter(p => p.hospitalId === hospitalId).map(p => p.roomId))];
//   return roomTypes.filter(r => roomIds.includes(r.id));
// }

// export async function fetchPricing(hospitalId: string): Promise<PricingEntry[]> {
//   await delay(100);
//   return pricing.filter(p => p.hospitalId === hospitalId);
// }

// export function getLowestPrice(hospitalId: string): number {
//   const entries = pricing.filter(p => p.hospitalId === hospitalId);
//   return Math.min(...entries.map(e => e.priceUSD));
// }

// export function getPrice(hospitalId: string, doctorId: string, roomId: string): number | null {
//   const entry = pricing.find(p => p.hospitalId === hospitalId && p.doctorId === doctorId && p.roomId === roomId);
//   return entry?.priceUSD ?? null;
// }

// export function getLowestPriceDoctor(hospitalId: string): { doctorId: string; roomId: string; price: number } {
//   const entries = pricing.filter(p => p.hospitalId === hospitalId);
//   const lowest = entries.reduce((min, e) => e.priceUSD < min.priceUSD ? e : min, entries[0]);
//   return { doctorId: lowest.doctorId, roomId: lowest.roomId, price: lowest.priceUSD };
// }

// export async function createBooking(data: {
//   hospitalId: string;
//   doctorId: string;
//   roomId: string;
//   priceUSD: number;
// }): Promise<Booking> {
//   await delay(500);
//   const booking: Booking = {
//     id: `BK-${Date.now().toString(36).toUpperCase()}`,
//     patientName: 'John Doe',
//     hospitalId: data.hospitalId,
//     doctorId: data.doctorId,
//     roomId: data.roomId,
//     priceUSD: data.priceUSD,
//     status: 'Confirmed',
//     createdAt: new Date().toISOString(),
//     tasks: [
//       { id: `t1-${Date.now()}`, label: 'Visa Invite Letter Sent', completed: false },
//       { id: `t2-${Date.now()}`, label: 'Airport Pickup Arranged', completed: false },
//       { id: `t3-${Date.now()}`, label: 'Hospital Admission Confirmed', completed: false },
//     ],
//   };
//   bookings = [...bookings, booking];

//   // Deduct from wallet
//   const tx: WalletTransaction = {
//     id: `tx-${Date.now()}`,
//     amount: data.priceUSD,
//     type: 'debit',
//     description: `Booking ${booking.id}`,
//     date: new Date().toISOString(),
//   };
//   wallet = {
//     balanceUSD: wallet.balanceUSD - data.priceUSD,
//     transactions: [...wallet.transactions, tx],
//   };

//   return booking;
// }

// export async function fetchBookings(): Promise<Booking[]> {
//   await delay(200);
//   return [...bookings];
// }

// export async function updateTaskStatus(bookingId: string, taskId: string, completed: boolean): Promise<Booking> {
//   await delay(200);
//   bookings = bookings.map(b => {
//     if (b.id !== bookingId) return b;
//     const tasks = b.tasks.map(t => t.id === taskId ? { ...t, completed } : t);
//     const anyComplete = tasks.some(t => t.completed);
//     return { ...b, tasks, status: anyComplete ? 'In Progress' : b.status };
//   });
//   return bookings.find(b => b.id === bookingId)!;
// }

// export async function fetchWallet(): Promise<WalletState> {
//   await delay(100);
//   return { ...wallet };
// }

// export function convertPrice(usd: number, currency: 'USD' | 'INR' | 'NGN'): number {
//   const rates = { USD: 1, INR: 83, NGN: 1550 };
//   return Math.round(usd * rates[currency]);
// }

// export function formatPrice(amount: number, currency: 'USD' | 'INR' | 'NGN'): string {
//   const symbols = { USD: '$', INR: '₹', NGN: '₦' };
//   const neg = amount < 0 ? '-' : '';
//   return `${neg}${symbols[currency]}${Math.abs(amount).toLocaleString()}`;
// }

// // Vendor auth
// export async function vendorLogin(username: string, password: string): Promise<boolean> {
//   await delay(300);
//   return username === 'apollo' && password === 'apollo123';
// }

// // Lookup helpers (sync)
// export function getDoctorById(id: string): Doctor | undefined {
//   return doctors.find(d => d.id === id);
// }
// export function getHospitalById(id: string): Hospital | undefined {
//   return hospitals.find(h => h.id === id);
// }
// export function getRoomById(id: string): RoomType | undefined {
//   return roomTypes.find(r => r.id === id);
// }









import type { Hospital, Doctor, RoomType, PricingEntry, Booking, BookingTask, WalletState, WalletTransaction } from '@/types';
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, runTransaction, query, where, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase'; // Ensure you created this file in Phase 1

// ── Dummy Patient ID for Trial ──
const PATIENT_ID = 'patient_trial_123';

// ── Local Cache for Synchronous UI Lookups ──
let localHospitals: Hospital[] = [];
let localDoctors: Doctor[] = [];
let localRooms: RoomType[] = [];
let localPricing: PricingEntry[] = [];

// ── Async API Functions (Firebase) ──

/** Helper to ensure catalogs are loaded so synchronous lookups work */
async function ensureCatalogsLoaded() {
  if (localHospitals.length > 0) return; // Already loaded

  const [hSnap, dSnap, rSnap, pSnap] = await Promise.all([
    getDocs(collection(db, 'hospitals')),
    getDocs(collection(db, 'doctors')),
    getDocs(collection(db, 'rooms')),
    getDocs(collection(db, 'pricing'))
  ]);

  localHospitals = hSnap.docs.map(d => d.data() as Hospital);
  localDoctors = dSnap.docs.map(d => d.data() as Doctor);
  localRooms = rSnap.docs.map(d => d.data() as RoomType);
  localPricing = pSnap.docs.map(d => d.data() as PricingEntry);
}

export async function fetchHospitals(): Promise<Hospital[]> {
  await ensureCatalogsLoaded();
  return localHospitals;
}

export async function fetchDoctorsForHospital(hospitalId: string): Promise<Doctor[]> {
  await ensureCatalogsLoaded();
  return localDoctors.filter(d => d.hospitalId === hospitalId);
}

export async function fetchRoomTypesForHospital(hospitalId: string): Promise<RoomType[]> {
  await ensureCatalogsLoaded();
  const roomIds = [...new Set(localPricing.filter(p => p.hospitalId === hospitalId).map(p => p.roomId))];
  return localRooms.filter(r => roomIds.includes(r.id));
}

export async function fetchPricing(hospitalId: string): Promise<PricingEntry[]> {
  await ensureCatalogsLoaded();
  return localPricing.filter(p => p.hospitalId === hospitalId);
}

// ── Wallet & Bookings (Real-time Transactions) ──

// REMOVE the hardcoded PATIENT_ID from the top of the file!

export async function fetchWallet(patientId: string): Promise<WalletState> {
  const patientRef = doc(db, 'patients', patientId);
  const snap = await getDoc(patientRef);
  
  if (!snap.exists()) {
    await setDoc(patientRef, { walletBalanceUSD: 0 });
    return { balanceUSD: 0, transactions: [] };
  }

  const q = query(collection(db, 'wallet_transactions'), where('patientId', '==', patientId));
  const txSnap = await getDocs(q);
  const transactions = txSnap.docs.map(d => d.data() as WalletTransaction);

  return { 
    balanceUSD: snap.data().walletBalanceUSD, 
    transactions: transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) 
  };
}

export async function createBooking(
  data: { hospitalId: string; doctorId: string; roomId: string; priceUSD: number }, 
  patientId: string, 
  patientName: string
): Promise<Booking> {
  
  const bookingRef = doc(collection(db, 'bookings'));
  const patientRef = doc(db, 'patients', patientId);
  const txRef = doc(collection(db, 'wallet_transactions'));

  const newBookingData: Booking = {
    id: bookingRef.id,
    patientName: patientName,
    hospitalId: data.hospitalId,
    doctorId: data.doctorId,
    roomId: data.roomId,
    priceUSD: data.priceUSD,
    status: 'Confirmed',
    createdAt: new Date().toISOString(),
    tasks: [
      { id: `t1-${Date.now()}`, label: 'Visa Invite Letter Sent', completed: false },
      { id: `t2-${Date.now()}`, label: 'Airport Pickup Arranged', completed: false },
      { id: `t3-${Date.now()}`, label: 'Hospital Admission Confirmed', completed: false },
    ],
  };

  await runTransaction(db, async (transaction) => {
    const pDoc = await transaction.get(patientRef);
    const currentBalance = pDoc.exists() ? pDoc.data().walletBalanceUSD : 0;
    
    const newBalance = currentBalance - data.priceUSD;
    transaction.set(patientRef, { walletBalanceUSD: newBalance }, { merge: true });
    transaction.set(bookingRef, newBookingData);

    const txLog: WalletTransaction & { patientId: string } = {
      id: txRef.id,
      patientId: patientId,
      amount: data.priceUSD,
      type: 'debit',
      description: `Booking ${bookingRef.id}`,
      date: new Date().toISOString(),
    };
    transaction.set(txRef, txLog);
  });

  return newBookingData;
}

export async function fetchBookings(): Promise<Booking[]> {
  await ensureCatalogsLoaded(); // Ensure UI can look up names
  const snap = await getDocs(collection(db, 'bookings'));
  return snap.docs
    .map(d => d.data() as Booking)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function updateTaskStatus(bookingId: string, taskId: string, completed: boolean): Promise<Booking> {
  const bRef = doc(db, 'bookings', bookingId);
  
  let updatedBooking: Booking | null = null;

  await runTransaction(db, async (transaction) => {
    const bDoc = await transaction.get(bRef);
    if (!bDoc.exists()) throw new Error("Booking not found");

    const bData = bDoc.data() as Booking;
    const tasks = bData.tasks.map(t => t.id === taskId ? { ...t, completed } : t);
    const anyComplete = tasks.some(t => t.completed);
    const newStatus = anyComplete && bData.status === 'Confirmed' ? 'In Progress' : bData.status;

    updatedBooking = { ...bData, tasks, status: newStatus };
    transaction.update(bRef, { tasks, status: newStatus });
  });

  return updatedBooking!;
}

// ── Sync UI Lookups & Utilities ──

export function getLowestPrice(hospitalId: string): number {
  const entries = localPricing.filter(p => p.hospitalId === hospitalId);
  return entries.length ? Math.min(...entries.map(e => e.priceUSD)) : 0;
}

export function getPrice(hospitalId: string, doctorId: string, roomId: string): number | null {
  const entry = localPricing.find(p => p.hospitalId === hospitalId && p.doctorId === doctorId && p.roomId === roomId);
  return entry?.priceUSD ?? null;
}

export function getLowestPriceDoctor(hospitalId: string): { doctorId: string; roomId: string; price: number } {
  const entries = localPricing.filter(p => p.hospitalId === hospitalId);
  if (!entries.length) return { doctorId: '', roomId: '', price: 0 };
  const lowest = entries.reduce((min, e) => e.priceUSD < min.priceUSD ? e : min, entries[0]);
  return { doctorId: lowest.doctorId, roomId: lowest.roomId, price: lowest.priceUSD };
}

export function getDoctorById(id: string): Doctor | undefined {
  return localDoctors.find(d => d.id === id);
}

export function getHospitalById(id: string): Hospital | undefined {
  return localHospitals.find(h => h.id === id);
}

export function getRoomById(id: string): RoomType | undefined {
  return localRooms.find(r => r.id === id);
}

export function convertPrice(usd: number, currency: 'USD' | 'INR' | 'NGN'): number {
  const rates = { USD: 1, INR: 83, NGN: 1550 };
  return Math.round(usd * rates[currency]);
}

export function formatPrice(amount: number, currency: 'USD' | 'INR' | 'NGN'): string {
  const symbols = { USD: '$', INR: '₹', NGN: '₦' };
  const neg = amount < 0 ? '-' : '';
  return `${neg}${symbols[currency]}${Math.abs(amount).toLocaleString()}`;
}

// ── Vendor Auth (Hardcoded for trial) ──
export async function vendorLogin(username: string, password: string): Promise<boolean> {
  // Simulating network delay
  await new Promise(r => setTimeout(r, 500));
  return username === 'apollo' && password === 'apollo123';
}

// ─────────────────────────────────────────────────────────
// 🚀 DATABASE SEED UTILITY (Run this ONCE to populate Firebase)
// ─────────────────────────────────────────────────────────
export async function seedDatabase() {
  const hData = [
    { id: 'h1', name: 'Apollo Spectra', location: 'Delhi', procedure: 'Total Knee Replacement', imageUrl: '', accredited: true },
    { id: 'h2', name: 'Max Saket', location: 'Delhi', procedure: 'Total Knee Replacement', imageUrl: '', accredited: true },
    { id: 'h3', name: 'Fortis Gurgaon', location: 'Gurgaon', procedure: 'Total Knee Replacement', imageUrl: '', accredited: true },
  ];
  
  const dData = [
    { id: 'd1', name: 'Dr. Ramesh Kumar', experience: 16, hospitalId: 'h1' },
    { id: 'd2', name: 'Dr. Priya Sharma', experience: 12, hospitalId: 'h1' },
    { id: 'd3', name: 'Dr. Vikram Singh', experience: 18, hospitalId: 'h2' },
    { id: 'd4', name: 'Dr. Anita Desai', experience: 15, hospitalId: 'h2' },
    { id: 'd5', name: 'Dr. Mohit Verma', experience: 10, hospitalId: 'h2' },
    { id: 'd6', name: 'Dr. Sunil Mehta', experience: 20, hospitalId: 'h3' },
  ];
  
  const rData = [
    { id: 'r1', name: 'General Ward' }, { id: 'r2', name: 'Semi-Private' },
    { id: 'r3', name: 'Private' }, { id: 'r4', name: 'Suite' },
  ];
  
  const pData = [
    { id: 'p1', hospitalId: 'h1', doctorId: 'd1', roomId: 'r1', priceUSD: 3200 },
    { id: 'p2', hospitalId: 'h1', doctorId: 'd2', roomId: 'r1', priceUSD: 3000 },
    { id: 'p3', hospitalId: 'h1', doctorId: 'd1', roomId: 'r2', priceUSD: 3800 },
    { id: 'p4', hospitalId: 'h1', doctorId: 'd2', roomId: 'r2', priceUSD: 3600 },
    { id: 'p5', hospitalId: 'h1', doctorId: 'd1', roomId: 'r3', priceUSD: 4500 },
    { id: 'p6', hospitalId: 'h1', doctorId: 'd2', roomId: 'r3', priceUSD: 4200 },
    { id: 'p7', hospitalId: 'h2', doctorId: 'd3', roomId: 'r1', priceUSD: 3500 },
    { id: 'p8', hospitalId: 'h2', doctorId: 'd4', roomId: 'r1', priceUSD: 3400 },
    { id: 'p9', hospitalId: 'h2', doctorId: 'd5', roomId: 'r1', priceUSD: 3100 },
    { id: 'p10', hospitalId: 'h2', doctorId: 'd3', roomId: 'r2', priceUSD: 4200 },
    { id: 'p11', hospitalId: 'h2', doctorId: 'd4', roomId: 'r2', priceUSD: 4000 },
    { id: 'p12', hospitalId: 'h2', doctorId: 'd5', roomId: 'r2', priceUSD: 3700 },
    { id: 'p13', hospitalId: 'h2', doctorId: 'd3', roomId: 'r3', priceUSD: 5000 },
    { id: 'p14', hospitalId: 'h2', doctorId: 'd4', roomId: 'r3', priceUSD: 4800 },
    { id: 'p15', hospitalId: 'h2', doctorId: 'd5', roomId: 'r3', priceUSD: 4400 },
    { id: 'p16', hospitalId: 'h2', doctorId: 'd3', roomId: 'r4', priceUSD: 6500 },
    { id: 'p17', hospitalId: 'h2', doctorId: 'd4', roomId: 'r4', priceUSD: 6200 },
    { id: 'p18', hospitalId: 'h2', doctorId: 'd5', roomId: 'r4', priceUSD: 5800 },
    { id: 'p19', hospitalId: 'h3', doctorId: 'd6', roomId: 'r2', priceUSD: 3900 },
    { id: 'p20', hospitalId: 'h3', doctorId: 'd6', roomId: 'r3', priceUSD: 4600 },
  ];

  for (const item of hData) await setDoc(doc(db, 'hospitals', item.id), item);
  for (const item of dData) await setDoc(doc(db, 'doctors', item.id), item);
  for (const item of rData) await setDoc(doc(db, 'rooms', item.id), item);
  for (const item of pData) await setDoc(doc(db, 'pricing', item.id), item);
  
  console.log("Database seeded successfully!");
}