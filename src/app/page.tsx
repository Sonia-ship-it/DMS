'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  ArrowRight, 
  Play, 
  Briefcase, 
  Zap, 
  Search, 
  Users, 
  Sparkles, 
  BarChart2, 
  LayoutDashboard,
  Globe, 
  Share2,
  MessageCircle,
  Settings
} from 'lucide-react';

const Nav = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-6">
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex items-center gap-8 bg-black/20 backdrop-blur-md border border-white/10 px-8 py-3 rounded-full shadow-2xl"
    >
      <div className="flex items-center gap-2 text-white font-bold text-lg">
        <div className="w-6 h-6 rounded border-2 border-blue-500 flex items-center justify-center rotate-45">
          <div className="w-2 h-2 bg-blue-500 rounded-sm"></div>
        </div>
        Intore
      </div>

      <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
        <a href="#features" className="hover:text-white transition-colors">Features</a>
        <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
        <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        <a href="#testimonials" className="hover:text-white transition-colors">Success Stories</a>
      </div>

      <div className="flex items-center gap-4">
        <Link href="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Log In</Link>
        <Link href="/register" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded-full transition-all shadow-lg shadow-blue-600/20">
          Get started
        </Link>
      </div>
    </motion.div>
  </nav>
);

const SectionHeading = ({ children, badge, center = true }: { children: React.ReactNode, badge?: string, center?: boolean }) => (
  <div className={`mb-12 ${center ? 'text-center' : 'text-left'}`}>
    {badge && (
      <motion.span
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase mb-4"
      >
        {badge}
      </motion.span>
    )}
    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-[1.15]">
      {children}
    </h2>
  </div>
);

