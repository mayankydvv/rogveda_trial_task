// import { useEffect, useState } from 'react';
// import { useApp } from '@/context/AppContext';
// import { getHospitalById, getDoctorById, getRoomById, convertPrice, formatPrice } from '@/services/api';
// import type { Booking } from '@/types';
// import { LogOut, ChevronRight, CheckCircle2, Circle, ArrowLeft, ClipboardList } from 'lucide-react';

// export function VendorDashboard() {
//   const { vendorLogout, bookings, refreshBookings, updateTask, currency } = useApp();
//   const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     refreshBookings().then(() => setLoading(false));
//   }, [refreshBookings]);

//   // Keep selectedBooking in sync
//   useEffect(() => {
//     if (selectedBooking) {
//       const updated = bookings.find(b => b.id === selectedBooking.id);
//       if (updated) setSelectedBooking(updated);
//     }
//   }, [bookings, selectedBooking]);

//   const handleTaskToggle = async (bookingId: string, taskId: string, completed: boolean) => {
//     await updateTask(bookingId, taskId, completed);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-background p-4 space-y-4">
//         {[1, 2, 3].map(i => (
//           <div key={i} className="h-24 rounded-2xl bg-muted animate-pulse" />
//         ))}
//       </div>
//     );
//   }

//   if (selectedBooking) {
//     const hospital = getHospitalById(selectedBooking.hospitalId);
//     const doctor = getDoctorById(selectedBooking.doctorId);
//     const room = getRoomById(selectedBooking.roomId);

//     return (
//       <div className="min-h-screen bg-background">
//         <header className="sticky top-0 z-10 glass-strong px-4 py-3 flex items-center gap-3">
//           <button onClick={() => setSelectedBooking(null)} className="touch-target rounded-full p-2 hover:bg-muted">
//             <ArrowLeft className="h-5 w-5" />
//           </button>
//           <h1 className="font-heading font-semibold">Booking {selectedBooking.id}</h1>
//         </header>
//         <div className="p-4 space-y-5">
//           <div className="rounded-2xl bg-card shadow-card p-5 space-y-3">
//             <div className="flex items-center justify-between">
//               <span className="text-sm text-muted-foreground">Status</span>
//               <StatusBadge status={selectedBooking.status} />
//             </div>
//             <InfoRow label="Patient" value={selectedBooking.patientName} />
//             <InfoRow label="Hospital" value={hospital?.name ?? ''} />
//             <InfoRow label="Doctor" value={doctor?.name ?? ''} />
//             <InfoRow label="Room" value={room?.name ?? ''} />
//             <InfoRow label="Price" value={formatPrice(convertPrice(selectedBooking.priceUSD, currency), currency)} />
//           </div>

//           <div className="rounded-2xl bg-card shadow-card p-5 space-y-4">
//             <h3 className="font-heading font-semibold flex items-center gap-2">
//               <ClipboardList className="h-5 w-5 text-primary" />
//               Tasks
//             </h3>
//             {selectedBooking.tasks.map(task => (
//               <button
//                 key={task.id}
//                 onClick={() => !task.completed && handleTaskToggle(selectedBooking.id, task.id, true)}
//                 className="touch-target flex w-full items-center gap-3 rounded-xl p-3 transition-colors hover:bg-secondary/50"
//               >
//                 {task.completed ? (
//                   <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
//                 ) : (
//                   <Circle className="h-5 w-5 text-muted-foreground shrink-0" />
//                 )}
//                 <span className={`text-sm text-left ${task.completed ? 'text-muted-foreground line-through' : 'text-foreground font-medium'}`}>
//                   {task.label}
//                 </span>
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <header className="sticky top-0 z-10 glass-strong px-4 py-3 flex items-center justify-between">
//         <h1 className="text-lg font-heading font-bold">Vendor Dashboard</h1>
//         <button onClick={vendorLogout} className="touch-target flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-muted">
//           <LogOut className="h-4 w-4" />
//           Logout
//         </button>
//       </header>

