import { useState, useEffect, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import type { Hospital, Doctor, RoomType, PricingEntry } from '@/types';
import { fetchDoctorsForHospital, fetchRoomTypesForHospital, fetchPricing, getLowestPriceDoctor, convertPrice, formatPrice } from '@/services/api';
import { ChevronDown, MapPin, Stethoscope, Star } from 'lucide-react';

interface Props {
  hospital: Hospital;
  onBook: (hospitalId: string, doctorId: string, roomId: string, priceUSD: number) => void;
}

export function HospitalCard({ hospital, onBook }: Props) {
  const { currency } = useApp();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [pricingData, setPricingData] = useState<PricingEntry[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Promise.all([
      fetchDoctorsForHospital(hospital.id),
      fetchRoomTypesForHospital(hospital.id),
      fetchPricing(hospital.id),
    ]).then(([d, r, p]) => {
      setDoctors(d);
      setRooms(r);
      setPricingData(p);
      const lowest = getLowestPriceDoctor(hospital.id);
      setSelectedDoctor(lowest.doctorId);
      setSelectedRoom(lowest.roomId);
      setLoaded(true);
    });
  }, [hospital.id]);

  // Filter rooms available for selected doctor
  const availableRooms = useMemo(() => {
    if (!selectedDoctor) return rooms;
    const roomIds = pricingData.filter(p => p.doctorId === selectedDoctor).map(p => p.roomId);
    return rooms.filter(r => roomIds.includes(r.id));
  }, [selectedDoctor, pricingData, rooms]);

  // Auto-correct room if not available
  useEffect(() => {
    if (loaded && availableRooms.length && !availableRooms.find(r => r.id === selectedRoom)) {
      // pick cheapest room for this doctor
      const cheapest = pricingData
        .filter(p => p.doctorId === selectedDoctor)
        .reduce((min, e) => e.priceUSD < min.priceUSD ? e : min);
      setSelectedRoom(cheapest.roomId);
    }
  }, [selectedDoctor, availableRooms, selectedRoom, loaded, pricingData]);

  const currentPrice = useMemo(() => {
    const entry = pricingData.find(p => p.doctorId === selectedDoctor && p.roomId === selectedRoom);
    return entry?.priceUSD ?? 0;
  }, [selectedDoctor, selectedRoom, pricingData]);

  const selectedDoctorObj = doctors.find(d => d.id === selectedDoctor);

  if (!loaded) {
    return (
      <div className="rounded-2xl bg-card shadow-card p-5 animate-pulse space-y-4">
        <div className="h-40 rounded-xl bg-muted" />
        <div className="h-4 w-2/3 rounded bg-muted" />
        <div className="h-4 w-1/3 rounded bg-muted" />
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-card shadow-card overflow-hidden transition-all hover:shadow-soft">
      {/* Image placeholder */}
      <div className="relative h-44 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
        <Stethoscope className="h-16 w-16 text-primary/20" />
        {hospital.accredited && (
          <span className="absolute top-3 right-3 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
            JCI Accredited
          </span>
        )}
      </div>

      <div className="p-5 space-y-4">
        {/* Header */}
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground">{hospital.name}</h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-0.5">
            <MapPin className="h-3.5 w-3.5" />
            <span>{hospital.location}</span>
          </div>
          <p className="text-sm font-medium text-primary mt-1">{hospital.procedure}</p>
        </div>

        {/* Doctor select */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Select Doctor</label>
          <div className="relative">
            <select
              value={selectedDoctor}
              onChange={e => setSelectedDoctor(e.target.value)}
              className="touch-target w-full appearance-none rounded-xl border border-border bg-secondary/50 px-4 py-3 pr-10 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {doctors.map(d => (
                <option key={d.id} value={d.id}>{d.name} ({d.experience} yrs exp)</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
          {selectedDoctorObj && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <span>{selectedDoctorObj.experience} years experience</span>
            </div>
          )}
        </div>

        {/* Room select */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Room Type</label>
          <div className="relative">
            <select
              value={selectedRoom}
              onChange={e => setSelectedRoom(e.target.value)}
              className="touch-target w-full appearance-none rounded-xl border border-border bg-secondary/50 px-4 py-3 pr-10 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {availableRooms.map(r => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>

        {/* Price + Book */}
        <div className="flex items-end justify-between pt-2 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground">Starting from</p>
            <p className="text-2xl font-heading font-bold text-foreground">
              {formatPrice(convertPrice(currentPrice, currency), currency)}
            </p>
          </div>
          <button
            onClick={() => onBook(hospital.id, selectedDoctor, selectedRoom, currentPrice)}
            className="touch-target rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90 active:scale-[0.97]"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
