import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Mail, Lock, Eye, EyeOff, Star, Crown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/authStore';
import { toast } from 'sonner';
import { AuthBackground } from '@/components/auth/AuthBackground';


export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
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
      toast.success('Login successful');
      router.push('/discipline/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-['Urbanist'] bg-white overflow-hidden">
      {/* Left Section: Branding & Vision */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12 overflow-hidden">
        <AuthBackground />


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 w-full max-w-lg"
        >
          <div className="bg-white/5 backdrop-blur-2xl rounded-[3rem] border border-white/10 p-16 flex flex-col items-center text-center shadow-2xl shadow-black/50">
            <div className="relative mb-8 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-2.5 rounded-2xl shadow-xl"
              >
                <img src="/rca-logo.jpg" alt="RCA Logo" className="w-24 h-24 object-contain rounded-xl" />
              </motion.div>
            </div>

            <h1 className="text-4xl xl:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
              School Discipline System.
            </h1>

            <p className="text-white/60 text-lg leading-relaxed mb-12 font-medium">
              Welcome to the Rwanda Coding Academy Discipline Management System. Easily manage and track student records, exits, and data in one centralized platform.
            </p>

            <div className="pt-8 border-t border-white/10 w-full">
              <p className="text-white/30 text-xs uppercase tracking-[0.3em] font-bold">
                Student Tracking Platform
              </p>
            </div>
          </div>


        </motion.div>
      </div>

      {/* Right Section: Interaction */}
      <div className="w-full lg:w-1/2 min-h-screen flex items-center justify-center relative bg-white">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-[420px] px-8 sm:px-0"
        >

          <div className="mb-10 text-center">
            <h3 className="text-3xl font-bold text-[#0A0E2E] mb-2 tracking-tight">Staff Login</h3>
            <p className="text-slate-400 font-medium tracking-wide">Please enter your email and password to log in.</p>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 p-4 bg-red-50 text-red-500 text-xs rounded-xl border border-red-100 font-bold uppercase tracking-widest text-center"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 ml-1">Organization Email</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 transition-colors group-focus-within:text-[#0A0E2E]">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border-none rounded-2xl px-12 py-4 text-sm font-bold text-[#0A0E2E] outline-none ring-2 ring-transparent focus:ring-[#0A0E2E]/5 transition-all placeholder:text-slate-300"
                  placeholder="example@gmail.com"
                />
              </div>
            </div>

            <div className="space-y-2 text-right">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-semibold text-slate-500">Password</label>
                <a href="#" className="text-[11px] font-bold text-[#0A0E2E] hover:underline underline-offset-4 italic">Forgot password?</a>
              </div>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 transition-colors group-focus-within:text-[#0A0E2E]">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border-none rounded-2xl px-12 py-4 text-sm font-bold text-[#0A0E2E] outline-none ring-2 ring-transparent focus:ring-[#0A0E2E]/5 transition-all placeholder:text-slate-300 pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-[#0A0E2E] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 px-1">
              <div
                className={`w-5 h-5 rounded border transition-all flex items-center justify-center cursor-pointer ${rememberMe ? 'bg-[#0A0E2E] border-[#0A0E2E]' : 'border-slate-200 bg-slate-50'}`}
                onClick={() => setRememberMe(!rememberMe)}
              >
                {rememberMe && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
              </div>
              <span className="text-xs font-bold text-slate-400">Stay signed in for today</span>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-[#0A0E2E] hover:bg-[#151a44] text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-[#0A0E2E]/20 transition-all hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full"
                  />
                  <span>Logging in...</span>
                </div>
              ) : (
                <span className="flex items-center gap-2">LOGIN <ChevronRight size={16} strokeWidth={3} /></span>
              )}
            </Button>
          </form>

          <p className="mt-12 text-center text-[13px] text-slate-400 font-medium">
            Don't have an account? <Link href="/register" className="text-[#0A0E2E] font-bold hover:underline">Register</Link>
          </p>

          <div className="mt-20 border-t border-slate-50 pt-8 flex flex-col items-center gap-4">
            <p className="text-[10px] text-slate-300 uppercase tracking-widest font-bold font-sans">
              © 2026 RCA Discipline Management System
            </p>
            <div className="flex gap-6">
              {['Privacy', 'Terms', 'Contact'].map((item) => (
                <a key={item} href="#" className="text-[10px] text-slate-400 uppercase tracking-widest font-black hover:text-[#0A0E2E] transition-colors">{item}</a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

