// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useApp } from '@/context/AppContext';
// import { getHospitalById, getDoctorById, getRoomById, convertPrice, formatPrice } from '@/services/api';
// import { X, CheckCircle2, Wallet, AlertTriangle } from 'lucide-react';

// interface Props {
//   open: boolean;
//   onClose: () => void;
//   hospitalId: string;
//   doctorId: string;
//   roomId: string;
//   priceUSD: number;
// }

// export function BookingSheet({ open, onClose, hospitalId, doctorId, roomId, priceUSD }: Props) {
//   const { currency, wallet, createBooking, refreshWallet } = useApp();
//   const [step, setStep] = useState<'confirm' | 'loading' | 'success'>('confirm');
//   const [bookingId, setBookingId] = useState('');

//   const hospital = getHospitalById(hospitalId);
//   const doctor = getDoctorById(doctorId);
//   const room = getRoomById(roomId);
//   const displayPrice = convertPrice(priceUSD, currency);
//   const walletDisplay = convertPrice(wallet.balanceUSD, currency);
//   const newBalance = wallet.balanceUSD - priceUSD;
//   const newBalanceDisplay = convertPrice(newBalance, currency);

//   const handleConfirm = async () => {
//     setStep('loading');
//     const booking = await createBooking({ hospitalId, doctorId, roomId, priceUSD });
//     setBookingId(booking.id);
//     await refreshWallet();
//     setStep('success');
//   };

//   const handleClose = () => {
//     setStep('confirm');
//     onClose();
//   };

//   return (
//     <AnimatePresence>
//       {open && (
//         <>
//           {/* Backdrop */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={handleClose}
//             className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm"
//           />
//           {/* Sheet */}
//           <motion.div
//             initial={{ y: '100%' }}
//             animate={{ y: 0 }}
//             exit={{ y: '100%' }}
//             transition={{ type: 'spring', damping: 30, stiffness: 300 }}
//             className="fixed inset-x-0 bottom-0 z-50 max-h-[90vh] overflow-auto rounded-t-3xl bg-card shadow-soft"
//           >
//             <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-border" />
//             <div className="p-6 space-y-5">
//               {step === 'confirm' && (
//                 <>
//                   <div className="flex items-center justify-between">
//                     <h2 className="text-xl font-heading font-bold">Confirm Booking</h2>
//                     <button onClick={handleClose} className="touch-target rounded-full p-2 hover:bg-muted">
//                       <X className="h-5 w-5" />
//                     </button>
//                   </div>

//                   <div className="space-y-3 rounded-2xl bg-secondary/50 p-4">
//                     <Row label="Hospital" value={hospital?.name ?? ''} />
//                     <Row label="Doctor" value={doctor?.name ?? ''} />
//                     <Row label="Room" value={room?.name ?? ''} />
//                     <div className="border-t border-border pt-3">
//                       <Row label="Total" value={formatPrice(displayPrice, currency)} bold />
//                     </div>
//                   </div>

//                   {/* Wallet */}
//                   <div className="rounded-2xl border border-border p-4 space-y-2">
//                     <div className="flex items-center gap-2">
//                       <Wallet className="h-5 w-5 text-primary" />
//                       <span className="text-sm font-medium">Wallet Balance</span>
//                     </div>
//                     <p className="text-lg font-heading font-bold">{formatPrice(walletDisplay, currency)}</p>
//                     {newBalance < 0 && (
//                       <div className="flex items-start gap-2 rounded-xl bg-amber-50 p-3 text-xs text-amber-800">
//                         <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
//                         <span>Your balance will go to <strong>{formatPrice(newBalanceDisplay, currency)}</strong>. Buy Now, Pay Later is enabled — you can pay after booking.</span>
//                       </div>
//                     )}
//                   </div>

//                   <button
//                     onClick={handleConfirm}
//                     className="touch-target w-full rounded-xl bg-primary py-4 text-base font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90 active:scale-[0.98]"
//                   >
//                     Confirm & Book
//                   </button>
//                 </>
//               )}

