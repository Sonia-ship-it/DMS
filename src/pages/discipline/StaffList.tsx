import { useState, useEffect } from 'react';
import { AppHeader } from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Shield, Search, UserPlus, Mail, Phone, Trash2, Edit, Loader2 } from 'lucide-react';
import { apiFetch } from '@/lib/api';
import { toast } from 'sonner';

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

    useEffect(() => {
        fetchStaff();
    }, []);

    const fetchStaff = async () => {
        try {
            const data = await apiFetch('/staff');
            setStaff(data?.length > 0 ? data : [
                { id: 1, firstName: 'Sandrine', lastName: 'Utuje', email: 'sandrine@rca.ac.rw', phoneNumber: '+250 788 000 111', role: 'ADMIN', status: 'ACTIVE' },
                { id: 2, firstName: 'Sonia', lastName: 'Mubarak', email: 'sonia@rca.ac.rw', phoneNumber: '+250 788 222 333', role: 'SECURITY', status: 'ACTIVE' },
            ]);
        } catch (error) {
            console.error('Error fetching staff:', error);
            toast.error('Failed to load staff directory');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to revoke access for this staff member?')) return;
        try {
            await apiFetch(`/staff/${id}`, { method: 'DELETE' });
            toast.success('Staff member removed from active duty');
            fetchStaff();
        } catch (error) {
            toast.error('Failed to revoke access');
        }
    };

    const filteredStaff = staff.filter(s =>
        `${s.firstName} ${s.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950">
            <AppHeader title="Personnel Matrix: Staff" />

            <div className="max-w-7xl mx-auto px-6 py-8 animate-in fade-in duration-700">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Authorized Personnel</h2>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Management of administrative and security staff entities</p>
                    </div>
                    <Button className="rounded-xl bg-slate-900 dark:bg-white dark:text-slate-900 text-white shadow-xl shadow-slate-950/20 font-black uppercase tracking-widest text-[11px] py-6 px-6">
                        <UserPlus className="h-4 w-4 mr-2" /> Provision New Staff
                    </Button>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-slate-800 mb-8 flex items-center gap-4">
                    <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 px-4 py-2.5 flex-1">
                        <Search className="h-4 w-4 text-slate-400" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by name or email identifier..."
                            className="bg-transparent text-sm font-medium outline-none w-full"
                        />
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                    {loading ? (
                        <div className="p-20 text-center">
                            <Loader2 className="h-10 w-10 animate-spin text-brand-600 mx-auto mb-4" />
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Synchronizing Personnel Data...</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800">
                                    <tr>
                                        {['Staff Identity', 'Contact Uplink', 'Authorization Role', 'Status', 'Actions'].map((h) => (
                                            <th key={h} className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                                    {filteredStaff.map((person) => (
                                        <tr key={person.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black text-slate-600">
                                                        {person.firstName[0]}{person.lastName[0]}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">{person.firstName} {person.lastName}</p>
                                                        <p className="text-[10px] font-black text-brand-600 tracking-widest uppercase">ID-{person.id.toString().padStart(4, '0')}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400 italic">
                                                        <Mail className="h-3 w-3" /> {person.email}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400 italic">
                                                        <Phone className="h-3 w-3" /> {person.phoneNumber}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className="px-3 py-1 bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 rounded-lg border border-brand-100 dark:border-brand-800 text-[10px] font-black uppercase tracking-widest">
                                                    {person.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{person.status}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                                                        <Edit className="h-4 w-4 text-slate-400" />
                                                    </Button>
                                                    <button
                                                        onClick={() => handleDelete(person.id)}
                                                        className="h-8 w-8 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/30 flex items-center justify-center transition-colors group/del"
                                                    >
                                                        <Trash2 className="h-4 w-4 text-slate-400 group-hover/del:text-rose-500" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
