import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Calendar, User, FileText, ArrowLeft, Printer, Share2, Shield, Info, Phone, MapPin, Activity, Clock, CheckCircle2 } from 'lucide-react';
import { AppHeader } from '@/components/layout/AppHeader';
import { Avatar } from '@/components/RCA/Avatar';
import { StatusBadge } from '@/components/RCA/Badges';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { apiFetch } from '@/lib/api';
import { cn } from '@/lib/utils';


interface RecordFull {
  id: number;
  studentId: number;
  reason: string;
  status: string;
  outDate: string;
  returnDate: string | null;
  student: {
    id: number;
    firstName: string;
    lastName: string;
    fatherName: string;
    motherName: string;
    fatherPhoneNumber: string;
    motherPhoneNumber: string;
    year: string;
    classGroup: string;
    records: any[];
  }
}

export default function RecordDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [record, setRecord] = useState<RecordFull | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchRecord = async () => {
      try {
        const data = await apiFetch(`/records/${id}`);
        setRecord(data);
      } catch (error) {
        console.error('Error fetching record:', error);
        toast.error('Failed to retrieve record matrix');
      } finally {
        setLoading(false);
      }
    };
    fetchRecord();
  }, [id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleReturn = async () => {
    if (!record) return;
    try {
      setLoading(true);
      await apiFetch(`/records/${record.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          status: 'RETURNED',
          returnDate: new Date().toISOString()
        })
      });
      toast.success('Student return confirmed in matrix');
      router.reload();
    } catch (error) {
      console.error('Error updating record:', error);
      toast.error('Failed to update operational status');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!record || !confirm('Permanently purge this record from active matrix?')) return;
    try {
      await apiFetch(`/records/${record.id}`, { method: 'DELETE' });
      toast.success('Record purged successfully');
      router.push('/discipline/records');
    } catch (error) {
      toast.error('Purge protocol failed');
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-50/50 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Accessing Record Matrix...</p>
      </div>
    </div>
  );

  if (!record) return (
    <div className="min-h-screen bg-slate-50/50 flex items-center justify-center">
      <div className="text-center space-y-6 max-w-sm px-6">
        <div className="w-20 h-20 bg-rose-50 rounded-3xl flex items-center justify-center mx-auto border border-rose-100 shadow-xl shadow-rose-500/10">
          <Shield className="w-10 h-10 text-rose-500" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tighter">IDENTIFIER MISMATCH</h2>
        <p className="text-sm text-slate-400 font-medium leading-relaxed uppercase tracking-tight">The requested record code does not exist in the active registry. It may have been purged or archived.</p>
        <Button onClick={() => router.push('/discipline/records')} className="w-full rounded-2xl bg-slate-900 shadow-xl font-bold uppercase tracking-widest text-[11px] py-6 transition-transform hover:scale-105">
          Return to Base
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950">
      <AppHeader title={`Operational Log: ${record.student.firstName} ${record.student.lastName}`} />
      <div className="max-w-6xl mx-auto px-6 py-8 animate-in zoom-in-95 duration-500">
        <div className="mb-8 flex justify-between items-center">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-400 hover:text-brand-600 transition-all font-black text-[11px] uppercase tracking-widest group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Registry Matrix
          </button>

          <Button onClick={handleDelete} variant="ghost" className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 text-[10px] font-black tracking-widest uppercase">
            Purge Record
          </Button>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/5 rounded-full blur-3xl -mr-32 -mt-32" />

          {/* Masthead */}
          <div className="p-10 border-b border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-950/30">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-brand-600 to-indigo-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                  <div className="relative w-24 h-24 rounded-[1.8rem] bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 overflow-hidden flex items-center justify-center">
                    <Avatar name={`${record.student.firstName} ${record.student.lastName}`} className="w-full h-full rounded-none" />
                  </div>
                </div>
                <div>
                  <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">{record.student.firstName} {record.student.lastName}</h2>
                  <div className="flex items-center gap-3 mt-1.5 font-bold text-xs text-brand-600 dark:text-brand-400 uppercase tracking-widest bg-brand-50 dark:bg-brand-900/20 px-3 py-1 rounded-full w-fit border border-brand-100 dark:border-brand-800">
                    <User size={12} /> LEVEL {record.student.year} {record.student.classGroup} — UID-{record.student.id.toString().padStart(4, '0')}
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:items-end gap-3">
                <StatusBadge status={record.status} className="px-6 py-2 text-sm font-black shadow-lg shadow-brand-500/10 rounded-2xl" />
                <div className="px-4 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest text-right">Operational Ref</p>
                  <p className="text-xs font-black text-slate-600 dark:text-slate-300 text-right">#{record.id.toString().padStart(6, '0')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-10">
            {/* Intel Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
              {[
                { label: 'Operational Cause', value: record.reason, icon: FileText, color: 'text-brand-600' },
                { label: 'Deployment Time', value: formatDate(record.outDate), icon: Clock, color: 'text-indigo-600' },
                { label: 'Current Timeline', value: record.returnDate ? formatDate(record.returnDate) : 'IN PROGRESS', icon: Calendar, color: record.returnDate ? 'text-emerald-600' : 'text-amber-500' },
                { label: 'Recording Entity', value: 'System Admin', icon: Shield, color: 'text-slate-600' }
              ].map((item, i) => (
                <div key={i} className="space-y-3 group cursor-default">
                  <div className="flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                    <item.icon className={cn('h-4 w-4', item.color)} />
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</p>
                  </div>
                  <p className="text-[15px] font-black text-slate-900 dark:text-white leading-tight">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="h-px bg-slate-100 dark:bg-slate-800 w-full mb-16 shadow-sm" />

            {/* Strategic Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <div className="space-y-6">
                <h3 className="font-black text-xl text-slate-900 dark:text-white tracking-widest flex items-center gap-3">
                  <Phone className="w-5 h-5 text-brand-600" />
                  GUARDIAN BACKUP
                </h3>
                <div className="bg-slate-50 dark:bg-slate-950/50 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 space-y-6 shadow-inner">
                  <div className="flex justify-between items-center text-sm border-b border-slate-200/50 dark:border-slate-800 pb-4">
                    <span className="text-slate-400 font-bold uppercase tracking-tight text-[11px]">Primary Contact</span>
                    <span className="font-black text-slate-900 dark:text-white uppercase">{record.student.fatherName || record.student.motherName}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-slate-200/50 dark:border-slate-800 pb-4">
                    <span className="text-slate-400 font-bold uppercase tracking-tight text-[11px]">Secure Uplink</span>
                    <span className="font-black text-brand-600 dark:text-brand-400">{record.student.fatherPhoneNumber || record.student.motherPhoneNumber}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400 font-bold uppercase tracking-tight text-[11px]">Regional Sector</span>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-slate-400" />
                      <span className="font-black text-slate-900 dark:text-white uppercase text-xs tracking-tighter">Kicukiro District, Central Kigali</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="font-black text-xl text-slate-900 dark:text-white tracking-widest flex items-center gap-3">
                  <Activity className="w-5 h-5 text-indigo-600" />
                  DISCIPLINE ANALYTICS
                </h3>
                <div className="bg-slate-50 dark:bg-slate-950/50 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 space-y-6 shadow-inner">
                  <div className="flex justify-between items-center text-sm border-b border-slate-200/50 dark:border-slate-800 pb-4">
                    <span className="text-slate-400 font-bold uppercase tracking-tight text-[11px]">Matrix Frequency</span>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-indigo-600 text-lg leading-none">{record.student.records?.length || 0}</span>
                      <span className="text-[10px] font-black text-slate-400 uppercase">EVENTS</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-slate-200/50 dark:border-slate-800 pb-4">
                    <span className="text-slate-400 font-bold uppercase tracking-tight text-[11px]">Compliance Rating</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[95%]" />
                      </div>
                      <span className="font-black text-emerald-600 text-xs text-right">HIGH (95%)</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400 font-bold uppercase tracking-tight text-[11px]">System Status</span>
                    <span className="px-3 py-1 bg-white dark:bg-slate-900 rounded-lg font-black text-brand-600 dark:text-brand-400 text-[10px] border border-brand-100 dark:border-brand-800 uppercase shadow-sm">ACTIVE MONITORING</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tactical Actions */}
            <div className="flex flex-wrap gap-4 pt-10 border-t border-slate-100 dark:border-slate-800">
              <div className="flex-1 min-w-[200px] flex gap-4">
                {record.status === 'OUT' ? (
                  <Button
                    onClick={handleReturn}
                    className="flex-1 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-widest text-xs py-7 shadow-xl shadow-emerald-500/20 transition-all hover:scale-[1.02]"
                  >
                    <CheckCircle2 className="mr-2 h-4 w-4" /> Confirm Return
                  </Button>
                ) : (
                  <Button className="flex-1 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 font-black uppercase tracking-widest text-xs py-7 cursor-not-allowed">
                    <CheckCircle2 className="mr-2 h-4 w-4" /> Operations Complete
                  </Button>
                )}
                <Button variant="outline" className="flex-1 rounded-2xl border-slate-200 dark:border-slate-800 font-black uppercase tracking-widest text-xs py-7 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                  <Printer className="mr-2 h-4 w-4" /> Print Matrix
                </Button>
              </div>
              <Button variant="ghost" className="rounded-2xl px-8 flex items-center justify-center font-black uppercase tracking-widest text-xs py-7 text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/10 transition-all">
                <Share2 className="mr-2 h-4 w-4" /> Guardian Uplink
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