//       <div className="p-4 space-y-3">
//         {bookings.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-20 text-center">
//             <ClipboardList className="h-16 w-16 text-muted-foreground/30 mb-4" />
//             <h2 className="font-heading font-semibold text-lg">No Bookings Yet</h2>
//             <p className="text-sm text-muted-foreground mt-1">Patient bookings will appear here</p>
//           </div>
//         ) : (
//           bookings.map(booking => {
//             const hospital = getHospitalById(booking.hospitalId);
//             const doctor = getDoctorById(booking.doctorId);
//             return (
//               <button
//                 key={booking.id}
//                 onClick={() => setSelectedBooking(booking)}
//                 className="touch-target w-full rounded-2xl bg-card shadow-card p-4 text-left transition-all hover:shadow-soft"
//               >
//                 <div className="flex items-center justify-between mb-2">
//                   <span className="font-mono text-xs text-muted-foreground">{booking.id}</span>
//                   <StatusBadge status={booking.status} />
//                 </div>
//                 <p className="font-medium text-foreground">{booking.patientName}</p>
//                 <p className="text-sm text-muted-foreground mt-0.5">{hospital?.name} · {doctor?.name}</p>
//                 <div className="flex items-center justify-between mt-2">
//                   <span className="text-sm font-heading font-bold">
//                     {formatPrice(convertPrice(booking.priceUSD, currency), currency)}
//                   </span>
//                   <ChevronRight className="h-4 w-4 text-muted-foreground" />
//                 </div>
//               </button>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// }

// function StatusBadge({ status }: { status: string }) {
//   const styles: Record<string, string> = {
//     Confirmed: 'bg-blue-50 text-blue-700',
//     'In Progress': 'bg-amber-50 text-amber-700',
//     Completed: 'bg-accent/10 text-accent',
//   };
//   return (
//     <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[status] ?? 'bg-muted text-muted-foreground'}`}>
//       {status}
//     </span>
//   );
// }

// function InfoRow({ label, value }: { label: string; value: string }) {
//   return (
//     <div className="flex justify-between text-sm">
//       <span className="text-muted-foreground">{label}</span>
//       <span className="font-medium text-foreground">{value}</span>
//     </div>
//   );
// }











// import { useEffect, useState } from 'react';
// import { useApp } from '@/context/AppContext';
// import { getHospitalById, getDoctorById, getRoomById, convertPrice, formatPrice } from '@/services/api';
// import type { Booking } from '@/types';
// import { LogOut, ChevronRight, CheckCircle2, Circle, ArrowLeft, ClipboardList } from 'lucide-react';

// export function VendorDashboard() {
//   const { vendorLogout, bookings, refreshBookings, updateTask, currency } = useApp();
//   const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     refreshBookings().then(() => setLoading(false));
//   }, [refreshBookings]);

//   // Keep selectedBooking in sync
//   useEffect(() => {
//     if (selectedBooking) {
//       const updated = bookings.find(b => b.id === selectedBooking.id);
//       if (updated) setSelectedBooking(updated);
//     }
//   }, [bookings, selectedBooking]);

//   const handleTaskToggle = async (bookingId: string, taskId: string, completed: boolean) => {
//     await updateTask(bookingId, taskId, completed);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-background p-4 space-y-4">
//         {[1, 2, 3].map(i => (
//           <div key={i} className="h-24 rounded-2xl bg-muted animate-pulse" />
//         ))}
//       </div>
//     );
//   }

//   // ── DETAILED BOOKING VIEW ──
//   if (selectedBooking) {
//     const hospital = getHospitalById(selectedBooking.hospitalId);
//     const doctor = getDoctorById(selectedBooking.doctorId);
//     const room = getRoomById(selectedBooking.roomId);

//     return (
//       <div className="min-h-screen bg-background">
//         <header className="sticky top-0 z-10 glass-strong px-4 py-3 flex items-center gap-3">
//           <button onClick={() => setSelectedBooking(null)} className="touch-target rounded-full p-2 hover:bg-muted">
//             <ArrowLeft className="h-5 w-5" />
//           </button>
//           <h1 className="font-heading font-semibold">Booking {selectedBooking.id}</h1>
//         </header>
        
