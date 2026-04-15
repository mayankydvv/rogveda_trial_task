// import { useState } from 'react';
// import { useApp } from '@/context/AppContext';
// import { Lock, Eye, EyeOff } from 'lucide-react';

// export function VendorLogin() {
//   const { vendorLogin } = useApp();
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPw, setShowPw] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);
//     const ok = await vendorLogin(username, password);
//     setLoading(false);
//     if (!ok) setError('Invalid credentials');
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center p-4 bg-background">
//       <div className="w-full max-w-sm space-y-6">
//         <div className="text-center space-y-2">
//           <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
//             <Lock className="h-7 w-7 text-primary" />
//           </div>
//           <h1 className="text-2xl font-heading font-bold">Vendor Portal</h1>
//           <p className="text-sm text-muted-foreground">Sign in to manage bookings</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="space-y-1.5">
//             <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Username</label>
//             <input
//               value={username}
//               onChange={e => setUsername(e.target.value)}
//               className="touch-target w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
//               placeholder="Enter username"
//             />
//           </div>
//           <div className="space-y-1.5">
//             <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Password</label>
//             <div className="relative">
//               <input
//                 type={showPw ? 'text' : 'password'}
//                 value={password}
//                 onChange={e => setPassword(e.target.value)}
//                 className="touch-target w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
//                 placeholder="Enter password"
//               />
//               <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
//                 {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//               </button>
//             </div>
//           </div>
//           {error && <p className="text-sm text-destructive">{error}</p>}
//           <button
//             type="submit"
//             disabled={loading}
//             className="touch-target w-full rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90 disabled:opacity-50"
//           >
//             {loading ? 'Signing in...' : 'Sign In'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }





import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function VendorLogin() {
  const { vendorLogin } = useApp();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const ok = await vendorLogin(username, password);
    setLoading(false);
    if (!ok) setError('Invalid credentials');
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-background relative">
      
      {/* Back to Home Button */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 touch-target flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/80 hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <Lock className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-2xl font-heading font-bold">Vendor Portal</h1>
          <p className="text-sm text-muted-foreground">Sign in to manage bookings</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Username</label>
            <input
              required
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="touch-target w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Enter username"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Password</label>
            <div className="relative">
              <input
                required
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="touch-target w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Enter password"
              />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          
          {error && (
            <div className="rounded-xl bg-destructive/10 p-3 text-sm text-destructive font-medium text-center">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="touch-target w-full rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}