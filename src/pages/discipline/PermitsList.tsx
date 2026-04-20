import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AppHeader } from '@/components/layout/AppHeader';
import { StatusBadge } from '@/components/RCA/Badges';
import { ClipboardList, ExternalLink, Search, Clock, ShieldCheck, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { apiFetch } from '@/lib/api';

export default function PermitsList() {
  const [permits, setPermits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPermits = async () => {
      try {
        const data = await apiFetch('/records');
        const active = data?.length > 0 ? data.filter((r: any) => r.status === 'OUT') : [
          { id: 1, studentId: 101, reason: 'Medical Checkup', status: 'OUT', outDate: new Date().toISOString(), student: { firstName: 'Jean', lastName: 'Kabera' } },
          { id: 3, studentId: 103, reason: 'Holiday', status: 'OUT', outDate: new Date().toISOString(), student: { firstName: 'Eric', lastName: 'Mugisha' } },
        ];
        setPermits(active);
      } catch (error) {
        console.error('Error fetching permits:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPermits();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950">
      <AppHeader title="Live Permits Matrix" />
      <div className="max-w-7xl mx-auto px-6 py-8 animate-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-brand-600 p-3 rounded-2xl shadow-lg shadow-brand-500/20">
              <ClipboardList className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Live Exit Permits</h2>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-0.5">Real-time monitoring of students outside campus</p>
            </div>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-900/20 px-4 py-2 rounded-xl border border-emerald-100 dark:border-emerald-800 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="text-[11px] font-black text-emerald-700 dark:text-emerald-400 uppercase">{permits.length} ACTIVE AUTHORIZATIONS</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  {['Operational Entity', 'Exit Mission', 'Departure Slot', 'Staff Entity', 'Status', 'Details'].map((h) => (
                    <th key={h} className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {loading ? (
                  [...Array(3)].map((_, i) => (
                    <tr key={i} className="animate-pulse h-16 bg-slate-50/20" />
                  ))
                ) : permits.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-20 text-center">
                      <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">No active permits detected in segment</p>
                    </td>
                  </tr>
                ) : permits.map((permit) => (
                  <tr key={permit.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                          <User size={14} className="text-slate-400" />
                        </div>
                        <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">
                          {permit.student?.firstName} {permit.student?.lastName}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-xs font-bold text-brand-600 bg-brand-50 dark:bg-brand-900/20 px-2.5 py-1 rounded-lg border border-brand-100 dark:border-brand-800">
                        {permit.reason}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-slate-500">
                        <Clock size={14} />
                        <span className="text-xs font-bold">{formatDate(permit.outDate)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-xs font-black text-slate-600 dark:text-slate-400 uppercase tracking-tighter">Segment Admin</p>
                    </td>
                    <td className="px-6 py-5">
                      <StatusBadge status={permit.status} />
                    </td>
                    <td className="px-6 py-5">
                      <Link href={`/discipline/records/${permit.id}`}>
                        <Button variant="ghost" size="sm" className="rounded-xl border border-slate-100 dark:border-slate-800 group-hover:bg-white dark:group-hover:bg-slate-900 group-hover:shadow-sm font-bold text-[10px] uppercase tracking-widest text-slate-400 hover:text-brand-600 transition-all">
                          ANALYSIS <ExternalLink className="ml-2 h-3 w-3" />
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