//               {step === 'loading' && (
//                 <div className="flex flex-col items-center justify-center py-16 gap-4">
//                   <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
//                   <p className="text-sm text-muted-foreground">Processing your booking...</p>
//                 </div>
//               )}

//               {step === 'success' && (
//                 <div className="flex flex-col items-center text-center py-8 gap-4">
//                   <div className="rounded-full bg-accent/10 p-4">
//                     <CheckCircle2 className="h-12 w-12 text-accent" />
//                   </div>
//                   <h2 className="text-xl font-heading font-bold">Booking Confirmed!</h2>
//                   <p className="text-sm text-muted-foreground">Your booking ID is</p>
//                   <p className="rounded-xl bg-secondary px-6 py-3 font-mono text-lg font-bold">{bookingId}</p>
//                   <div className="rounded-xl bg-secondary/50 px-4 py-2 text-sm">
//                     <span className="text-muted-foreground">New Wallet Balance: </span>
//                     <span className={`font-bold ${newBalance < 0 ? 'text-destructive' : 'text-foreground'}`}>
//                       {formatPrice(convertPrice(newBalance, currency), currency)}
//                     </span>
//                   </div>
//                   <button
//                     onClick={handleClose}
//                     className="touch-target mt-2 rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground"
//                   >
//                     Done
//                   </button>
//                 </div>
//               )}
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// }

// function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
//   return (
//     <div className="flex justify-between text-sm">
//       <span className="text-muted-foreground">{label}</span>
//       <span className={bold ? 'text-lg font-heading font-bold text-foreground' : 'font-medium text-foreground'}>{value}</span>
//     </div>
//   );
// }










import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { getHospitalById, getDoctorById, getRoomById, convertPrice, formatPrice } from '@/services/api';
import { X, CheckCircle2, Wallet, AlertTriangle, User, LogOut } from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
  hospitalId: string;
  doctorId: string;
  roomId: string;
  priceUSD: number;
}