const Footer = () => (
  <footer className="bg-[#0a0f24] text-slate-300 py-24 px-8 rounded-tr-[5rem] relative overflow-hidden mt-20">
    <div className="absolute -bottom-[20%] -right-[15%] text-[300px] font-black text-white/[0.03] leading-none tracking-tighter italic select-none">
      INTORE
    </div>
    <div className="max-w-7xl mx-auto relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-6 text-white font-bold text-2xl">
            <div className="w-8 h-8 rounded border-2 border-white flex items-center justify-center rotate-45">
              <div className="w-3 h-3 bg-white rounded-sm"></div>
            </div>
            Intore
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-xs">
            Built for Rwanda. Powered by AI. Hiring Rwanda's best talent faster than ever before.
          </p>
          <div className="flex gap-4">
            {[Globe, Share2, MessageCircle].map((Icon, i) => (
              <div key={i} className="w-10 h-10 bg-[#1e2646] hover:bg-blue-600 rounded-full flex items-center justify-center transition-all cursor-pointer group">
                <Icon className="w-5 h-5 text-slate-400 group-hover:text-white" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-6">Product</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
            <li><a href="#" className="hover:text-white transition-colors">How it works</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-6">Company</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-6">Legal</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white transition-colors">GDPR Compliance</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
          </ul>
        </div>
      </div>

      <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-6 text-xs text-slate-500 font-medium">
          <p>© 2026 Intore. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
            System Operational
          </div>
        </div>
        <p className="text-xs text-slate-500 italic font-medium">
          Designed for Rwandan Recruiters.
        </p>
      </div>
    </div>
  </footer>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f7f9fc] text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      <Nav />

      {/* Hero Section */}
      <section className="relative min-h-[110vh] flex flex-col items-center justify-center pt-20 px-6 overflow-hidden">
        {/* Dark/Blue background with radial gradients */}
        <div className="absolute inset-0 z-0 bg-[#0a0f24]">
          <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-blue-900/30 to-transparent"></div>
          <div className="absolute top-[20%] left-[20%] w-[60vw] h-[60vw] bg-blue-600/20 blur-[120px] rounded-full animate-pulse"></div>
          <div className="absolute bottom-[10%] right-[10%] w-[40vw] h-[40vw] bg-purple-600/10 blur-[100px] rounded-full"></div>
          {/* Dot grid pattern */}
          <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        </div>

        <div className="relative z-10 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-widest mb-8"
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI-Powered Talent Management
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.05] mb-8"
          >
            Hire Rwanda's Best Talent, <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-white">Faster Than Ever Before.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-blue-100/70 max-w-2xl mx-auto mb-12"
          >
            Intore helps Rwandan companies source, screen, and rank candidates automatically — so you reach your best fit in minutes, not months.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4"
          >
            <Link href="/register" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-2xl shadow-blue-600/40 flex items-center justify-center gap-2">
              Start Hiring Smarter
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white font-bold px-8 py-4 rounded-xl transition-all border border-white/10 flex items-center justify-center gap-2 backdrop-blur-sm">
              <Play className="w-4 h-4 fill-white" />
              Watch How It Works
            </button>
          </motion.div>
        </div>

        {/* Floating Hero UI Elements */}
        <div className="relative mt-24 w-full max-w-5xl mx-auto h-[400px] md:h-[600px]">
          {/* Main Dashboard Card */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute inset-0 bg-[#101735]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-[0_0_100px_rgba(37,99,235,0.2)] overflow-hidden"
          >
            <div className="flex h-full">
              {/* Sidebar */}
              <div className="w-16 md:w-24 border-r border-white/5 flex flex-col items-center py-8 gap-8">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/10 flex items-center justify-center">
                  <LayoutDashboard className="w-5 h-5 text-blue-500" />
                </div>
                <Briefcase className="w-5 h-5 text-white/20" />
                <Users className="w-5 h-5 text-white/20" />
                <Settings className="w-5 h-5 text-white/20" />
              </div>
              {/* Content Area */}
              <div className="flex-1 p-8">
                <div className="flex justify-between items-start mb-12">
                  <div className="space-y-2">
                    <div className="h-6 w-48 bg-white/10 rounded-lg animate-pulse"></div>
                    <div className="h-4 w-32 bg-white/5 rounded-lg animate-pulse"></div>
                  </div>
                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-lg bg-white/5"></div>
                    <div className="h-10 w-24 rounded-lg bg-blue-600"></div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-32 bg-white/5 border border-white/5 rounded-2xl p-6">
                      <div className="h-4 w-20 bg-white/10 rounded-lg mb-4"></div>
                      <div className="h-8 w-24 bg-white/20 rounded-lg"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating Small Cards */}
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="absolute -top-10 -left-10 md:left-[-60px] bg-white rounded-2xl p-4 shadow-2xl border border-slate-100 min-w-[220px] z-20"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Candidates Run</div>
                <div className="text-xl font-bold text-slate-900">247</div>
              </div>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full w-[65%] bg-emerald-500"></div>
            </div>
            <div className="mt-2 text-[10px] font-bold text-emerald-600 flex items-center gap-1">
              <ArrowRight className="w-3 h-3" /> +12% this week
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [10, -10, 10] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            className="absolute -bottom-10 right-[-10px] md:right-[-60px] bg-white rounded-2xl p-6 shadow-2xl border border-slate-100 min-w-[280px] z-20"
          >
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm font-bold text-slate-900">Screening AI-Rank</div>
              <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-lg font-bold">18 candidates</div>
            </div>
            <div className="space-y-4">
              {[
                { name: 'Sarah M.', score: 94, rank: 1, color: 'bg-emerald-500' },
                { name: 'Jean-Pierre R.', score: 88, rank: 2, color: 'bg-blue-500' },
                { name: 'Alice K.', score: 82, rank: 3, color: 'bg-amber-500' }
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-slate-100 text-[10px] flex items-center justify-center font-bold">{c.rank}</div>
                  <div className="flex-1">
                    <div className="flex justify-between text-xs mb-1 font-bold">
                      <span>{c.name}</span>
                      <span>{c.score}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${c.color}`} style={{ width: `${c.score}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-24 px-8 border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-[0.3em] mb-12">Trusted by Rwanda's Fast-Growing Teams</p>
          <div className="flex flex-wrap justify-between items-center gap-12 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
            {/* Placeholder logos */}
            <div className="text-2xl font-black italic tracking-tighter text-slate-900">RWANDA TECH</div>
            <div className="text-2xl font-black italic tracking-tighter text-slate-900">KIGALI-WORKS</div>
            <div className="text-2xl font-black italic tracking-tighter text-slate-900">MTN CLONE</div>
            <div className="text-2xl font-black italic tracking-tighter text-slate-900">AIRTEL CLONE</div>
            <div className="text-2xl font-black italic tracking-tighter text-slate-900">BK GROUP</div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-5xl font-black text-slate-900 mb-2">18 min</div>
              <p className="text-sm text-slate-500 font-medium">Average time to hire decision</p>
            </div>
            <div>
              <div className="text-5xl font-black text-slate-900 mb-2">94%</div>
              <p className="text-sm text-slate-500 font-medium">Candidate satisfaction score</p>
            </div>
            <div>
              <div className="text-5xl font-black text-slate-900 mb-2">3.2x</div>
              <p className="text-sm text-slate-500 font-medium">Faster screening process</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-8 bg-[#fdfdfe]">
        <div className="max-w-7xl mx-auto flex flex-col gap-40">
          <div className="text-center max-w-2xl mx-auto">
            <SectionHeading badge="Everything you need">Everything Rwandan hiring teams need to hire smarter.</SectionHeading>
            <p className="text-slate-500 text-lg -mt-8">Intore automates the tedious manual work of recruitment.</p>
          </div>

          {/* Feature 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="bg-[#f0f4ff] rounded-[3rem] p-12 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-transparent rounded-[3rem]"></div>
              <div className="relative z-10 bg-white rounded-3xl p-8 shadow-2xl border border-slate-100">
                <div className="flex items-center justify-between mb-8">
                  <div className="text-sm font-bold text-slate-900">Top Candidates</div>
                  <div className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">AI Sorted</div>
                </div>
                <div className="space-y-4">
                  {[
                    { name: 'Sarah Mukamanzi', score: 98, role: 'Fullstack Dev' },
                    { name: 'John Doe', score: 92, role: 'UI/UX' },
                    { name: 'Alicia Keys', score: 87, role: 'DevOps' },
                  ].map((c, i) => (
                    <div key={i} className={`flex items-center justify-between p-4 rounded-xl border border-slate-50 ${i === 0 ? 'bg-blue-50/50 border-blue-100 shadow-sm' : ''}`}>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                        <div>
                          <div className="text-sm font-bold text-slate-900">{c.name}</div>
                          <div className="text-[10px] text-slate-500">{c.role}</div>
                        </div>
                      </div>
                      <div className="text-sm font-black text-blue-600">{c.score}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <SectionHeading badge="Screening" center={false}>From 200 applicants to a ranked top 10 — in minutes.</SectionHeading>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Intore uses advanced AI to analyze resumes and screening questions specifically for the Rwandan job market, surfacing the best fits automatically.
              </p>
              <ul className="space-y-4">
                {[
                  'Deep parsing of local education & experience context',
                  'AI-Powered ranking based on true potential',
                  'Bias-free screening automation'
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-center text-slate-700 font-medium">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Feature 2 */}
          <div id="how-it-works" className="grid grid-cols-1 md:grid-cols-2 gap-32 items-center">
            <div className="order-2 md:order-1">
              <SectionHeading badge="Intelligent Assistant" center={false}>Ask your shortlist anything. Get answers instantly.</SectionHeading>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Stop digging through resumes. Use Intore Chat to query your candidate pool about specific skills, personality traits, or salary expectations.
              </p>
              <ul className="space-y-4">
                {[
                  'Instant answers based on resume and screening data',
                  'Suggestive clips from recorded interviews',
                  'Comparing candidate experience side-by-side'
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-center text-slate-700 font-medium">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 md:order-2 bg-[#fdf8f0] rounded-[3rem] p-12 relative overflow-hidden">
              <div className="relative z-10 bg-white rounded-3xl p-8 shadow-2xl border border-slate-100">
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mb-4">
                  <p className="text-xs text-slate-500 italic">"Does any of our shortlisted candidates have experience with Next.js and lives in Kigali?"</p>
                </div>
                <div className="bg-blue-600 text-white rounded-xl p-4 ml-8 relative">
                  <p className="text-xs font-semibold">"Yes! 3 candidates fit this criteria: Sarah M., Jean R., and Alice K. Sarah has the most Next.js experience (4 years)."</p>
                  <div className="absolute -left-2 top-4 w-4 h-4 bg-blue-600 rotate-45"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-32 px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Source best talent', desc: 'Reach the best talent in Rwanda with our intelligent sourcing engine.', icon: Search },
              { title: 'Smarter screening', desc: 'AI-driven screening that actually understands local context.', icon: Sparkles },
              { title: 'Faster decisions', desc: 'Rank and shortlist candidates in seconds, not days.', icon: Zap },
              { title: 'Bias-free', desc: 'Objective screening results based solely on merit.', icon: Users },
              { title: 'Rich Analytics', desc: 'Understand your hiring funnel better than ever before.', icon: BarChart2 },
              { title: 'Seamless Flow', desc: 'Manage everything from job post to offer letter.', icon: Briefcase },
            ].map((benefit, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                <div className="w-12 h-12 rounded-xl bg-blue-600/5 flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <benefit.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 px-8 relative overflow-hidden bg-[#0a0f24]">
        <div className="absolute top-0 left-0 w-full h-full bg-[#3b4de0]/10 flex items-center justify-center pointer-events-none">
          <div className="w-[100vw] h-[100vw] bg-blue-600/20 blur-[150px] rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <SectionHeading badge="Join the future">
            <span className="text-white">Ready to hire smarter across Rwanda?</span>
          </SectionHeading>
          <p className="text-xl text-blue-100/70 mb-12">Join Rwanda's fastest growing teams and start finding your best fits today.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold px-10 py-5 rounded-xl transition-all shadow-2xl">
              Sign Up for Free
            </Link>
            <button className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white font-bold px-10 py-5 rounded-xl transition-all border border-white/10">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// End of LandingPage
