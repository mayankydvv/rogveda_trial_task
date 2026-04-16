// import { useState, useEffect } from 'react';
// import { CurrencyToggle } from '@/components/CurrencyToggle';
// import { TrustBar } from '@/components/TrustBar';
// import { HospitalCard } from '@/components/HospitalCard';
// import { BookingSheet } from '@/components/BookingSheet';
// import { useApp } from '@/context/AppContext';
// import { fetchHospitals, convertPrice, formatPrice,seedDatabase } from '@/services/api';
// import type { Hospital } from '@/types';
// import { Search, Wallet,Building } from 'lucide-react';
// import { Link } from 'react-router-dom';

// export default function PatientSearch() {
//   const { currency, wallet } = useApp();
//   const [hospitals, setHospitals] = useState<Hospital[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [bookingData, setBookingData] = useState<{
//     hospitalId: string; doctorId: string; roomId: string; priceUSD: number;
//   } | null>(null);



//   useEffect(() => {
//     fetchHospitals().then(h => {
//       setHospitals(h);
//       setLoading(false);
//     });
//   }, []);

//   const handleBook = (hospitalId: string, doctorId: string, roomId: string, priceUSD: number) => {
//     setBookingData({ hospitalId, doctorId, roomId, priceUSD });
//   };

//   return (
//     <div className="min-h-screen bg-background pb-24">
//       {/* Header */}
//       <header className="sticky top-0 z-20 glass-strong px-4 py-3 space-y-3">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-xl font-heading font-bold text-foreground">Rogveda</h1>
//             <p className="text-xs text-muted-foreground">Medical Travel, Simplified</p>
//           </div>
          
//           {/* Upgraded Vendor Portal Button */}
//           <Link 
//             to="/vendor" 
//             className="touch-target flex items-center gap-1.5 rounded-full bg-secondary/80 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:bg-secondary hover:text-foreground shadow-sm"
//           >
//             <Building className="h-3.5 w-3.5" />
//             Vendor Portal
//           </Link>

//         </div>
//         <div className="flex items-center justify-between gap-3">
//           <CurrencyToggle />
//         </div>
//       </header>

//       <div className="container max-w-2xl mx-auto px-4 py-5 space-y-5">
//         {/* Search context */}
//         <div className="flex items-center gap-2 text-sm text-muted-foreground">
//           <Search className="h-4 w-4" />
//           <span>Showing results for <strong className="text-foreground">Total Knee Replacement in Delhi</strong></span>
//         </div>

//         <TrustBar />

//         {/* Hospital Cards */}
//         {loading ? (
//           <div className="space-y-4">
//             {[1, 2, 3].map(i => (
//               <div key={i} className="h-96 rounded-2xl bg-muted animate-pulse" />
//             ))}
//           </div>
//         ) : (
//           <div className="space-y-5">
//             {hospitals.map(h => (
//               <HospitalCard key={h.id} hospital={h} onBook={handleBook} />
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Floating wallet bar */}
//       <div className="fixed bottom-0 inset-x-0 z-20 glass-strong border-t border-border px-4 py-3">
//         <div className="container max-w-2xl mx-auto flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <Wallet className="h-5 w-5 text-primary" />
//             <div>
//               <p className="text-xs text-muted-foreground">Wallet Balance</p>
//               <p className={`text-sm font-heading font-bold ${wallet.balanceUSD < 0 ? 'text-destructive' : 'text-foreground'}`}>
//                 {formatPrice(convertPrice(wallet.balanceUSD, currency), currency)}
//               </p>
//             </div>
//           </div>
//           <span className="text-xs text-muted-foreground">BNPL Enabled</span>
//         </div>
//       </div>

//       {/* Booking Sheet */}
//       {bookingData && (
//         <BookingSheet
//           open={!!bookingData}
//           onClose={() => setBookingData(null)}
//           {...bookingData}
//         />
//       )}
//     </div>
//   );
// }





















import { useState, useEffect } from 'react';
import { CurrencyToggle } from '@/components/CurrencyToggle';
import { TrustBar } from '@/components/TrustBar';
import { HospitalCard } from '@/components/HospitalCard';
import { BookingSheet } from '@/components/BookingSheet';
import { useApp } from '@/context/AppContext';
import { fetchHospitals, convertPrice, formatPrice } from '@/services/api';
import type { Hospital } from '@/types';
import { Wallet, Building, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PatientSearch() {
  const { currency, wallet } = useApp();
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookingData, setBookingData] = useState<{
    hospitalId: string; doctorId: string; roomId: string; priceUSD: number;
  } | null>(null);

  useEffect(() => {
    fetchHospitals()
      .then(h => {
        setHospitals(h);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch hospitals:", err);
        setError("We are having trouble connecting to our servers. Please check your connection and try again.");
        setLoading(false);
      });
  }, []);

  const handleBook = (hospitalId: string, doctorId: string, roomId: string, priceUSD: number) => {
    setBookingData({ hospitalId, doctorId, roomId, priceUSD });
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-20 glass-strong px-4 py-3 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-heading font-bold text-foreground">Rogveda</h1>
            <p className="text-xs text-muted-foreground">Medical Travel, Simplified</p>
          </div>
          
          {/* Upgraded Vendor Portal Button */}
          <Link 
            to="/vendor" 
            className="touch-target flex items-center gap-1.5 rounded-full bg-secondary/80 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:bg-secondary hover:text-foreground shadow-sm"
          >
            <Building className="h-3.5 w-3.5" />
            Vendor Portal
          </Link>

        </div>
        <div className="flex items-center justify-between gap-3">
          <CurrencyToggle />
        </div>
      </header>

      <TrustBar />

      <div className="container max-w-2xl mx-auto px-4 mt-6">
        {/* Error State */}
        {error ? (
          <div className="rounded-2xl bg-destructive/10 p-6 text-center text-destructive border border-destructive/20">
            <AlertTriangle className="h-8 w-8 mx-auto mb-3 opacity-80" />
            <h3 className="font-heading font-semibold text-lg mb-1">Connection Error</h3>
            <p className="text-sm">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 touch-target rounded-xl bg-destructive px-6 py-2 text-sm font-semibold text-destructive-foreground hover:opacity-90"
            >
              Retry
            </button>
          </div>
        ) : loading ? (
          /* Loading State */
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-96 rounded-2xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : hospitals.length === 0 ? (
          /* Empty State */
          <div className="text-center py-12">
            <p className="text-muted-foreground">No hospitals available at the moment.</p>
          </div>
        ) : (
          /* Success State */
          <div className="space-y-5">
            {hospitals.map(h => (
              <HospitalCard key={h.id} hospital={h} onBook={handleBook} />
            ))}
          </div>
        )}
      </div>

      {/* Floating wallet bar */}
      <div className="fixed bottom-0 inset-x-0 z-20 glass-strong border-t border-border px-4 py-3">
        <div className="container max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Wallet Balance</p>
              <p className={`text-sm font-heading font-bold ${wallet.balanceUSD < 0 ? 'text-destructive' : 'text-foreground'}`}>
                {formatPrice(convertPrice(wallet.balanceUSD, currency), currency)}
              </p>
            </div>
          </div>
          <span className="text-xs text-muted-foreground">BNPL Enabled</span>
        </div>
      </div>

      {/* Booking Sheet */}
      {bookingData && (
        <BookingSheet
          open={!!bookingData}
          onClose={() => setBookingData(null)}
          hospitalId={bookingData.hospitalId}
          doctorId={bookingData.doctorId}
          roomId={bookingData.roomId}
          priceUSD={bookingData.priceUSD}
        />
      )}
    </div>
  );
}