import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Diamond, Briefcase, User, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/authStore';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuthStore();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await register(firstName, lastName, email, phoneNumber, password, 'staff');
      toast.success('Strategy initialized: Account active');
      router.push('/login');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 dark:bg-slate-950">
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 p-10 w-full max-w-lg animate-in zoom-in-95 duration-500">
        <div className="flex items-center justify-center gap-3 mb-8">
          <Diamond className="h-10 w-10 text-brand-600 fill-brand-600/10" />
          <span className="text-3xl font-black tracking-tighter uppercase">RCA Terminal</span>
        </div>

        <div className="text-center mb-10">
          <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-widest">Account Provisioning</h2>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Initialize your administrative tactical access</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-50 dark:bg-rose-900/10 text-rose-600 text-xs rounded-2xl border border-rose-100 dark:border-rose-800 text-center font-black uppercase tracking-widest animate-in slide-in-from-top-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">First Name</label>
              <input
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-500/20 font-bold transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Last Name</label>
              <input
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-500/20 font-bold transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Secure Email Uplink</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-500/20 font-bold transition-all"
              placeholder="operator@rca.ac.rw"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Comms Liaison (Phone)</label>
            <input
              required
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-500/20 font-bold transition-all"
              placeholder="+250 788 000 000"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Cipher Key</label>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-500/20 font-bold transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Verify Cipher</label>
              <input
                required
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-500/20 font-bold transition-all"
              />
            </div>
          </div>

          <Button type="submit" className="w-full py-7 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-brand-500/20 transition-all hover:scale-[1.02] active:scale-95">
            Initialize Account
          </Button>
        </form>

        <p className="text-sm text-center mt-6 text-muted-foreground">
          Already have an account? <Link href="/login" className="text-primary hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
