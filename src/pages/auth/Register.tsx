import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { User, Mail, Lock, Phone, Star, Crown, ChevronRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/authStore';
import { toast } from 'sonner';
import { AuthBackground } from '@/components/auth/AuthBackground';


export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuthStore();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      await register(firstName, lastName, email, phoneNumber, password, 'staff');
      toast.success('Registration successful');
      router.push('/login');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
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
              Create an Account.
            </h1>

            <p className="text-white/60 text-lg leading-relaxed mb-12 font-medium">
              Register for the Rwanda Coding Academy Discipline Management System. Managing student information has never been easier.
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
      <div className="w-full lg:w-1/2 min-h-screen flex items-center justify-center relative bg-white overflow-y-auto scrollbar-none">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-[520px] px-8 sm:px-0 my-12"
        >
          {/* Back link */}
          <Link href="/login" className="flex items-center gap-2 mb-12 group">
            <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-[#0A0E2E] transition-all group-hover:bg-[#0A0E2E] group-hover:text-white">
              <ArrowLeft size={18} />
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Back to Sign In</span>
          </Link>

          <div className="mb-10 text-center">
            <h3 className="text-3xl font-bold text-[#0A0E2E] mb-2 tracking-tight">Staff Registration</h3>
            <p className="text-slate-400 font-medium tracking-wide">Create an account to manage student discipline.</p>
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

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500 ml-1">First Name</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 transition-colors group-focus-within:text-[#0A0E2E]">
                    <User size={16} />
                  </div>
                  <input
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-slate-50 border-none rounded-2xl px-12 py-3.5 text-sm font-bold text-[#0A0E2E] outline-none ring-2 ring-transparent focus:ring-[#0A0E2E]/5 transition-all placeholder:text-slate-300"
                    placeholder="John"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500 ml-1">Last Name</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 transition-colors group-focus-within:text-[#0A0E2E]">
                    <User size={16} />
                  </div>
                  <input
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-slate-50 border-none rounded-2xl px-12 py-3.5 text-sm font-bold text-[#0A0E2E] outline-none ring-2 ring-transparent focus:ring-[#0A0E2E]/5 transition-all placeholder:text-slate-300"
                    placeholder="Doe"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 ml-1">Professional Email</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 transition-colors group-focus-within:text-[#0A0E2E]">
                  <Mail size={16} />
                </div>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border-none rounded-2xl px-12 py-3.5 text-sm font-bold text-[#0A0E2E] outline-none ring-2 ring-transparent focus:ring-[#0A0E2E]/5 transition-all placeholder:text-slate-300"
                  placeholder="example@gmail.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 ml-1">Phone Number</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 transition-colors group-focus-within:text-[#0A0E2E]">
                  <Phone size={16} />
                </div>
                <input
                  required
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full bg-slate-50 border-none rounded-2xl px-12 py-3.5 text-sm font-bold text-[#0A0E2E] outline-none ring-2 ring-transparent focus:ring-[#0A0E2E]/5 transition-all placeholder:text-slate-300"
                  placeholder="+250 788 000 000"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500 ml-1">Password</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 transition-colors group-focus-within:text-[#0A0E2E]">
                    <Lock size={16} />
                  </div>
                  <input
                    required
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-50 border-none rounded-2xl px-12 py-3.5 text-sm font-bold text-[#0A0E2E] outline-none ring-2 ring-transparent focus:ring-[#0A0E2E]/5 transition-all placeholder:text-slate-300"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500 ml-1">Confirm Password</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 transition-colors group-focus-within:text-[#0A0E2E]">
                    <Lock size={16} />
                  </div>
                  <input
                    required
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-slate-50 border-none rounded-2xl px-12 py-3.5 text-sm font-bold text-[#0A0E2E] outline-none ring-2 ring-transparent focus:ring-[#0A0E2E]/5 transition-all placeholder:text-slate-300"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-[#0A0E2E] hover:bg-[#151a44] text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-[#0A0E2E]/20 transition-all hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50 mt-4"
            >
              {loading ? 'Registering...' : 'REGISTER'}
            </Button>
          </form>

          <p className="mt-8 text-center text-[13px] text-slate-400 font-medium">
            Already have an account? <Link href="/login" className="text-[#0A0E2E] font-bold hover:underline">Sign In</Link>
          </p>

          <div className="mt-16 text-center">
            <p className="text-[10px] text-slate-300 uppercase tracking-widest font-bold">
              RCA Discipline Management System
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

