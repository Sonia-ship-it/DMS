import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { AppHeader } from '@/components/layout/AppHeader';
import { StatusBadge } from '@/components/RCA/Badges';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Shield, Clock, FileText, CheckCircle2, AlertCircle, ArrowLeft, Send } from 'lucide-react';
import { toast } from 'sonner';
import { apiFetch } from '@/lib/api';

interface StudentBackend {
  id: number;
  firstName: string;
  lastName: string;
  year: string;
  classGroup: string;
}

export default function CreateRecord() {
  const router = useRouter();
  const [students, setStudents] = useState<StudentBackend[]>([]);
  const [fetching, setFetching] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const studentRef = useRef<HTMLSelectElement>(null);
  const outDateRef = useRef<HTMLInputElement>(null);
  const reasonRef = useRef<HTMLSelectElement>(null);

  const [form, setForm] = useState({
    studentId: '',
    reason: '',
    outDate: '',
    description: '',
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await apiFetch('/students');
        setStudents(data);
      } catch (error) {
        console.error('Error fetching students:', error);
        toast.error('Failed to load students matrix');
      } finally {
        setFetching(false);
      }
    };
    fetchStudents();
  }, []);

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await apiFetch('/records', {
        method: 'POST',
        body: JSON.stringify({
          studentId: parseInt(form.studentId),
          reason: form.reason,
          outDate: form.outDate ? new Date(form.outDate).toISOString() : new Date().toISOString(),
          status: 'OUT'
        }),
      });

      toast.success('Operational exit recorded successfully');
      router.push('/discipline/records');
    } catch (error: any) {
      console.error('Submit error:', error);
      toast.error(`Authorization Error: ${error.message || 'Network failure in discipline uplink'}`);
    } finally {
      setSubmitting(false);
    }
  };

  const selectedStudent = students.find(s => s.id === parseInt(form.studentId));

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950">
      <AppHeader title="Deployment Protocol" />
      <div className="max-w-5xl mx-auto px-6 py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-400 hover:text-brand-600 transition-colors mb-6 text-sm font-bold group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          RETURN TO LOGS
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center border border-brand-100 dark:border-brand-800">
                  <Shield className="w-5 h-5 text-brand-600" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-tighter">Exit Matrix Configuration</h3>
                  <p className="text-xs text-slate-400 font-medium">Define parameters for student departure</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">Target Student</label>
                  <select
                    ref={studentRef}
                    disabled={fetching}
                    value={form.studentId}
                    onChange={(e) => update('studentId', e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); outDateRef.current?.focus(); } }}
                    className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-3.5 text-sm font-bold outline-none focus:ring-4 focus:ring-brand-500/10 transition-all appearance-none"
                  >
                    <option value="">Select subject...</option>
                    {students.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.firstName} {s.lastName} — Level {s.year} {s.classGroup}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">Departure Timestamp</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      ref={outDateRef}
                      type="datetime-local"
                      value={form.outDate}
                      onChange={(e) => update('outDate', e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); reasonRef.current?.focus(); } }}
                      className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 pl-11 pr-4 py-3.5 text-sm font-bold outline-none focus:ring-4 focus:ring-brand-500/10 transition-all shadow-inner"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">Authorization Reason</label>
                  <select
                    ref={reasonRef}
                    value={form.reason}
                    onChange={(e) => update('reason', e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-3.5 text-sm font-bold outline-none focus:ring-4 focus:ring-brand-500/10 transition-all appearance-none"
                  >
                    <option value="">Operational cause...</option>
                    {['Medical Checkup', 'Family Emergency', 'School Event', 'Official Errand', 'Holiday'].map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
              </div>
            </section>

            <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-slate-400" />
                <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-tighter">Operational Notes</h3>
              </div>
              <textarea
                value={form.description}
                onChange={(e) => update('description', e.target.value)}
                rows={4}
                className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-4 text-sm font-medium outline-none resize-none focus:ring-4 focus:ring-brand-500/10 transition-all placeholder:text-slate-500"
                placeholder="Provide detailed context for this operational exit..."
              />
            </section>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-900 dark:bg-slate-900/50 rounded-3xl shadow-2xl p-8 space-y-6 text-white border border-slate-800 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-500/20 rounded-full blur-2xl" />

              <div className="relative z-10">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-800 pb-2">PRE-DEBIT SUMMARY</p>

                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">Subject:</span>
                    <span className={cn('text-sm font-black text-right', selectedStudent ? 'text-white' : 'text-slate-600 italic')}>
                      {selectedStudent ? `${selectedStudent.firstName} ${selectedStudent.lastName}` : 'UNCONFIGURED'}
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">Protocol:</span>
                    <span className={cn('text-sm font-black text-right capitalize', form.reason ? 'text-brand-400' : 'text-slate-600 italic')}>
                      {form.reason || 'UNRESOLVED'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">Initial Status:</span>
                    <StatusBadge status="OUT" className="scale-90 origin-right" />
                  </div>
                </div>

                <div className="mt-10 space-y-3">
                  <Button
                    className="w-full rounded-2xl py-6 bg-brand-600 hover:bg-brand-700 text-white font-black uppercase tracking-widest shadow-xl shadow-brand-500/20 transition-all duration-300 disabled:opacity-50 group"
                    onClick={handleSubmit}
                    disabled={!form.studentId || !form.reason || submitting}
                  >
                    {submitting ? 'PROCESSING...' : 'INITIALIZE EXIT'}
                    {!submitting && <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full rounded-2xl py-6 text-slate-500 hover:text-white font-bold text-xs uppercase transition-colors"
                    onClick={() => router.push('/discipline/records')}
                  >
                    Abort Operation
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 rounded-3xl p-6 flex gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
              <p className="text-[11px] font-bold text-amber-800 dark:text-amber-400 leading-relaxed uppercase tracking-tight">
                Warning: Initializing a student exit will update their matrix status in the registry. Ensure all guardian alerts have been dispatched.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
