import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AppHeader } from '@/components/layout/AppHeader';
import { StatusBadge } from '@/components/RCA/Badges';
import { ExternalLink, Clock, UserCheck, User } from 'lucide-react';
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
    <div className="min-h-screen bg-white text-[#0A0E2E]">
      <AppHeader title="Leave Permits" />
      <div className="mx-auto max-w-7xl px-6 py-8 animate-in slide-in-from-bottom-4 duration-500">
        <div className="mb-8 flex flex-col justify-between gap-4 rounded-3xl border border-[#0A0E2E]/15 bg-white p-6 shadow-sm md:flex-row md:items-center">
          <div>
            <h2 className="flex items-center gap-3 text-2xl font-bold text-[#0A0E2E]">
              Live Exit Permits
              <span className="rounded-full bg-[#0A0E2E] px-2 py-0.5 text-xs font-medium text-white">{permits.length} ACTIVE</span>
            </h2>
            <p className="mt-1 text-sm font-medium text-[#0A0E2E]/70">Real-time monitoring of students currently outside campus.</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-xl border border-[#0A0E2E]/20 bg-white px-4 py-2">
            <UserCheck className="h-4 w-4 text-[#0A0E2E]" />
            <span className="text-[11px] font-bold uppercase tracking-wide text-[#0A0E2E]">Authorized and tracked</span>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-[#0A0E2E]/15 bg-white shadow-xl shadow-[#0A0E2E]/5">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-[#0A0E2E]/10 bg-[#0A0E2E]/5">
                <tr>
                  {['Student Name', 'Reason', 'Exit Time', 'Approved By', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="px-6 py-5 text-[10px] font-bold uppercase tracking-widest text-[#0A0E2E]/70">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0A0E2E]/10">
                {loading ? (
                  [...Array(3)].map((_, i) => (
                    <tr key={i} className="h-16 animate-pulse bg-[#0A0E2E]/5" />
                  ))
                ) : permits.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-20 text-center">
                      <p className="text-[11px] font-medium text-[#0A0E2E]/65">No active permits at the moment.</p>
                    </td>
                  </tr>
                ) : permits.map((permit) => (
                  <tr key={permit.id} className="group transition-colors hover:bg-[#0A0E2E]/5">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0A0E2E]">
                          <User size={14} className="text-white" />
                        </div>
                        <p className="text-sm font-bold tracking-tight text-[#0A0E2E]">
                          {permit.student?.firstName} {permit.student?.lastName}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="rounded-lg border border-[#0A0E2E]/15 bg-white px-2.5 py-1 text-xs font-medium text-[#0A0E2E]/80">
                        {permit.reason}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-[#0A0E2E]/70">
                        <Clock size={14} />
                        <span className="text-xs font-bold">{formatDate(permit.outDate)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-xs font-bold text-[#0A0E2E]/70">
                        {permit.staff ? `${permit.staff.firstName} ${permit.staff.lastName}` : 'System Admin'}
                      </p>
                    </td>
                    <td className="px-6 py-5">
                      <StatusBadge status={permit.status} className="border-[#0A0E2E] bg-[#0A0E2E] text-white" />
                    </td>
                    <td className="px-6 py-5">
                      <Link href={`/discipline/records/${permit.id}`}>
                        <Button variant="ghost" size="sm" className="rounded-lg border border-[#0A0E2E]/20 bg-white text-[10px] font-bold uppercase tracking-widest text-[#0A0E2E] transition-all hover:bg-[#0A0E2E] hover:text-white">
                          DETAILS <ExternalLink className="ml-2 h-3 w-3" />
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