//         <div className="p-4 space-y-5">
//           <div className="rounded-2xl bg-card shadow-card p-5 space-y-3">
//             <div className="flex items-center justify-between">
//               <span className="text-sm text-muted-foreground">Status</span>
//               <StatusBadge status={selectedBooking.status} />
//             </div>
            
//             {/* Added Procedure here as requested by the brief */}
//             <InfoRow label="Patient" value={selectedBooking.patientName} />
//             <InfoRow label="Procedure" value={hospital?.procedure ?? 'Medical Procedure'} />
//             <InfoRow label="Hospital" value={hospital?.name ?? ''} />
//             <InfoRow label="Doctor" value={doctor?.name ?? ''} />
//             <InfoRow label="Room" value={room?.name ?? ''} />
//             <InfoRow label="Price" value={formatPrice(convertPrice(selectedBooking.priceUSD, currency), currency)} />
//           </div>

//           <div className="rounded-2xl bg-card shadow-card p-5 space-y-4">
//             <h3 className="font-heading font-semibold flex items-center gap-2">
//               <ClipboardList className="h-5 w-5 text-primary" />
//               Tasks
//             </h3>
//             {selectedBooking.tasks.map(task => (
//               <button
//                 key={task.id}
//                 onClick={() => !task.completed && handleTaskToggle(selectedBooking.id, task.id, true)}
//                 className="touch-target flex w-full items-center gap-3 rounded-xl p-3 transition-colors hover:bg-secondary/50"
//               >
//                 {task.completed ? (
//                   <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
//                 ) : (
//                   <Circle className="h-5 w-5 text-muted-foreground shrink-0" />
//                 )}
//                 <span className={`text-sm text-left ${task.completed ? 'text-muted-foreground line-through' : 'text-foreground font-medium'}`}>
//                   {task.label}
//                 </span>
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // ── LIST VIEW ──
//   return (
//     <div className="min-h-screen bg-background">
//       <header className="sticky top-0 z-10 glass-strong px-4 py-3 flex items-center justify-between">
//         <h1 className="text-lg font-heading font-bold">Vendor Dashboard</h1>
//         <button onClick={vendorLogout} className="touch-target flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-muted">
//           <LogOut className="h-4 w-4" />
//           Logout
//         </button>
//       </header>

//       <div className="p-4 space-y-3">
//         {bookings.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-20 text-center">
//             <ClipboardList className="h-16 w-16 text-muted-foreground/30 mb-4" />
//             <h2 className="font-heading font-semibold text-lg">No Bookings Yet</h2>
//             <p className="text-sm text-muted-foreground mt-1">Patient bookings will appear here</p>
//           </div>
//         ) : (
//           bookings.map(booking => {
//             const hospital = getHospitalById(booking.hospitalId);
//             const doctor = getDoctorById(booking.doctorId);
            
//             return (
//               <button
//                 key={booking.id}
//                 onClick={() => setSelectedBooking(booking)}
//                 className="touch-target w-full rounded-2xl bg-card shadow-card p-4 text-left transition-all hover:shadow-soft"
//               >
//                 <div className="flex items-center justify-between mb-2">
//                   <span className="font-mono text-xs text-muted-foreground">{booking.id}</span>
//                   <StatusBadge status={booking.status} />
//                 </div>
                
//                 <p className="font-medium text-foreground">{booking.patientName}</p>
                
//                 {/* Added Procedure explicitly into the subtitle layout */}
//                 <p className="text-sm text-primary font-medium mt-1">
//                   {hospital?.procedure ?? 'Medical Procedure'}
//                 </p>
                
//                 <p className="text-xs text-muted-foreground mt-0.5">
//                   {hospital?.name} · {doctor?.name}
//                 </p>
                
