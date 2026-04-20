import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Phone, MapPin, GraduationCap, ShieldCheck } from 'lucide-react';
import { apiFetch } from '@/lib/api';
import { toast } from 'sonner';

interface NewStudentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export function NewStudentModal({ isOpen, onClose, onSuccess }: NewStudentModalProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        fatherName: '',
        motherName: '',
        fatherPhoneNumber: '',
        motherPhoneNumber: '',
        year: '',
        classGroup: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await apiFetch('/students', {
                method: 'POST',
                body: JSON.stringify(formData),
            });
            toast.success('New student identity registered in the matrix');
            onSuccess();
            onClose();
            // Reset form
            setFormData({
                firstName: '',
                lastName: '',
                fatherName: '',
                motherName: '',
                fatherPhoneNumber: '',
                motherPhoneNumber: '',
                year: '',
                classGroup: '',
            });
        } catch (error: any) {
            console.error('Error creating student:', error);
            toast.error(error.message || 'Failed to register student identity');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-3xl p-0 overflow-hidden outline-none">
                <DialogHeader className="p-8 bg-slate-50/50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center border border-brand-500/20">
                            <User className="w-5 h-5 text-brand-600" />
                        </div>
                        <div>
                            <DialogTitle className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Register New Subject</DialogTitle>
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Student Intelligence Registry</p>
                        </div>
                    </div>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="firstName" className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">First Name</Label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                    placeholder="Subject name"
                                    className="pl-11 rounded-2xl bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 font-bold"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName" className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">Last Name</Label>
                            <Input
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                placeholder="Surname"
                                className="rounded-2xl bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 font-bold"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="year" className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">Academic Year</Label>
                            <div className="relative">
                                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <select
                                    id="year"
                                    name="year"
                                    value={formData.year}
                                    onChange={handleChange}
                                    required
                                    className="w-full h-10 pl-11 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm font-bold outline-none focus:ring-2 focus:ring-brand-500/20 appearance-none"
                                >
                                    <option value="">Select Year</option>
                                    {['1', '2', '3', '4', '5', '6'].map(y => <option key={y} value={y}>Year {y}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="classGroup" className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">Class Group</Label>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <select
                                    id="classGroup"
                                    name="classGroup"
                                    value={formData.classGroup}
                                    onChange={handleChange}
                                    required
                                    className="w-full h-10 pl-11 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm font-bold outline-none focus:ring-2 focus:ring-brand-500/20 appearance-none"
                                >
                                    <option value="">Select Group</option>
                                    {['A', 'B', 'C', 'D'].map(g => <option key={g} value={g}>Group {g}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 border-t border-slate-100 dark:border-slate-800 pt-6">
                        <p className="text-[10px] font-black text-brand-600 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                            <ShieldCheck className="w-3 h-3" /> Guardian Logistics
                        </p>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="fatherName" className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">Father's Name</Label>
                                <Input
                                    id="fatherName"
                                    name="fatherName"
                                    value={formData.fatherName}
                                    onChange={handleChange}
                                    placeholder="Primary guardian"
                                    className="rounded-2xl bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 font-bold"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="fatherPhoneNumber" className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">Father's Phone</Label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                                    <Input
                                        id="fatherPhoneNumber"
                                        name="fatherPhoneNumber"
                                        value={formData.fatherPhoneNumber}
                                        onChange={handleChange}
                                        placeholder="+250..."
                                        className="pl-11 rounded-2xl bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 font-bold"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="motherName" className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">Mother's Name</Label>
                                <Input
                                    id="motherName"
                                    name="motherName"
                                    value={formData.motherName}
                                    onChange={handleChange}
                                    placeholder="Secondary guardian"
                                    className="rounded-2xl bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 font-bold"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="motherPhoneNumber" className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">Mother's Phone</Label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                                    <Input
                                        id="motherPhoneNumber"
                                        name="motherPhoneNumber"
                                        value={formData.motherPhoneNumber}
                                        onChange={handleChange}
                                        placeholder="+250..."
                                        className="pl-11 rounded-2xl bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 font-bold"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="pt-4 border-t border-slate-100 dark:border-slate-800">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={onClose}
                            className="rounded-xl font-bold text-slate-500 hover:text-slate-900"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-black uppercase tracking-widest px-8 shadow-lg shadow-brand-500/20"
                        >
                            {loading ? 'Processing...' : 'Deploy Identity'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
