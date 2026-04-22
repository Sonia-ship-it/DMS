import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AppHeader } from '@/components/layout/AppHeader';
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
import { Search, Filter, History, User, MapPin, Trash2, Users, UserCheck, AlertTriangle, Layers3, Pencil, Phone } from 'lucide-react';
import { apiFetch } from '@/lib/api';
import { toast } from 'sonner';
import { NewStudentModal } from '@/components/discipline/NewStudentModal';
import { DeleteConfirmationModal } from '@/components/discipline/DeleteConfirmationModal';

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
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState<StudentBackend | null>(null);

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

  const filtered = students.filter((s) => {
    const className = `Year ${s.year} ${s.classGroup}`;
    const fullName = `${s.firstName} ${s.lastName}`.toLowerCase();

    if (classFilter !== 'All' && className !== classFilter) return false;
    if (searchFilter && !fullName.includes(searchFilter.toLowerCase())) return false;
    return true;
  });

  const classes = Array.from(new Set(students.map(s => `Year ${s.year} ${s.classGroup}`)));
  const inCampusCount = students.filter((s) => s.status === 'IN').length;
  const outsideCount = students.filter((s) => s.status === 'OUT').length;
  const filteredCount = filtered.length;

  const getAvatarColor = (name: string) => {
    const colors = ['bg-[#0A0E2E]', 'bg-[#1a264a]', 'bg-[#0F1547]'];
    const index = name.length % colors.length;
    return colors[index];
  };

  const handleEdit = (student: StudentBackend) => {
    setStudentToEdit(student);
    setIsModalOpen(true);
  };

  const handleNew = () => {
    setStudentToEdit(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    setStudentToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!studentToDelete) return;
    try {
      await apiFetch(`/students/${studentToDelete}`, { method: 'DELETE' });
      toast.success('Student deleted successfully');
      setStudents(prev => prev.filter(s => s.id !== studentToDelete));
    } catch (error) {
      toast.error('Failed to delete student');
    } finally {
      setDeleteModalOpen(false);
      setStudentToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#0A0E2E]">
      <AppHeader title="Students List" />

      <div className="mx-auto max-w-7xl px-6 py-8 animate-in fade-in duration-700">
        <div className="mb-6 rounded-3xl border border-[#0A0E2E]/15 bg-white p-6 shadow-sm">
          <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#0A0E2E]">Students</h2>
              <p className="text-sm font-medium text-[#0A0E2E]/70">View and manage all students in the system.</p>
            </div>
            <Button
              onClick={handleNew}
              className="rounded-xl bg-[#0A0E2E] text-white shadow-lg shadow-[#0A0E2E]/20 hover:bg-[#1a264a] transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              New Student
            </Button>
          </div>

          <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-[#0A0E2E]/15 bg-white p-4">
              <div className="mb-2 inline-flex rounded-lg bg-[#0A0E2E] p-2 text-white"><Users className="h-4 w-4" /></div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#0A0E2E]/65">Total Students</p>
              <p className="text-2xl font-extrabold text-[#0A0E2E]">{students.length}</p>
            </div>
            <div className="rounded-2xl border border-[#0A0E2E]/15 bg-white p-4">
              <div className="mb-2 inline-flex rounded-lg bg-[#0A0E2E] p-2 text-white"><UserCheck className="h-4 w-4" /></div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#0A0E2E]/65">In Campus</p>
              <p className="text-2xl font-extrabold text-[#0A0E2E]">{inCampusCount}</p>
            </div>
            <div className="rounded-2xl border border-[#0A0E2E]/15 bg-white p-4">
              <div className="mb-2 inline-flex rounded-lg bg-[#0A0E2E] p-2 text-white"><AlertTriangle className="h-4 w-4" /></div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#0A0E2E]/65">Out of Campus</p>
              <p className="text-2xl font-extrabold text-[#0A0E2E]">{outsideCount}</p>
            </div>
            <div className="rounded-2xl border border-[#0A0E2E]/15 bg-white p-4">
              <div className="mb-2 inline-flex rounded-lg bg-[#0A0E2E] p-2 text-white"><Layers3 className="h-4 w-4" /></div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#0A0E2E]/65">Visible Results</p>
              <p className="text-2xl font-extrabold text-[#0A0E2E]">{filteredCount}</p>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0A0E2E]/50" />
              <input
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search by student name..."
                className="w-full rounded-xl border border-[#0A0E2E]/15 bg-white py-2.5 pl-10 pr-4 text-sm font-medium outline-none transition-all focus:ring-2 focus:ring-[#0A0E2E]/15"
              />
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-[#0A0E2E]/15 bg-white px-3 py-2">
                <Filter className="h-4 w-4 text-[#0A0E2E]/50" />
                <select
                  value={classFilter}
                  onChange={(e) => setClassFilter(e.target.value)}
                  className="min-w-[120px] bg-transparent text-sm font-semibold text-[#0A0E2E] outline-none"
                >
                  <option value="All">All Classes</option>
                  {classes.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-[#0A0E2E]/15 bg-white shadow-xl shadow-[#0A0E2E]/5">
          {loading ? (
            <div className="p-20 text-center space-y-4">
              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#0A0E2E] border-t-transparent" />
              <p className="animate-pulse font-medium text-[#0A0E2E]/70">Loading Students...</p>
            </div>
          ) : (
            <Table>
              <TableHeader className="border-b border-[#0A0E2E]/10 bg-[#0A0E2E]/5">
                <TableRow className="hover:bg-transparent border-none">
                  <TableHead className="px-6 py-5 font-bold text-[#0A0E2E]/80">Student Name</TableHead>
                  <TableHead className="font-bold text-[#0A0E2E]/80">Class</TableHead>
                  <TableHead className="font-bold text-[#0A0E2E]/80">Parent Contact</TableHead>
                  <TableHead className="text-center font-bold text-[#0A0E2E]/80">Engagement</TableHead>
                  <TableHead className="font-bold text-[#0A0E2E]/80">Current Status</TableHead>
                  <TableHead className="text-right font-bold text-[#0A0E2E]/80">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((s) => (
                  <TableRow key={s.id} className="group border-[#0A0E2E]/10 transition-colors hover:bg-[#0A0E2E]/5">
                    <TableCell className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-xl text-white font-bold shadow-lg ${getAvatarColor(s.firstName)} transition-transform group-hover:scale-110`}>
                          {s.firstName[0]}{s.lastName[0]}
                        </div>
                        <div>
                          <p className="text-[14px] font-bold text-[#0A0E2E] transition-colors">{s.firstName} {s.lastName}</p>
                          <p className="flex items-center gap-1 text-[11px] font-medium text-[#0A0E2E]/60">
                            <User className="h-3 w-3" /> UID-{s.id.toString().padStart(4, '0')}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0A0E2E] text-white">
                          <MapPin className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#0A0E2E]">Year {s.year}</p>
                          <p className="text-[11px] font-bold uppercase tracking-tighter text-[#0A0E2E]/60">{s.classGroup}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-[#0A0E2E]">{s.fatherName || s.motherName}</p>
                        <div className="flex items-center gap-2 text-[11px] font-medium text-[#0A0E2E]/70">
                          <Phone className="h-3 w-3 text-[#0A0E2E]" />
                          {s.fatherPhoneNumber || s.motherPhoneNumber}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <button
                        onClick={() => router.push(`/discipline/records?studentId=${s.id}`)}
                        className="inline-flex items-center gap-2 rounded-lg border border-[#0A0E2E]/20 bg-white px-3 py-1.5 text-[11px] font-bold text-[#0A0E2E] transition-all hover:bg-[#0A0E2E] hover:text-white"
                      >
                        <History className="h-3.5 w-3.5" />
                        {s.records?.length || 0} LOGS
                      </button>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={s.status} className="border-[#0A0E2E] bg-[#0A0E2E] text-white" />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(s)}
                          className="flex h-8 w-8 items-center justify-center rounded-xl text-[#0A0E2E]/70 hover:bg-[#0A0E2E] hover:text-white transition-all hover:scale-110"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(s.id)}
                          className="group/del flex h-8 w-8 items-center justify-center rounded-xl text-[#0A0E2E]/70 hover:bg-[#0A0E2E] hover:text-white transition-all hover:scale-110"
                        >
                          <Trash2 className="h-4 w-4" />
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
        onClose={() => {
          setIsModalOpen(false);
          setStudentToEdit(null);
        }}
        onSuccess={fetchStudents}
        student={studentToEdit}
      />
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Student"
        description="Are you sure you want to delete this student from the records?"
      />
    </div>
  );
}
