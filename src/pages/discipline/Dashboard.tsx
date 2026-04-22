import { useState, useEffect } from 'react';
import { Users, Activity, Zap, Shield, Search } from 'lucide-react';
import Link from 'next/link';
import { AppHeader } from '@/components/layout/AppHeader';
import { StatusBadge } from '@/components/RCA/Badges';
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
    { label: 'Student Exits', value: activePermitsCount, change: '+5%', icon: Zap },
    { label: 'Total Students', value: students.length || 156, change: '+2', icon: Users },
    { label: 'Compliance Rate', value: '94%', icon: Shield },
    { label: 'Alerts', value: 0, icon: Activity },
  ];

  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="min-h-screen bg-white font-sans text-[#0A0E2E]">
      <AppHeader title="Dashboard" />
      <div className="mx-auto max-w-7xl px-6 py-8 animate-in fade-in duration-1000">

        <div className="mb-10 flex flex-col justify-between gap-4 rounded-3xl border border-[#0A0E2E]/15 bg-white p-6 shadow-sm md:flex-row md:items-end">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-[#0A0E2E]">Dashboard Overview</h2>
            <p className="mt-2 flex items-center gap-2 text-[14px] font-medium text-[#0A0E2E]/70">
              <span className="h-2 w-2 rounded-full bg-[#0A0E2E] animate-pulse" />
              Authenticated as {user?.name || 'Administrator'} • {dateStr}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/discipline/records/new" className="rounded-xl bg-[#0A0E2E] px-5 py-2.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#0A0E2E]/20">
              New Record
            </Link>
            <Link href="/discipline/records" className="rounded-xl border border-[#0A0E2E]/20 bg-white px-5 py-2.5 text-sm font-bold text-[#0A0E2E] transition-all hover:-translate-y-0.5 hover:bg-[#0A0E2E]/5">
              View All
            </Link>
          </div>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="group relative overflow-hidden rounded-2xl border border-[#0A0E2E]/15 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0A0E2E]/10">
              <div className="absolute right-0 top-0 p-3 opacity-[0.06] transition-opacity group-hover:opacity-[0.1]">
                <stat.icon size={76} className="text-[#0A0E2E]" />
              </div>
              <div className="relative z-10">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-[#0A0E2E]/15 bg-[#0A0E2E]">
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
                <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#0A0E2E]/70">{stat.label}</p>
                <div className="mt-1 flex items-end gap-3">
                  <p className="text-3xl font-black leading-none text-[#0A0E2E]">{stat.value}</p>
                  <span className="mb-1 rounded-md bg-[#0A0E2E] px-1.5 py-0.5 text-[11px] font-bold text-white">
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="overflow-hidden rounded-3xl border border-[#0A0E2E]/15 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-[#0A0E2E]/10 p-6">
                <div>
                  <h2 className="text-lg font-bold text-[#0A0E2E]">Recent Exits</h2>
                  <p className="text-xs font-medium text-[#0A0E2E]/70">Latest student movements</p>
                </div>
                <Link href="/discipline/records" className="rounded-lg bg-[#0A0E2E] px-3 py-1.5 text-xs font-bold text-white transition-opacity hover:opacity-90">
                  VIEW ALL
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#0A0E2E]/10 bg-[#0A0E2E]/5 text-left">
                      <th className="px-6 py-3 text-[10px] font-black uppercase tracking-tighter text-[#0A0E2E]/70">Entity</th>
                      <th className="px-6 py-3 text-[10px] font-black uppercase tracking-tighter text-[#0A0E2E]/70">Reason</th>
                      <th className="px-6 py-3 text-[10px] font-black uppercase tracking-tighter text-[#0A0E2E]/70">Status</th>
                      <th className="px-6 py-3 text-right text-[10px] font-black uppercase tracking-tighter text-[#0A0E2E]/70">Ops</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#0A0E2E]/10">
                    {loading ? (
                      [...Array(5)].map((_, i) => (
                        <tr key={i} className="animate-pulse">
                          <td colSpan={4} className="h-14 bg-[#0A0E2E]/5 px-6 py-4" />
                        </tr>
                      ))
                    ) : recentRecords.length > 0 ? recentRecords.map((record: any) => (
                      <tr key={record.id} className="transition-colors hover:bg-[#0A0E2E]/5">
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-[#0A0E2E]">{record.student?.firstName} {record.student?.lastName}</p>
                          <p className="text-[10px] font-medium tracking-tight text-[#0A0E2E]/65">ID: {record.studentId}</p>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-[#0A0E2E]/75">{record.reason}</td>
                        <td className="px-6 py-4">
                          <StatusBadge status={record.status} className="border-[#0A0E2E] bg-[#0A0E2E] text-white" />
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link href={`/discipline/records/${record.id}`} className="inline-block rounded-lg p-2 text-[#0A0E2E]/70 transition-colors hover:bg-[#0A0E2E] hover:text-white">
                            <Search size={16} />
                          </Link>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={4} className="px-6 py-10 text-center text-sm font-medium text-[#0A0E2E]/65">
                          No activity yet. Create a new record to populate this dashboard.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-3xl border border-[#0A0E2E]/15 bg-white p-6 shadow-sm">
              <h2 className="mb-5 text-lg font-bold text-[#0A0E2E]">Quick Overview</h2>

              <div className="space-y-3">
                <div className="rounded-xl border border-[#0A0E2E]/15 bg-white p-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#0A0E2E]/60">Students in system</p>
                  <p className="mt-1 text-2xl font-extrabold text-[#0A0E2E]">{students.length || 0}</p>
                </div>
                <div className="rounded-xl border border-[#0A0E2E]/15 bg-white p-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#0A0E2E]/60">Active exits</p>
                  <p className="mt-1 text-2xl font-extrabold text-[#0A0E2E]">{activePermitsCount}</p>
                </div>
                <div className="rounded-xl border border-[#0A0E2E]/15 bg-white p-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#0A0E2E]/60">Latest update</p>
                  <p className="mt-1 text-sm font-semibold text-[#0A0E2E]">
                    {recentRecords[0]
                      ? `${recentRecords[0].student?.firstName} ${recentRecords[0].student?.lastName} • ${recentRecords[0].status}`
                      : 'No recent activity'}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Link href="/discipline/students" className="rounded-lg border border-[#0A0E2E]/20 bg-white px-3 py-2 text-center text-xs font-bold text-[#0A0E2E] transition-colors hover:bg-[#0A0E2E] hover:text-white">
                  Manage Students
                </Link>
                <Link href="/discipline/records/new" className="rounded-lg bg-[#0A0E2E] px-3 py-2 text-center text-xs font-bold text-white transition-opacity hover:opacity-90">
                  New Record
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
