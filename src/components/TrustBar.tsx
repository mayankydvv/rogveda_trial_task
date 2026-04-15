import { Shield, Headphones, BadgeCheck } from 'lucide-react';

const signals = [
  { icon: Shield, label: 'JCI Accredited Facilities' },
  { icon: Headphones, label: '24/7 International Concierge' },
  { icon: BadgeCheck, label: 'Transparent Pricing – Zero Hidden Fees' },
];

export function TrustBar() {
  return (
    <div className="flex flex-wrap justify-center gap-4 py-4">
      {signals.map(s => (
        <div key={s.label} className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-xs font-medium text-muted-foreground">
          <s.icon className="h-4 w-4 text-accent" />
          <span>{s.label}</span>
        </div>
      ))}
    </div>
  );
}