export function BookingSheet({ open, onClose, hospitalId, doctorId, roomId, priceUSD }: Props) {
  const { currency, wallet, createBooking, refreshWallet, patient, patientLogin, patientLogout } = useApp();
  
  const [step, setStep] = useState<'auth' | 'confirm' | 'loading' | 'success'>('auth');
  const [bookingId, setBookingId] = useState('');
  const [authError, setAuthError] = useState('');
  
  // Lock the balance so it doesn't recalculate after the wallet refreshes
  const [finalBalanceDisplay, setFinalBalanceDisplay] = useState<number>(0);
  
  useEffect(() => {
    if (open) setStep(patient ? 'confirm' : 'auth');
  }, [open, patient]);

  const hospital = getHospitalById(hospitalId);
  const doctor = getDoctorById(doctorId);
  const room = getRoomById(roomId);
  
  const displayPrice = convertPrice(priceUSD, currency);
  const walletDisplay = convertPrice(wallet.balanceUSD, currency);
  
  // Predictive balance for the Confirm screen
  const projectedBalance = wallet.balanceUSD - priceUSD;
  const projectedBalanceDisplay = convertPrice(projectedBalance, currency);

  const handleConfirm = async () => {
    setStep('loading');
    
    // Capture the final balance right before booking to fix the double-deduction UI bug
    const expectedFinalUSD = wallet.balanceUSD - priceUSD;
    setFinalBalanceDisplay(expectedFinalUSD);

    try {
      const booking = await createBooking({ hospitalId, doctorId, roomId, priceUSD });
      setBookingId(booking.id);
      await refreshWallet();
      setStep('success');
    } catch (error) {
      console.error("Booking failed", error);
      setStep('confirm'); // Revert on failure
    }
  };

  const handleClose = () => {
    setStep(patient ? 'confirm' : 'auth');
    setAuthError('');
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-50 max-h-[90vh] overflow-auto rounded-t-3xl bg-card shadow-soft"
          >
            <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-border" />
            <div className="p-6 space-y-5">
              
              {/* AUTH STEP */}
              {step === 'auth' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-heading font-bold">Sign in to Book</h2>
                    <button type="button" onClick={handleClose} className="touch-target rounded-full p-2 hover:bg-muted">
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="text-center space-y-2">
                    <p className="text-sm text-muted-foreground">
                      To ensure your medical records and bookings remain secure, please authenticate below.
                    </p>
                  </div>
                  
                  {authError && (
                    <div className="rounded-xl bg-destructive/10 p-3 text-sm text-destructive font-medium text-center">
                      {authError}
                    </div>
                  )}

                  <button 
                    onClick={async () => {
                      setAuthError('');
                      try {
                        await patientLogin();
                        setStep('confirm');
                      } catch (err: any) {
                        setAuthError('Sign-in cancelled or failed. Please try again.');
                      }
                    }}
                    className="touch-target flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-card py-4 text-base font-semibold text-foreground shadow-sm transition-all hover:bg-secondary active:scale-[0.98]"
                  >
                    {/* SVG Google Logo */}
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Continue with Google
                  </button>
                </div>
              )}

              {/* CONFIRM STEP */}
              {step === 'confirm' && (
                <>
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-heading font-bold">Confirm Booking</h2>
                    <button onClick={handleClose} className="touch-target rounded-full p-2 hover:bg-muted">
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between bg-secondary/30 p-3 rounded-xl border border-border/50">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="h-4 w-4" /> 
                      <span>Booking as: <strong className="text-foreground">{patient?.name}</strong></span>
                    </div>
                    <button onClick={patientLogout} className="text-xs flex items-center gap-1 text-destructive hover:opacity-80">
                      <LogOut className="h-3 w-3" /> Logout
                    </button>
                  </div>

                  <div className="space-y-3 rounded-2xl bg-secondary/50 p-4">
                    <Row label="Hospital" value={hospital?.name ?? ''} />
                    <Row label="Doctor" value={doctor?.name ?? ''} />
                    <Row label="Room" value={room?.name ?? ''} />
                    <div className="border-t border-border pt-3">
                      <Row label="Total" value={formatPrice(displayPrice, currency)} bold />
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <Wallet className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">Wallet Balance</span>
                    </div>
                    <p className="text-lg font-heading font-bold">{formatPrice(walletDisplay, currency)}</p>
                    {projectedBalance < 0 && (
                      <div className="flex items-start gap-2 rounded-xl bg-amber-50 p-3 text-xs text-amber-800">
                        <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                        <span>Your balance will go to <strong>{formatPrice(projectedBalanceDisplay, currency)}</strong>. Buy Now, Pay Later is enabled.</span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleConfirm}
                    className="touch-target w-full rounded-xl bg-primary py-4 text-base font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90 active:scale-[0.98]"
                  >
                    Confirm & Book
                  </button>
                </>
              )}

              {/* LOADING STEP */}
              {step === 'loading' && (
                <div className="flex flex-col items-center justify-center py-16 gap-4">
                  <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                  <p className="text-sm text-muted-foreground">Processing your booking...</p>
                </div>
              )}

              {/* SUCCESS STEP */}
              {step === 'success' && (
                <div className="flex flex-col items-center text-center py-8 gap-4">
                  <div className="rounded-full bg-accent/10 p-4">
                    <CheckCircle2 className="h-12 w-12 text-accent" />
                  </div>
                  <h2 className="text-xl font-heading font-bold">Booking Confirmed!</h2>
                  <p className="text-sm text-muted-foreground">Your booking ID is</p>
                  <p className="rounded-xl bg-secondary px-6 py-3 font-mono text-lg font-bold">{bookingId}</p>
                  <div className="rounded-xl bg-secondary/50 px-4 py-2 text-sm">
                    <span className="text-muted-foreground">New Wallet Balance: </span>
                    <span className={`font-bold ${finalBalanceDisplay < 0 ? 'text-destructive' : 'text-foreground'}`}>
                      {/* Using the locked finalBalanceDisplay */}
                      {formatPrice(convertPrice(finalBalanceDisplay, currency), currency)}
                    </span>
                  </div>
                  <button
                    onClick={handleClose}
                    className="touch-target mt-2 rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className={bold ? 'text-lg font-heading font-bold text-foreground' : 'font-medium text-foreground'}>{value}</span>
    </div>
  );
}