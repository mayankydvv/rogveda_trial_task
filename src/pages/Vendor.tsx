import { useApp } from '@/context/AppContext';
import { VendorLogin } from '@/components/VendorLogin';
import { VendorDashboard } from '@/components/VendorDashboard';

export default function VendorPage() {
  const { vendorAuth } = useApp();
  return vendorAuth ? <VendorDashboard /> : <VendorLogin />;
}
