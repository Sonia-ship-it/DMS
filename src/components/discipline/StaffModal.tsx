import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { apiFetch } from '@/lib/api';
import { toast } from 'sonner';
import { User, Mail, Phone, ShieldCheck } from 'lucide-react';

interface StaffModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    staffMember?: any; // If provided, it's edit mode
}

export function StaffModal({ isOpen, onClose, onSuccess, staffMember }: StaffModalProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        role: 'STAFF',
        status: 'ACTIVE'
    });

    useEffect(() => {
        if (staffMember) {
            setFormData({
                firstName: staffMember.firstName,
                lastName: staffMember.lastName,
                email: staffMember.email,
                phoneNumber: staffMember.phoneNumber,
                role: staffMember.role,
                status: staffMember.status
            });
        } else {
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                role: 'STAFF',
                status: 'ACTIVE'
            });
        }
    }, [staffMember, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (staffMember && !staffMember.id) {
                throw new Error('Staff ID is missing. Cannot update.');
            }
            const url = staffMember ? `/staff/${staffMember.id}` : '/staff';
            const method = staffMember ? 'PATCH' : 'POST';

            await apiFetch(url, {
                method,
                body: JSON.stringify(formData)
            });

            toast.success(staffMember ? 'Staff updated' : 'Staff joined successfully');
            onSuccess();
            onClose();
        } catch (error) {
            toast.error('Operation failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md rounded-3xl border-none bg-white p-0 overflow-hidden shadow-2xl">
                <div className="bg-[#0A0E2E] p-8 text-white relative overflow-hidden">
                    {/* Subtle glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full" />
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold tracking-tight">
                            {staffMember ? 'Edit Staff Member' : 'Register New Staff'}
                        </DialogTitle>
                        <p className="text-white/60 text-sm font-medium mt-1">
                            {staffMember ? 'Update personnel details and permissions.' : 'Add a new member to the school administration.'}
                        </p>
                    </DialogHeader>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-xs font-bold text-[#0A0E2E]/60 uppercase ml-1">First Name</Label>
                            <div className="relative group">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#0A0E2E]/30 group-focus-within:text-[#0A0E2E] transition-colors" />
                                <Input
                                    required
                                    placeholder="Jean"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    className="rounded-xl pl-10 border-[#0A0E2E]/10 bg-slate-50 focus:bg-white h-12 text-sm font-bold"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs font-bold text-[#0A0E2E]/60 uppercase ml-1">Last Name</Label>
                            <div className="relative group">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#0A0E2E]/30 group-focus-within:text-[#0A0E2E] transition-colors" />
                                <Input
                                    required
                                    placeholder="Kabera"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    className="rounded-xl pl-10 border-[#0A0E2E]/10 bg-slate-50 focus:bg-white h-12 text-sm font-bold"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-xs font-bold text-[#0A0E2E]/60 uppercase ml-1">Email Address</Label>
                        <div className="relative group">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#0A0E2E]/30 group-focus-within:text-[#0A0E2E] transition-colors" />
                            <Input
                                required
                                type="email"
                                placeholder="jean@rca.ac.rw"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="rounded-xl pl-10 border-[#0A0E2E]/10 bg-slate-50 focus:bg-white h-12 text-sm font-bold"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-xs font-bold text-[#0A0E2E]/60 uppercase ml-1">Phone Number</Label>
                        <div className="relative group">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#0A0E2E]/30 group-focus-within:text-[#0A0E2E] transition-colors" />
                            <Input
                                required
                                placeholder="+250 788 000 000"
                                value={formData.phoneNumber}
                                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                className="rounded-xl pl-10 border-[#0A0E2E]/10 bg-slate-50 focus:bg-white h-12 text-sm font-bold"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-xs font-bold text-[#0A0E2E]/60 uppercase ml-1">Role</Label>
                            <Select
                                value={formData.role}
                                onValueChange={(val) => setFormData({ ...formData, role: val })}
                            >
                                <SelectTrigger className="rounded-xl border-[#0A0E2E]/10 bg-slate-50 h-12 text-sm font-bold">
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ADMIN">Administrator</SelectItem>
                                    <SelectItem value="STAFF">Staff</SelectItem>
                                    <SelectItem value="SECURITY">Security</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs font-bold text-[#0A0E2E]/60 uppercase ml-1">Status</Label>
                            <Select
                                value={formData.status}
                                onValueChange={(val) => setFormData({ ...formData, status: val })}
                            >
                                <SelectTrigger className="rounded-xl border-[#0A0E2E]/10 bg-slate-50 h-12 text-sm font-bold">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ACTIVE">Active</SelectItem>
                                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="pt-2">
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 rounded-xl bg-[#0A0E2E] hover:bg-[#1a264a] text-white font-bold text-sm uppercase tracking-widest shadow-xl shadow-[#0A0E2E]/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
                        >
                            {loading ? (staffMember ? 'Updating...' : 'Registering...') : (staffMember ? 'Save Changes' : 'Register Member')}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
