import { useApp } from '@/context/AppContext';
import type { Currency } from '@/types';

const options: { value: Currency; label: string }[] = [
  { value: 'USD', label: 'USD ($)' },
  { value: 'INR', label: 'INR (₹)' },
  { value: 'NGN', label: 'NGN (₦)' },
];

export function CurrencyToggle() {
  const { currency, setCurrency } = useApp();

  return (
    <div className="flex items-center gap-1 rounded-full bg-secondary p-1">
      {options.map(opt => (
        <button
          key={opt.value}
          onClick={() => setCurrency(opt.value)}
          className={`touch-target rounded-full px-3 py-1.5 text-sm font-medium transition-all ${
            currency === opt.value
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
