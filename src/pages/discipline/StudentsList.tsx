import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AppHeader } from '@/components/layout/AppHeader';
import { Avatar } from '@/components/RCA/Avatar';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/RCA/Badges';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Filter, History, MoreHorizontal, User, Phone, MapPin, Trash2 } from 'lucide-react';
import { apiFetch } from '@/lib/api';
import { toast } from 'sonner';
import { NewStudentModal } from '@/components/discipline/NewStudentModal';

interface StudentBackend {
  id: number;
  firstName: string;
  lastName: string;
  fatherName: string;
  motherName: string;
  fatherPhoneNumber: string;
  motherPhoneNumber: string;
  year: string;
  classGroup: string;
  status: string;
  records: any[];
}

export default function StudentsList() {
  const router = useRouter();
  const [students, setStudents] = useState<StudentBackend[]>([]);
  const [loading, setLoading] = useState(true);
  const [classFilter, setClassFilter] = useState('All');
  const [searchFilter, setSearchFilter] = useState('');

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const data = await apiFetch('/students');
      const finalData = data?.length > 0 ? data : [
        { id: 101, firstName: 'Jean', lastName: 'Kabera', fatherName: 'Peter Kabera', motherName: 'Alice Kabera', fatherPhoneNumber: '+250 788 123 456', motherPhoneNumber: '+250 788 654 321', year: '1', classGroup: 'A', status: 'IN', records: [] },
        { id: 102, firstName: 'Marie', lastName: 'Uwase', fatherName: 'John Uwase', motherName: 'Jane Uwase', fatherPhoneNumber: '+250 788 111 222', motherPhoneNumber: '+250 788 333 444', year: '2', classGroup: 'B', status: 'OUT', records: [{}, {}] },
        { id: 103, firstName: 'Eric', lastName: 'Mugisha', fatherName: 'Paul Mugisha', motherName: 'Sarah Mugisha', fatherPhoneNumber: '+250 788 777 888', motherPhoneNumber: '+250 788 999 000', year: '3', classGroup: 'A', status: 'IN', records: [{}] },
      ];
      setStudents(finalData);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);


  const filtered = students.filter((s) => {
    const className = `${s.year} ${s.classGroup}`;
    const fullName = `${s.firstName} ${s.lastName}`.toLowerCase();

    if (classFilter !== 'All' && className !== classFilter) return false;
    if (searchFilter && !fullName.includes(searchFilter.toLowerCase())) return false;
    return true;
  });

  const classes = Array.from(new Set(students.map(s => `${s.year} ${s.classGroup}`)));

  const getAvatarColor = (name: string) => {
    const colors = ['bg-indigo-600', 'bg-emerald-600', 'bg-amber-600', 'bg-rose-600', 'bg-violet-600', 'bg-sky-600'];
    const index = name.length % colors.length;
    return colors[index];
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Permanently revoke this student identity from the active registry?')) return;
    try {
      await apiFetch(`/students/${id}`, { method: 'DELETE' });
      toast.success('Identity purged from matrix');
      setStudents(prev => prev.filter(s => s.id !== id));
    } catch (error) {
      toast.error('Uplink failed: Could not purge identity');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950">
      <AppHeader title="Student Intelligence Terminal" />

      <div className="max-w-7xl mx-auto px-6 py-8 animate-in fade-in duration-700">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 backdrop-blur-xl bg-opacity-80">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    placeholder="Search by student name..."
                    className="w-full bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-500/20 transition-all font-medium"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                    <Filter className="w-4 h-4 text-slate-400" />
                    <select
                      value={classFilter}
                      onChange={(e) => setClassFilter(e.target.value)}
                      className="bg-transparent text-sm font-semibold outline-none min-w-[120px]"
                    >
                      <option value="All">All Classes</option>
                      {classes.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  <Button
                    onClick={() => setIsModalOpen(true)}
                    className="rounded-xl bg-brand-600 hover:bg-brand-700 text-white shadow-lg shadow-brand-500/20"
                  >
                    New Student
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-brand-600 to-indigo-700 rounded-2xl p-6 text-white shadow-xl shadow-brand-500/20 flex flex-col justify-between">
            <div>
              <p className="text-brand-100 text-xs font-bold uppercase tracking-wider mb-1">Active Students</p>
              <h3 className="text-3xl font-bold">{students.length}</h3>
            </div>
            <div className="flex -space-x-2 mt-4 overflow-hidden">
              {students.slice(0, 4).map((s, i) => (
                <div key={i} className={`w-8 h-8 rounded-full border-2 border-brand-600 flex items-center justify-center text-[10px] font-bold ${getAvatarColor(s.firstName)}`}>
                  {s.firstName[0]}{s.lastName[0]}
                </div>
              ))}
              {students.length > 4 && (
                <div className="w-8 h-8 rounded-full border-2 border-brand-600 bg-slate-800 flex items-center justify-center text-[10px] font-bold">
                  +{students.length - 4}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 overflow-hidden">
          {loading ? (
            <div className="p-20 text-center space-y-4">
              <div className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-slate-500 font-medium animate-pulse">Initializing Terminal...</p>
            </div>
          ) : (
            <Table>
              <TableHeader className="bg-slate-50/50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800">
                <TableRow className="hover:bg-transparent border-none">
                  <TableHead className="py-5 px-6 font-bold text-slate-800 dark:text-slate-200">Student Identity</TableHead>
                  <TableHead className="font-bold text-slate-800 dark:text-slate-200">Class Matrix</TableHead>
                  <TableHead className="font-bold text-slate-800 dark:text-slate-200">Guardian Details</TableHead>
                  <TableHead className="font-bold text-slate-800 dark:text-slate-200 text-center">Engagement</TableHead>
                  <TableHead className="font-bold text-slate-800 dark:text-slate-200">Current Status</TableHead>
                  <TableHead className="font-bold text-slate-800 dark:text-slate-200 text-right">Operational Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((s) => (
                  <TableRow key={s.id} className="group hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors border-slate-100 dark:border-slate-800">
                    <TableCell className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-lg ${getAvatarColor(s.firstName)}`}>
                          {s.firstName[0]}{s.lastName[0]}
                        </div>
                        <div>
                          <p className="font-bold text-[14px] text-slate-900 dark:text-slate-100 group-hover:text-brand-600 transition-colors">{s.firstName} {s.lastName}</p>
                          <p className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                            <User className="w-3 h-3" /> UID-{s.id.toString().padStart(4, '0')}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{s.year}</p>
                          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-tighter">Level {s.classGroup}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{s.fatherName || s.motherName}</p>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                          <Phone className="w-3 h-3 text-brand-500" />
                          {s.fatherPhoneNumber || s.motherPhoneNumber}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <button
                        onClick={() => router.push(`/discipline/records?studentId=${s.id}`)}
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-50 dark:bg-slate-800 hover:bg-brand-50 dark:hover:bg-brand-900/20 text-slate-600 dark:text-slate-400 hover:text-brand-600 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-brand-200 transition-all text-[11px] font-bold"
                      >
                        <History className="w-3.5 h-3.5" />
                        {s.records?.length || 0} LOGS
                      </button>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={s.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400">
                          <History className="w-4 h-4" />
                        </Button>
                        <button
                          onClick={() => handleDelete(s.id)}
                          className="h-8 w-8 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-900/20 flex items-center justify-center group/del"
                        >
                          <History className="w-4 h-4 text-slate-400 group-hover/del:text-rose-500" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
      <NewStudentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchStudents}
      />
    </div>
  );
}
