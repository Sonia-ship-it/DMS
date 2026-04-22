import { useState, useEffect } from 'react';
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
import { Search, UserPlus, Mail, Phone, Trash2, Edit, User, ShieldAlert, Users } from 'lucide-react';
import { apiFetch } from '@/lib/api';
import { toast } from 'sonner';
import { StaffModal } from '@/components/discipline/StaffModal';
import { DeleteConfirmationModal } from '@/components/discipline/DeleteConfirmationModal';

interface StaffMember {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: string;
    status: string;
}

export default function StaffList() {
    const [staff, setStaff] = useState<StaffMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
    const [staffToDelete, setStaffToDelete] = useState<number | null>(null);

    useEffect(() => {
        fetchStaff();
    }, []);

    const fetchStaff = async () => {
        setLoading(true);
        try {
            const data = await apiFetch('/staff');
            setStaff(data?.length > 0 ? data : [
                { id: 1, firstName: 'Sandrine', lastName: 'Utuje', email: 'sandrine@rca.ac.rw', phoneNumber: '+250 788 000 111', role: 'ADMIN', status: 'ACTIVE' },
                { id: 2, firstName: 'Sonia', lastName: 'Mubarak', email: 'sonia@rca.ac.rw', phoneNumber: '+250 788 222 333', role: 'SECURITY', status: 'ACTIVE' },
            ]);
        } catch (error) {
            console.error('Error fetching staff:', error);
            toast.error('Failed to load staff list');
        } finally {
            setLoading(false);
        }
    };

    const handleNew = () => {
        setSelectedStaff(null);
        setModalOpen(true);
    };

    const handleEdit = (member: StaffMember) => {
        setSelectedStaff(member);
        setModalOpen(true);
    };

    const handleDelete = (id: number) => {
        setStaffToDelete(id);
        setDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!staffToDelete) return;
        try {
            await apiFetch(`/staff/${staffToDelete}`, { method: 'DELETE' });
            toast.success('Staff member removed');
            fetchStaff();
        } catch (error) {
            toast.error('Failed to remove staff');
        } finally {
            setDeleteModalOpen(false);
            setStaffToDelete(null);
        }
    };

    const filtered = staff.filter(s =>
        `${s.firstName} ${s.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase())
    );

    const activeCount = staff.filter(s => s.status === 'ACTIVE').length;
    const securityCount = staff.filter(s => s.role === 'SECURITY').length;
    const adminCount = staff.filter(s => s.role === 'ADMIN').length;

    const getAvatarColor = (name: string) => {
        const colors = ['bg-[#0A0E2E]', 'bg-[#1E2A8A]', 'bg-[#2D3DB5]'];
        const index = name.length % colors.length;
        return colors[index];
    };

    return (
        <div className="min-h-screen bg-white text-[#0A0E2E]">
            <AppHeader title="Staff Management" />

            <div className="mx-auto max-w-7xl px-6 py-8 animate-in fade-in duration-700">
                <div className="mb-6 rounded-3xl border border-[#0A0E2E]/15 bg-white p-6 shadow-sm">
                    <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-[#0A0E2E]">Staff List</h2>
                            <p className="text-sm font-medium text-[#0A0E2E]/70">Administer and manage school staff members.</p>
                        </div>
                        <Button
                            onClick={handleNew}
                            className="rounded-xl bg-[#0A0E2E] text-white shadow-lg shadow-[#0A0E2E]/20 hover:bg-[#0A0E2E]/95"
                        >
                            <UserPlus className="h-4 w-4 mr-2" /> New Staff
                        </Button>
                    </div>

                    <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        <div className="rounded-2xl border border-[#0A0E2E]/15 bg-white p-4">
                            <div className="mb-2 inline-flex rounded-lg bg-[#0A0E2E] p-2 text-white"><Users className="h-4 w-4" /></div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-[#0A0E2E]/65">Total Staff</p>
                            <p className="text-2xl font-extrabold text-[#0A0E2E]">{staff.length}</p>
                        </div>
                        <div className="rounded-2xl border border-[#0A0E2E]/15 bg-white p-4">
                            <div className="mb-2 inline-flex rounded-lg bg-[#0A0E2E] p-2 text-white"><User className="h-4 w-4" /></div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-[#0A0E2E]/65">Active Personnel</p>
                            <p className="text-2xl font-extrabold text-[#0A0E2E]">{activeCount}</p>
                        </div>
                        <div className="rounded-2xl border border-[#0A0E2E]/15 bg-white p-4">
                            <div className="mb-2 inline-flex rounded-lg bg-[#0A0E2E] p-2 text-white"><ShieldAlert className="h-4 w-4" /></div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-[#0A0E2E]/65">Security Team</p>
                            <p className="text-2xl font-extrabold text-[#0A0E2E]">{securityCount}</p>
                        </div>
                        <div className="rounded-2xl border border-[#0A0E2E]/15 bg-white p-4">
                            <div className="mb-2 inline-flex rounded-lg bg-[#0A0E2E] p-2 text-white"><UserPlus className="h-4 w-4" /></div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-[#0A0E2E]/65">Administrative</p>
                            <p className="text-2xl font-extrabold text-[#0A0E2E]">{adminCount}</p>
                        </div>
                    </div>

                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0A0E2E]/50" />
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by name or email..."
                                className="w-full rounded-xl border border-[#0A0E2E]/15 bg-white py-2.5 pl-10 pr-4 text-sm font-medium outline-none transition-all focus:ring-2 focus:ring-[#0A0E2E]/15"
                            />
                        </div>
                    </div>
                </div>

                <div className="overflow-hidden rounded-3xl border border-[#0A0E2E]/15 bg-white shadow-xl shadow-[#0A0E2E]/5">
                    {loading ? (
                        <div className="p-20 text-center space-y-4">
                            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#0A0E2E] border-t-transparent" />
                            <p className="animate-pulse font-medium text-[#0A0E2E]/70">Synchronizing Personnel Data...</p>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader className="border-b border-[#0A0E2E]/10 bg-[#0A0E2E]/5">
                                <TableRow className="hover:bg-transparent border-none">
                                    <TableHead className="px-6 py-5 font-bold text-[#0A0E2E]/80 uppercase text-[10px] tracking-widest">Name</TableHead>
                                    <TableHead className="font-bold text-[#0A0E2E]/80 uppercase text-[10px] tracking-widest">Contact Info</TableHead>
                                    <TableHead className="font-bold text-[#0A0E2E]/80 uppercase text-[10px] tracking-widest">Role</TableHead>
                                    <TableHead className="font-bold text-[#0A0E2E]/80 uppercase text-[10px] tracking-widest">Status</TableHead>
                                    <TableHead className="text-right font-bold text-[#0A0E2E]/80 uppercase text-[10px] tracking-widest">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filtered.map((person) => (
                                    <TableRow key={person.id} className="group border-[#0A0E2E]/10 transition-colors hover:bg-[#0A0E2E]/5">
                                        <TableCell className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className={`flex h-10 w-10 items-center justify-center rounded-xl text-white font-bold shadow-lg ${getAvatarColor(person.firstName)}`}>
                                                    {person.firstName[0]}{person.lastName[0]}
                                                </div>
                                                <div>
                                                    <p className="text-[14px] font-bold text-[#0A0E2E] transition-colors">{person.firstName} {person.lastName}</p>
                                                    <p className="flex items-center gap-1 text-[11px] font-medium text-[#0A0E2E]/60">
                                                        <User className="h-3 w-3" /> SID-{person.id.toString().padStart(4, '0')}
                                                    </p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 text-[11px] font-medium text-[#0A0E2E]/75">
                                                    <Mail className="h-3 w-3 text-[#0A0E2E]" /> {person.email}
                                                </div>
                                                <div className="flex items-center gap-2 text-[11px] font-medium text-[#0A0E2E]/75">
                                                    <Phone className="h-3 w-3 text-[#0A0E2E]" /> {person.phoneNumber}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0A0E2E] text-white">
                                                    <ShieldAlert className="h-4 w-4" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-[#0A0E2E]">{person.role}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <StatusBadge status={person.status} className="border-[#0A0E2E] bg-[#0A0E2E] text-white" />
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleEdit(person)}
                                                    className="h-8 w-8 rounded-xl text-[#0A0E2E]/70 hover:bg-[#0A0E2E] hover:text-white"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <button
                                                    onClick={() => handleDelete(person.id)}
                                                    className="group/del flex h-8 w-8 items-center justify-center rounded-xl hover:bg-[#0A0E2E]"
                                                >
                                                    <Trash2 className="h-4 w-4 text-[#0A0E2E]/70 group-hover/del:text-white" />
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

            <StaffModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSuccess={fetchStaff}
                staffMember={selectedStaff}
            />

            <DeleteConfirmationModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Remove Staff Member"
                description="Are you sure you want to remove this staff member from the system? This will revoke their access immediately."
                confirmLabel="Remove Staff"
            />
        </div>
    );
}