//                 <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
//                   <span className="text-sm font-heading font-bold">
//                     {formatPrice(convertPrice(booking.priceUSD, currency), currency)}
//                   </span>
//                   <ChevronRight className="h-4 w-4 text-muted-foreground" />
//                 </div>
//               </button>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// }

// function StatusBadge({ status }: { status: string }) {
//   const styles: Record<string, string> = {
//     Confirmed: 'bg-blue-50 text-blue-700',
//     'In Progress': 'bg-amber-50 text-amber-700',
//     Completed: 'bg-accent/10 text-accent',
//   };
//   return (
//     <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[status] ?? 'bg-muted text-muted-foreground'}`}>
//       {status}
//     </span>
//   );
// }

// function InfoRow({ label, value }: { label: string; value: string }) {
//   return (
//     <div className="flex justify-between text-sm">
//       <span className="text-muted-foreground">{label}</span>
//       <span className="font-medium text-foreground text-right">{value}</span>
//     </div>
//   );
// }



















import { useEffect, useState } from 'react';
import { useApp } from '@/context/AppContext';
import { getHospitalById, getDoctorById, getRoomById, convertPrice, formatPrice } from '@/services/api';
import type { Booking } from '@/types';
import { LogOut, ChevronRight, CheckCircle2, Circle, ArrowLeft, ClipboardList, AlertTriangle } from 'lucide-react';

