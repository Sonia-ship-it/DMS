import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Diamond, Shield, Lock, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/authStore';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/discipline/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      toast.success('Authentication successful: Initializing Session');
      router.push('/discipline/dashboard');
    } catch (err: any) {
      setError(err.message || 'Access Denied: Invalid Authentication Cipher');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6">
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 p-10 w-full max-w-md animate-in slide-in-from-bottom-8 duration-700">
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="bg-brand-600 p-2 rounded-xl shadow-lg shadow-brand-500/20">
            <Diamond className="h-8 w-8 text-white fill-white/20" />
          </div>
          <span className="text-3xl font-black tracking-tighter uppercase">RCA Console</span>
        </div>

        <div className="text-center mb-10">
          <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-widest">Operator Login</h2>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Authenticate to access operational matrix</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-50 dark:bg-rose-900/10 text-rose-600 text-xs rounded-2xl border border-rose-100 dark:border-rose-800 text-center font-black uppercase tracking-widest animate-in shake duration-500">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Identifier</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-brand-600 transition-colors" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 pl-11 pr-5 py-4 text-sm outline-none focus:ring-2 focus:ring-brand-500/20 font-bold transition-all"
                placeholder="operator@rca.ac.rw"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cipher Key</label>
              <a href="#" className="text-[10px] font-black text-brand-600 uppercase tracking-widest hover:underline decoration-2">Lost Key?</a>
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-brand-600 transition-colors" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 pl-11 pr-5 py-4 text-sm outline-none focus:ring-2 focus:ring-brand-500/20 font-bold transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-7 rounded-2xl bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-slate-950/20 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Access Command Center'}
            </Button>
          </div>
        </form>

        <div className="mt-10 text-center">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
            Non-authorized entity?
            <Link href="/register" className="ml-2 text-brand-600 hover:underline decoration-2">Request Uplink</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
