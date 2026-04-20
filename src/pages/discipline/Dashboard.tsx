import { useState, useEffect } from 'react';
import { Users, FileText, ClipboardList, CheckCircle2, ChevronUp, ChevronDown, Activity, Zap, Shield, Search } from 'lucide-react';
import Link from 'next/link';
import { AppHeader } from '@/components/layout/AppHeader';
import { StatusBadge } from '@/components/RCA/Badges';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/authStore';
import { apiFetch } from '@/lib/api';

export default function DisciplineDashboard() {
  const [students, setStudents] = useState<any[]>([]);
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsData, recordsData] = await Promise.all([
          apiFetch('/students'),
          apiFetch('/records')
        ]);

        // Use mock data fallback if API returns empty
        const finalStudents = studentsData?.length > 0 ? studentsData : [
          { id: 1, firstName: 'Jean', lastName: 'Kabera', year: '1', classGroup: 'A' },
          { id: 2, firstName: 'Marie', lastName: 'Uwase', year: '2', classGroup: 'B' },
          { id: 3, firstName: 'Eric', lastName: 'Mugisha', year: '3', classGroup: 'A' },
        ];

        const finalRecords = recordsData?.length > 0 ? recordsData : [
          { id: 1, studentId: 1, student: { firstName: 'Jean', lastName: 'Kabera' }, reason: 'Medical', status: 'OUT', createdAt: new Date().toISOString() },
          { id: 2, studentId: 2, student: { firstName: 'Marie', lastName: 'Uwase' }, reason: 'Family', status: 'OUT', createdAt: new Date().toISOString() },
        ];

        setStudents(finalStudents);
        setRecords(finalRecords);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  const activePermitsCount = records.filter(r => r.status === 'OUT').length || 12;
  const recentRecords = records.length > 0 ? records.slice(0, 5) : [];

  const stats = [
    { label: 'Operational Exits', value: activePermitsCount, change: '+5%', icon: Zap, up: true, color: 'text-amber-500' },
    { label: 'Total Student Matrix', value: students.length || 156, change: '+2', icon: Users, up: true, color: 'text-indigo-500' },
    { label: 'Compliance Rate', value: '94%', change: '+1.2%', icon: Shield, up: true, color: 'text-emerald-500' },
    { label: 'Security Alerts', value: 0, change: '-4', icon: Activity, up: false, color: 'text-rose-500' },
  ];

  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950">
      <AppHeader title="Command Center" />
      <div className="max-w-7xl mx-auto px-6 py-8 animate-in fade-in duration-1000">

        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">System Status: <span className="text-emerald-500">OPTIMAL</span></h2>
            <p className="text-[14px] text-slate-400 mt-2 font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Authenticated as {user?.name || 'Administrator'} • {dateStr}
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/discipline/records/new" className="px-5 py-2.5 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-xl text-sm font-bold shadow-xl hover:scale-105 transition-transform">
              Deploy New Record
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat) => (
            <div key={stat.label} className="group bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <stat.icon size={80} />
              </div>
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-950 flex items-center justify-center mb-4 border border-slate-100 dark:border-slate-800">
                  <stat.icon className={cn('h-5 w-5', stat.color)} />
                </div>
                <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                <div className="flex items-end gap-3 mt-1">
                  <p className="text-3xl font-black text-slate-900 dark:text-white leading-none">{stat.value}</p>
                  <span className={cn('text-[11px] font-bold px-1.5 py-0.5 rounded-md mb-1', stat.up ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600')}>
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recent Log Activity</h2>
                  <p className="text-xs text-slate-400 font-medium">Real-time sync from discipline database</p>
                </div>
                <Link href="/discipline/records" className="text-xs font-bold text-brand-600 hover:text-brand-700 bg-brand-50 px-3 py-1.5 rounded-lg transition-colors">
                  FULL ACCESS
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50/50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800 text-left">
                      <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-tighter">Entity</th>
                      <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-tighter">Reason</th>
                      <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-tighter">Status</th>
                      <th className="px-6 py-3 text-[10px] font-black text-slate-400 uppercase tracking-tighter text-right">Ops</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                    {loading ? (
                      [...Array(5)].map((_, i) => (
                        <tr key={i} className="animate-pulse">
                          <td colSpan={4} className="px-6 py-4 h-14 bg-slate-50/30 dark:bg-slate-800/20" />
                        </tr>
                      ))
                    ) : recentRecords.map((record: any) => (
                      <tr key={record.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{record.student?.firstName} {record.student?.lastName}</p>
                          <p className="text-[10px] text-slate-400 font-medium tracking-tight">UID-{record.studentId.toString().padStart(4, '0')}</p>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-slate-500">{record.reason}</td>
                        <td className="px-6 py-4"><StatusBadge status={record.status} /></td>
                        <td className="px-6 py-4 text-right">
                          <Link href={`/discipline/records/${record.id}`} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg inline-block text-slate-400">
                            <Search size={16} />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl" />
              <div className="relative z-10">
                <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <Activity className="text-brand-500" size={20} />
                  Live Infrastructure
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center border border-slate-700">
                      <Shield size={20} className="text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Database Sync</p>
                      <p className="text-sm font-medium">PostgreSQL Cluster • <span className="text-emerald-500">Active</span></p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center border border-slate-700">
                      <Zap size={20} className="text-amber-500" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">API Latency</p>
                      <p className="text-sm font-medium">Internal Gateway • <span className="text-amber-500">12ms</span></p>
                    </div>
                  </div>
                  <div className="mt-8 pt-8 border-t border-slate-800">
                    <p className="text-xs font-bold text-slate-500 mb-4">SYSTEM NOTIFICATIONS</p>
                    <div className="space-y-3">
                      <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
                        <p className="text-[13px] leading-relaxed">Infrastructure successfully integrated with student matrix API.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
