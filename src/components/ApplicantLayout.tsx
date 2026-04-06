'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Briefcase, LayoutDashboard, User, Moon, LogOut, Search } from 'lucide-react';

export default function ApplicantLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-[#f7f9fc]">
            {/* Header */}
            <header className="h-16 bg-[#0a0f24] border-b border-white/5 flex items-center justify-between px-8 text-white sticky top-0 z-40">
                <div className="flex items-center gap-12">
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded border-2 border-white flex items-center justify-center rotate-45">
                            <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                        </div>
                        <span className="text-lg font-bold tracking-tight">Intore</span>
                        <span className="bg-white/10 text-white/40 text-[10px] font-bold px-1.5 py-0.5 rounded ml-2 uppercase tracking-widest">Jobs</span>
                    </div>

                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                        <Link
                            href="/jobs"
                            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg transition-colors ${pathname === '/jobs' ? 'bg-white/10 text-white font-bold' : 'text-slate-300 hover:text-white'}`}
                        >
                            <Search className="w-4 h-4" />
                            Browse Jobs
                        </Link>
                        <Link
                            href="/applications"
                            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg transition-colors ${pathname === '/applications' ? 'bg-white/10 text-white font-bold' : 'text-slate-300 hover:text-white'}`}
                        >
                            <Briefcase className="w-4 h-4" />
                            My Applications
                        </Link>
                        <Link
                            href="/profile"
                            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg transition-colors ${pathname === '/profile' ? 'bg-white/10 text-white font-bold' : 'text-slate-300 hover:text-white'}`}
                        >
                            <User className="w-4 h-4" />
                            Profile
                        </Link>
                    </nav>
                </div>

                <div className="flex items-center gap-6">
                    <button className="text-slate-400 hover:text-white transition-colors">
                        <Moon className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold text-slate-300">Claudine U.</span>
                        <button className="text-slate-400 hover:text-white transition-colors">
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Page Content */}
            <main className="max-w-7xl mx-auto py-12 px-6">
                {children}
            </main>

            {/* Footer (Simplified for Applicant Portal) */}
            <footer className="mt-20 py-20 px-8 border-t border-slate-100">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12 text-slate-500 text-sm">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-slate-900 font-bold mb-6">
                            <div className="w-5 h-5 rounded border-2 border-slate-900 flex items-center justify-center rotate-45">
                                <div className="w-1.5 h-1.5 bg-slate-900 rounded-sm"></div>
                            </div>
                            Intore
                        </div>
                        <p className="max-w-xs text-xs">Built for Rwanda. Powered by AI.</p>
                        <div className="flex gap-4">
                            <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center">X</div>
                            <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center">in</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
                        <div>
                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Product</h4>
                            <ul className="space-y-3">
                                <li className="hover:text-slate-900 transition-colors">Features</li>
                                <li className="hover:text-slate-900 transition-colors">How it works</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Legal</h4>
                            <ul className="space-y-3">
                                <li className="hover:text-slate-900 transition-colors">Privacy</li>
                                <li className="hover:text-slate-900 transition-colors">Terms</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="max-w-6xl mx-auto mt-20 text-[10px] text-slate-300 flex justify-between items-center italic">
                    <p>© 2026 Intore. All rights reserved.</p>
                    <p>Built for recruiters who value fairness.</p>
                </div>
            </footer>
        </div>
    );
}
