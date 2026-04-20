import { useState, useRef } from 'react';
import { Upload, FileText, Download, Check, AlertCircle, Loader2 } from 'lucide-react';
import { AppHeader } from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { apiFetch } from '@/lib/api';
import { toast } from 'sonner';

interface ParsedStudent {
  firstName: string;
  lastName: string;
  fatherName: string;
  motherName: string;
  fatherPhoneNumber: string;
  motherPhoneNumber: string;
  year: string;
  classGroup: string;
  [key: string]: string;
}

export default function BulkUpload() {
  const [tab, setTab] = useState<'csv' | 'images'>('csv');
  const [isUploading, setIsUploading] = useState(false);
  const [csvData, setCsvData] = useState<ParsedStudent[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<{ name: string; size: string; status: 'pending' | 'done' }[]>([]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      parseCSV(text);
    };
    reader.readAsText(file);
  };

  const parseCSV = (text: string) => {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    if (lines.length < 2) {
      toast.error('CSV file is empty or missing headers');
      return;
    }

    const headers = lines[0].split(',').map(h => h.trim());
    const data = lines.slice(1).map(line => {
      const values = line.split(',').map(v => v.trim());
      const student: any = {};
      headers.forEach((header, index) => {
        student[header] = values[index];
      });
      return student as ParsedStudent;
    });

    setCsvData(data);
    toast.success(`Successfully parsed ${data.length} students`);
  };

  const handleImport = async () => {
    if (csvData.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < csvData.length; i++) {
      const student = csvData[i];
      try {
        await apiFetch('/students', {
          method: 'POST',
          body: JSON.stringify({
            firstName: student.firstName || student.Name?.split(' ')[0] || 'Unknown',
            lastName: student.lastName || student.Name?.split(' ').slice(1).join(' ') || 'Unknown',
            fatherName: student.fatherName || student['Parent Name'] || 'N/A',
            motherName: student.motherName || 'N/A',
            fatherPhoneNumber: student.fatherPhoneNumber || student['Parent Phone'] || 'N/A',
            motherPhoneNumber: student.motherPhoneNumber || 'N/A',
            year: student.year || student.Class?.split(' ')[0] || '1',
            classGroup: student.classGroup || student.Class?.split(' ')[1] || 'A',
          }),
        });
        successCount++;
      } catch (error) {
        console.error('Error importing student:', student, error);
        errorCount++;
      }
      setUploadProgress(Math.round(((i + 1) / csvData.length) * 100));
    }

    setIsUploading(false);
    if (successCount > 0) {
      toast.success(`Successfully imported ${successCount} students`);
    }
    if (errorCount > 0) {
      toast.error(`Failed to import ${errorCount} students`);
    }
    if (successCount > 0) {
      setCsvData([]);
    }
  };

  const handleImageDrop = () => {
    setImages([
      { name: 'student_photo_1.jpg', size: '1.2 MB', status: 'done' },
      { name: 'student_photo_2.jpg', size: '845 KB', status: 'done' },
      { name: 'student_photo_3.jpg', size: '2.4 MB', status: 'pending' },
    ]);
  };

  const downloadTemplate = () => {
    const headers = 'firstName,lastName,fatherName,motherName,fatherPhoneNumber,motherPhoneNumber,year,classGroup';
    const sample = 'John,Doe,Peter Doe,Mary Doe,+250780000001,+250780000002,1,A';
    const blob = new Blob([`${headers}\n${sample}`], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'student_template.csv';
    a.click();
  };

  return (
    <>
      <AppHeader title="Bulk Import Protocol" />
      <div className="max-w-4xl mx-auto px-6 py-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex border-b border-slate-200 dark:border-slate-800 mb-8 bg-white dark:bg-slate-900 rounded-2xl p-1 shadow-sm">
          <button
            onClick={() => setTab('csv')}
            className={cn(
              'flex-1 px-6 py-3 text-sm font-bold rounded-xl transition-all',
              tab === 'csv' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
            )}
          >
            Student Directory (CSV)
          </button>
          <button
            onClick={() => setTab('images')}
            className={cn(
              'flex-1 px-6 py-3 text-sm font-bold rounded-xl transition-all',
              tab === 'images' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
            )}
          >
            Biometric Uplink (Photos)
          </button>
        </div>

        {tab === 'csv' ? (
          <div className="space-y-8">
            <input
              type="file"
              accept=".csv"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileSelect}
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed rounded-[2rem] p-16 text-center cursor-pointer hover:border-brand-500 hover:bg-brand-50/30 dark:hover:bg-brand-950/20 transition-all group bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
            >
              <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-inner">
                <Upload className="h-8 w-8 text-brand-600" />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">DEPLOY STUDENT MATRIX</h3>
              <p className="text-sm text-slate-400 mt-2 font-medium">Select a CSV file containing student identities</p>
            </div>

            <div className="flex justify-center">
              <Button onClick={downloadTemplate} variant="ghost" className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-brand-600">
                <Download className="h-4 w-4 mr-2" /> Download Specification Template
              </Button>
            </div>

            {csvData.length > 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-8 animate-in zoom-in-95 duration-500">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-black text-lg text-slate-900 dark:text-white tracking-tight text-center">DATA PREVIEW</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{csvData.length} Entities Detected</p>
                  </div>
                  {isUploading && (
                    <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-950 px-4 py-2 rounded-xl border border-slate-100 dark:border-slate-800">
                      <Loader2 className="h-4 w-4 animate-spin text-brand-600" />
                      <span className="text-xs font-black text-slate-600 dark:text-slate-300">{uploadProgress}% SYNCED</span>
                    </div>
                  )}
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800">
                        {['First Name', 'Last Name', 'Class', 'Guardian'].map((h) => (
                          <th key={h} className="px-5 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                      {csvData.slice(0, 5).map((row, i) => (
                        <tr key={i} className="text-sm font-medium">
                          <td className="px-5 py-4 text-slate-900 dark:text-slate-100">{row.firstName || row.Name?.split(' ')[0]}</td>
                          <td className="px-5 py-4 text-slate-900 dark:text-slate-100">{row.lastName || row.Name?.split(' ').slice(1).join(' ')}</td>
                          <td className="px-5 py-4 text-slate-500">{row.year} {row.classGroup}</td>
                          <td className="px-5 py-4 text-slate-500">{row.fatherName || row['Parent Name']}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <Button
                  onClick={handleImport}
                  disabled={isUploading}
                  className="w-full h-14 rounded-2xl bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-black uppercase tracking-widest shadow-2xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                >
                  {isUploading ? <Loader2 className="h-5 w-5 animate-spin mr-3 inline" /> : <Check className="h-5 w-5 mr-3 inline" />}
                  {isUploading ? 'Executing Sync...' : 'Confirm & Execute Import'}
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div onClick={handleImageDrop} className="border-2 border-dashed rounded-[2rem] p-20 text-center cursor-pointer hover:border-brand-500 hover:bg-brand-50/30 dark:hover:bg-brand-950/20 transition-all bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6">
                <Upload className="h-8 w-8 text-brand-600" />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase">Biometric Archive</h3>
              <p className="text-sm text-slate-400 mt-2 font-medium">Drop student profile photos for AI matching</p>
            </div>

            {images.length > 0 && (
              <div className="space-y-3">
                {images.map((f) => (
                  <div key={f.name} className="flex items-center gap-4 bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div className="w-10 h-10 rounded-lg bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-brand-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-black truncate">{f.name}</p>
                      <p className="text-[10px] font-bold text-slate-400">{f.size}</p>
                    </div>
                    {f.status === 'done' ? <Check className="h-5 w-5 text-emerald-500" /> : <Loader2 className="h-5 w-5 text-brand-600 animate-spin" />}
                  </div>
                ))}
                <Button className="mt-6 w-full h-14 rounded-2xl bg-indigo-600 text-white font-black uppercase tracking-widest shadow-xl">Process Biometric Data</Button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
