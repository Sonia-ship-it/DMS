import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Plus, Search, Eye, FileText, Calendar, User, UserCheck } from 'lucide-react';
import { AppHeader } from '@/components/layout/AppHeader';
import { StatusBadge } from '@/components/RCA/Badges';
import { EmptyState } from '@/components/RCA/EmptyState';
import { Button } from '@/components/ui/button';
import { apiFetch } from '@/lib/api';

interface RecordBackend {
  id: number;
  studentId: number;
  reason: string;
  status: string;
  outDate: string;
  returnDate: string | null;
  student?: {
    firstName: string;
    lastName: string;
  };
}

export default function RecordsList() {
  const router = useRouter();
  const [records, setRecords] = useState<RecordBackend[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const data = await apiFetch('/records');
        const finalData = data?.length > 0 ? data : [
          { id: 1, studentId: 101, reason: 'Medical Checkup', status: 'OUT', outDate: new Date().toISOString(), returnDate: null, student: { firstName: 'Jean', lastName: 'Kabera' } },
          { id: 2, studentId: 102, reason: 'Family Emergency', status: 'RETURNED', outDate: new Date(Date.now() - 86400000).toISOString(), returnDate: new Date().toISOString(), student: { firstName: 'Marie', lastName: 'Uwase' } },
          { id: 3, studentId: 103, reason: 'Holiday', status: 'OUT', outDate: new Date().toISOString(), returnDate: null, student: { firstName: 'Eric', lastName: 'Mugisha' } },
        ];
        setRecords(finalData);
      } catch (error) {
        console.error('Error fetching records:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);


  const filtered = records.filter((r) => {
    const studentName = r.student ? `${r.student.firstName} ${r.student.lastName}`.toLowerCase() : '';
    if (search && !studentName.includes(search.toLowerCase())) return false;
    if (statusFilter !== 'All' && r.status !== statusFilter) return false;
    return true;
  });

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
      <AppHeader title="Discipline Operations" />
      <div className="max-w-7xl mx-auto px-6 py-8 animate-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              Operational Logs
              <span className="text-xs font-medium px-2 py-0.5 bg-brand-100 text-brand-700 rounded-full">{records.length} TOTAL</span>
            </h2>
            <p className="text-slate-400 text-sm mt-1 font-medium">Monitoring and managing active exits across the campus.</p>
          </div>
          <Button
            className="rounded-xl bg-brand-600 hover:bg-brand-700 shadow-lg shadow-brand-500/20"
            onClick={() => router.push('/discipline/records/new')}
          >
            <Plus className="h-4 w-4 mr-2" /> Record New Exit
          </Button>
        </div>

        <div className="flex flex-wrap gap-4 mb-8 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 px-4 py-2 flex-1 min-w-[240px]">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter by student name..."
              className="bg-transparent text-sm font-medium outline-none w-full placeholder:text-slate-400"
            />
          </div>
          <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 px-4 py-2">
            <UserCheck className="h-4 w-4 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-sm font-bold outline-none min-w-[120px]"
            >
              <option value="All">All Operational Status</option>
              <option value="OUT">Currently OUT</option>
              <option value="RETURNED">Successfully RETURNED</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="p-20 text-center space-y-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-slate-500 font-medium tracking-wide">Synchronizing logs...</p>
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="Log Matrix Empty"
            description="No matching records were found in the current operational scope."
            actionLabel="Initialize Record"
            onAction={() => router.push('/discipline/records/new')}
          />
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    {['Student Matrix', 'Reason for Exit', 'Time stamps', 'Status', 'Actions'].map((h) => (
                      <th key={h} className="px-6 py-5 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-widest">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filtered.map((record) => (
                    <tr key={record.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-xs">
                            {record.student?.firstName[0]}{record.student?.lastName[0]}
                          </div>
                          <Link href={`/discipline/records/${record.id}`} className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-brand-600 transition-colors underline-offset-4 decoration-brand-500/30">
                            {record.student ? `${record.student.firstName} ${record.student.lastName}` : 'Unknown Student'}
                          </Link>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 w-fit rounded-lg">
                          <FileText className="w-3.5 h-3.5 text-slate-400" />
                          <span className="text-[13px] font-medium text-slate-600 dark:text-slate-400">{record.reason}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <p className="text-[11px] font-bold flex items-center gap-1.5 text-slate-500">
                            <Calendar className="w-3 h-3" /> EXIT: {formatDate(record.outDate)}
                          </p>
                          {record.returnDate && (
                            <p className="text-[11px] font-bold flex items-center gap-1.5 text-emerald-500">
                              <UserCheck className="w-3 h-3" /> BACK: {formatDate(record.returnDate)}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={record.status} />
                      </td>
                      <td className="px-6 py-4">
                        <Link href={`/discipline/records/${record.id}`}>
                          <Button variant="ghost" size="sm" className="hover:bg-brand-50 hover:text-brand-600 rounded-lg font-bold text-xs uppercase tracking-tighter">
                            Analysis <Eye className="ml-2 h-3.5 w-3.5" />
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
