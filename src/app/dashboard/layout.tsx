'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Briefcase, Users, Search, Settings, Sparkles, Moon, Bell, Plus } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const navItems = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Jobs', href: '/dashboard/jobs', icon: Briefcase },
        { name: 'Candidates', href: '/dashboard/candidates', icon: Users },
        { name: 'Screenings', href: '/dashboard/screenings', icon: Sparkles },
        { name: 'Settings', href: '/dashboard/settings', icon: Settings },
    ];

    return (
        <div className="flex h-screen bg-[#f7f9fc]">
            {/* Sidebar */}
            <div className="w-64 bg-[#0a0f24] text-white flex flex-col">
                <div className="p-6">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded border-2 border-blue-500 flex items-center justify-center rotate-45">
                            <div className="w-2 h-2 bg-blue-500 rounded-sm"></div>
                        </div>
                        <span className="text-xl font-bold">Intore</span>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || (item.name === 'Jobs' && pathname.startsWith('/dashboard/job'));
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${isActive ? 'bg-[#1e2646] text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-semibold text-sm">
                            CU
                        </div>
                        <div>
                            <div className="text-sm font-medium text-white">Claudine U.</div>
                            <div className="text-xs text-slate-400">claudine@intore.rw</div>
                        </div>
                    </div>
                    <Link href="/" className="text-xs text-slate-400 hover:text-white pl-12 transition-colors">
                        Back to home
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header */}
                <header className="h-16 bg-[#0a0f24] border-b border-white/5 flex items-center justify-between px-8 text-white shrink-0">
                    <h1 className="text-xl font-semibold">
                        {pathname === '/dashboard' ? 'Dashboard' : pathname.includes('/jobs') ? 'Jobs' : 'Dashboard'}
                    </h1>
                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 bg-[#1e2646] hover:bg-[#2a345a] text-white px-4 py-2 rounded-md text-sm transition-colors border border-white/10">
                            <Plus className="w-4 h-4" />
                            Post a job
                        </button>
                        <div className="relative">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search jobs..."
                                className="bg-[#1e2646] text-sm text-white placeholder-slate-400 rounded-md pl-9 pr-4 py-2 border border-white/10 focus:outline-none focus:border-blue-500 w-64"
                            />
                        </div>
                        <button className="text-slate-400 hover:text-white transition-colors">
                            <Moon className="w-5 h-5" />
                        </button>
                        <button className="text-slate-400 hover:text-white transition-colors relative">
                            <Bell className="w-5 h-5" />
                            <div className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full border border-[#0a0f24]"></div>
                        </button>
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-semibold text-sm ml-2">
                            CU
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-auto bg-[#f7f9fc]">
                    {children}
                </main>
            </div>
        </div>
    );
}
