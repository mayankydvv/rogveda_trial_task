import { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import type { Hospital, Doctor, RoomType } from '@/types';
import { 
  fetchDoctorsForHospital, 
  fetchRoomTypesForHospital, 
  getLowestPriceDoctor, 
  getPrice, 
  convertPrice, 
  formatPrice 
} from '@/services/api';
import { MapPin, Star, User, Bed, ChevronDown } from 'lucide-react';

interface Props {
  hospital: Hospital;
  onBook: (hospitalId: string, doctorId: string, roomId: string, priceUSD: number) => void;
}

// ── Mobile-Optimized, Wide-Angle Images ──
const hospitalImages: Record<string, string> = {
  'h1': 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80', 
  'h2': 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80', 
  'h3': 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80', 
};

export function HospitalCard({ hospital, onBook }: Props) {
  const { currency } = useApp();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Promise.all([
      fetchDoctorsForHospital(hospital.id),
      fetchRoomTypesForHospital(hospital.id),
    ]).then(([d, r]) => {
      setDoctors(d);
      setRooms(r);
      const lowest = getLowestPriceDoctor(hospital.id);
      setSelectedDoctor(lowest.doctorId);
      setSelectedRoom(lowest.roomId);
      setLoaded(true);
    });
  }, [hospital.id]);

  if (!loaded) return <div className="h-[380px] w-full rounded-2xl bg-muted animate-pulse" />;

  const currentPrice = getPrice(hospital.id, selectedDoctor, selectedRoom) ?? 0;
  const displayImage = hospital.imageUrl || hospitalImages[hospital.id] || hospitalImages['h1'];

  return (
    <div className="overflow-hidden rounded-2xl bg-card shadow-card transition-all hover:shadow-soft">
      {/* Mobile-Optimized Image Section */}
      <div className="relative h-56 w-full overflow-hidden bg-muted sm:h-64">
        <img 
          src={displayImage} 
          alt={hospital.name}
          className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
        />
        {/* Trust Signal Badge */}
        {hospital.accredited && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-background/95 backdrop-blur-sm px-3 py-1.5 text-[10px] font-bold text-foreground shadow-sm uppercase tracking-wider">
            <Star className="h-3.5 w-3.5 text-accent" fill="currentColor" />
            JCI Accredited
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5 space-y-5">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-heading text-lg font-bold leading-tight">{hospital.name}</h3>
          </div>
          <p className="flex items-center gap-1 text-sm text-muted-foreground mt-1.5">
            <MapPin className="h-3.5 w-3.5" />
            {hospital.location}
          </p>
          <p className="text-sm font-medium text-primary mt-2">
            {hospital.procedure ?? 'Total Knee Replacement'}
          </p>
        </div>

        {/* Dropdowns */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5 uppercase tracking-wide">
              <User className="h-3.5 w-3.5" /> Doctor
            </label>
            <div className="relative">
              <select
                value={selectedDoctor}
                onChange={e => setSelectedDoctor(e.target.value)}
                className="touch-target w-full rounded-xl border border-border bg-secondary/50 pl-3 pr-8 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer appearance-none"
              >
                {doctors.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
              {/* RESTORED ARROW */}
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
          
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5 uppercase tracking-wide">
              <Bed className="h-3.5 w-3.5" /> Room
            </label>
            <div className="relative">
              <select
                value={selectedRoom}
                onChange={e => setSelectedRoom(e.target.value)}
                className="touch-target w-full rounded-xl border border-border bg-secondary/50 pl-3 pr-8 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer appearance-none"
              >
                {rooms.map(r => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
              {/* RESTORED ARROW */}
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Footer: Price & Action */}
        <div className="flex items-end justify-between pt-4 border-t border-border/50">
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-0.5">Total Cost</p>
            <p className="font-heading text-xl font-bold text-foreground">
              {formatPrice(convertPrice(currentPrice, currency), currency)}
            </p>
          </div>
          <button
            onClick={() => onBook(hospital.id, selectedDoctor, selectedRoom, currentPrice)}
            className="touch-target rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90 active:scale-95"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}