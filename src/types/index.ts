export type Currency = 'USD' | 'INR' | 'NGN';

export interface Doctor {
  id: string;
  name: string;
  experience: number;
  hospitalId: string;
}

export interface RoomType {
  id: string;
  name: string;
}

export interface PricingEntry {
  hospitalId: string;
  doctorId: string;
  roomId: string;
  priceUSD: number;
}

export interface Hospital {
  id: string;
  name: string;
  location: string;
  procedure: string;
  imageUrl: string;
  accredited: boolean;
}

export type BookingStatus = 'Confirmed' | 'In Progress' | 'Completed';

export interface Booking {
  id: string;
  patientName: string;
  hospitalId: string;
  doctorId: string;
  roomId: string;
  priceUSD: number;
  status: BookingStatus;
  createdAt: string;
  tasks: BookingTask[];
}

export interface BookingTask {
  id: string;
  label: string;
  completed: boolean;
}

export interface WalletState {
  balanceUSD: number;
  transactions: WalletTransaction[];
}

export interface WalletTransaction {
  id: string;
  amount: number;
  type: 'debit' | 'credit';
  description: string;
  date: string;
}