export function VendorDashboard() {
  const { vendorLogout, bookings, refreshBookings, updateTask, currency } = useApp();
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Error boundaries
  const [error, setError] = useState<string | null>(null);
  const [taskError, setTaskError] = useState<string | null>(null);

  useEffect(() => {
    refreshBookings()
      .then(() => setLoading(false))
      .catch(err => {
        console.error("Dashboard load error:", err);
        setError("Failed to load patient bookings. Please refresh the page.");
        setLoading(false);
      });
  }, [refreshBookings]);

  // Keep selectedBooking in sync with the global bookings array
  useEffect(() => {
    if (selectedBooking) {
      const updated = bookings.find(b => b.id === selectedBooking.id);
      if (updated) setSelectedBooking(updated);
    }
    // We intentionally exclude selectedBooking from the dependency array 
    // so it doesn't fight with our optimistic UI updates below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookings]);

  const handleTaskToggle = async (bookingId: string, taskId: string, completed: boolean) => {
    if (!selectedBooking) return;
    setTaskError(null);

    // 1. OPTIMISTIC UI UPDATE: Instantly update the local state so the UI feels lightning fast
    const originalBooking = { ...selectedBooking };
    const updatedTasks = selectedBooking.tasks.map(t => 
      t.id === taskId ? { ...t, completed } : t
    );
    const anyComplete = updatedTasks.some(t => t.completed);
    const newStatus = anyComplete && selectedBooking.status === 'Confirmed' ? 'In Progress' : selectedBooking.status;

    setSelectedBooking({
      ...selectedBooking,
      tasks: updatedTasks,
      status: newStatus
    });

    // 2. BACKGROUND SYNC: Actually update Firebase
    try {
      await updateTask(bookingId, taskId, completed);
    } catch (err) {
      console.error("Task update failed:", err);
      // 3. REVERT: If Firebase fails, undo the instant update and show an error
      setSelectedBooking(originalBooking);
      setTaskError("Failed to update task status. Please check your connection.");
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center">
        <AlertTriangle className="h-12 w-12 text-destructive/50 mb-4" />
        <p className="text-destructive font-medium mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="touch-target rounded-xl bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground"
        >
          Reload Dashboard
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-4 space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-24 rounded-2xl bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  // ── DETAILED BOOKING VIEW ──
  if (selectedBooking) {
    const hospital = getHospitalById(selectedBooking.hospitalId);
    const doctor = getDoctorById(selectedBooking.doctorId);
    const room = getRoomById(selectedBooking.roomId);

    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-10 glass-strong px-4 py-3 flex items-center gap-3 border-b border-border/50">
          <button onClick={() => setSelectedBooking(null)} className="touch-target rounded-full p-2 hover:bg-muted">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="font-heading font-semibold">Booking {selectedBooking.id}</h1>
        </header>
        
        <div className="p-4 space-y-5">
          <div className="rounded-2xl bg-card shadow-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              <StatusBadge status={selectedBooking.status} />
            </div>
            
            <InfoRow label="Patient" value={selectedBooking.patientName} />
            <InfoRow label="Procedure" value={hospital?.procedure ?? 'Medical Procedure'} />
            <InfoRow label="Hospital" value={hospital?.name ?? ''} />
            <InfoRow label="Doctor" value={doctor?.name ?? ''} />
            <InfoRow label="Room" value={room?.name ?? ''} />
            <div className="pt-2 mt-2 border-t border-border">
              <InfoRow label="Total Price" value={formatPrice(convertPrice(selectedBooking.priceUSD, currency), currency)} bold />
            </div>
          </div>

          <div className="rounded-2xl bg-card shadow-card p-5 space-y-4">
            <h3 className="font-heading font-semibold flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-primary" />
              Concierge Tasks
            </h3>
            
            {taskError && (
              <div className="rounded-xl bg-destructive/10 p-3 text-sm text-destructive font-medium flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{taskError}</span>
              </div>
            )}

            <div className="space-y-2">
              {selectedBooking.tasks.map(task => (
                <button
                  key={task.id}
                  onClick={() => !task.completed && handleTaskToggle(selectedBooking.id, task.id, true)}
                  disabled={task.completed}
                  className={`touch-target flex w-full items-center gap-3 rounded-xl p-3 transition-colors ${
                    task.completed ? 'bg-secondary/30 opacity-75' : 'hover:bg-secondary/50'
                  }`}
                >
                  {task.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground shrink-0" />
                  )}
                  <span className={`text-sm text-left ${task.completed ? 'text-muted-foreground line-through' : 'text-foreground font-medium'}`}>
                    {task.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── LIST VIEW ──
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 glass-strong px-4 py-3 flex items-center justify-between border-b border-border/50">
        <h1 className="text-lg font-heading font-bold">Vendor Dashboard</h1>
        <button onClick={vendorLogout} className="touch-target flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </header>

      <div className="p-4 space-y-3">
        {bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <ClipboardList className="h-16 w-16 text-muted-foreground/30 mb-4" />
            <h2 className="font-heading font-semibold text-lg">No Bookings Yet</h2>
            <p className="text-sm text-muted-foreground mt-1">Patient bookings will appear here automatically.</p>
          </div>
        ) : (
          bookings.map(booking => {
            const hospital = getHospitalById(booking.hospitalId);
            const doctor = getDoctorById(booking.doctorId);
            
            return (
              <button
                key={booking.id}
                onClick={() => setSelectedBooking(booking)}
                className="touch-target w-full rounded-2xl bg-card shadow-card p-4 text-left transition-all hover:shadow-soft active:scale-[0.98]"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-muted-foreground">{booking.id}</span>
                  <StatusBadge status={booking.status} />
                </div>
                
                <p className="font-medium text-foreground">{booking.patientName}</p>
                <p className="text-sm text-primary font-medium mt-1">
                  {hospital?.procedure ?? 'Medical Procedure'}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {hospital?.name} · {doctor?.name}
                </p>
                
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
                  <span className="text-sm font-heading font-bold">
                    {formatPrice(convertPrice(booking.priceUSD, currency), currency)}
                  </span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Confirmed: 'bg-blue-50 text-blue-700 border-blue-200',
    'In Progress': 'bg-amber-50 text-amber-700 border-amber-200',
    Completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  };
  return (
    <span className={`rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-bold ${styles[status] ?? 'bg-muted text-muted-foreground border-border'}`}>
      {status}
    </span>
  );
}

function InfoRow({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex justify-between text-sm py-1">
      <span className="text-muted-foreground">{label}</span>
      <span className={`text-right ${bold ? 'font-heading font-bold text-foreground text-base' : 'font-medium text-foreground'}`}>
        {value}
      </span>
    </div>
  );
}