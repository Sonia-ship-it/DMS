import { useState } from 'react';
import { Upload, FileText, Download, Check, AlertCircle } from 'lucide-react';
import { AppHeader } from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function BulkUpload() {
  const [tab, setTab] = useState<'csv' | 'pdf'>('csv');
  const [csvUploaded, setCsvUploaded] = useState(false);
  const [pdfFiles, setPdfFiles] = useState<{ name: string; size: string; status: 'pending' | 'done' }[]>([]);

  const handleCsvDrop = () => setCsvUploaded(true);
  const handlePdfDrop = () => {
    setPdfFiles([
      { name: 'resume_john_doe.pdf', size: '245 KB', status: 'done' },
      { name: 'resume_jane_smith.pdf', size: '312 KB', status: 'done' },
      { name: 'resume_alex_chen.pdf', size: '198 KB', status: 'pending' },
    ]);
  };

  return (
    <>
      <AppHeader title="Bulk Upload" />
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="flex border-b mb-6">
          {(['csv', 'pdf'] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} className={cn('px-6 py-3 text-sm font-medium border-b-2 transition-colors', tab === t ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground')}>
              {t === 'csv' ? 'Upload CSV' : 'Upload Resumes (PDF)'}
            </button>
          ))}
        </div>

        {tab === 'csv' ? (
          <div className="space-y-6">
            <div onClick={handleCsvDrop} className="border-2 border-dashed rounded-xl p-12 text-center cursor-pointer hover:border-primary hover:bg-brand-50/50 dark:hover:bg-[rgba(75,123,255,0.05)] transition-colors">
              <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm font-medium">Drop your CSV file here</p>
              <p className="text-xs text-muted-foreground mt-1">or click to browse</p>
            </div>
            <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2" /> Download CSV Template</Button>

            {csvUploaded && (
              <div className="bg-card rounded-xl p-5 shadow-sm border space-y-4">
                <h3 className="font-semibold text-sm">Column Mapping</h3>
                <div className="space-y-2">
                  {['Name', 'Email', 'Phone', 'Skills', 'Experience'].map((col) => (
                    <div key={col} className="flex items-center gap-3">
                      <span className="text-sm w-24 text-muted-foreground">{col}</span>
                      <span className="text-muted-foreground">→</span>
                      <select className="bg-background rounded-lg border px-3 py-1.5 text-sm outline-none flex-1">
                        <option>{col}</option>
                      </select>
                    </div>
                  ))}
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead><tr className="border-b">{['Name', 'Email', 'Phone', 'Skills', 'Experience'].map((h) => <th key={h} className="px-3 py-2 text-left font-medium text-muted-foreground">{h}</th>)}</tr></thead>
                    <tbody>
                      {[['John Doe', 'john@email.com', '+1 555-0101', 'React, JS', '5 years'], ['Jane Smith', 'jane@email.com', '+1 555-0102', 'Python, ML', '3 years']].map((row, i) => (
                        <tr key={i} className="border-b"><td className="px-3 py-2">{row[0]}</td><td className="px-3 py-2">{row[1]}</td><td className="px-3 py-2">{row[2]}</td><td className="px-3 py-2">{row[3]}</td><td className="px-3 py-2">{row[4]}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Button>Confirm Upload</Button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div onClick={handlePdfDrop} className="border-2 border-dashed rounded-xl p-12 text-center cursor-pointer hover:border-primary hover:bg-brand-50/50 dark:hover:bg-[rgba(75,123,255,0.05)] transition-colors">
              <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm font-medium">Drop resume PDFs here</p>
              <p className="text-xs text-muted-foreground mt-1">Multiple files supported</p>
            </div>

            {pdfFiles.length > 0 && (
              <div className="space-y-2">
                {pdfFiles.map((f) => (
                  <div key={f.name} className="flex items-center gap-3 bg-card rounded-lg p-3 border">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{f.name}</p>
                      <p className="text-xs text-muted-foreground">{f.size}</p>
                    </div>
                    {f.status === 'done' ? <Check className="h-5 w-5 text-emerald-500" /> : <AlertCircle className="h-5 w-5 text-amber" />}
                  </div>
                ))}
                <Button className="mt-4">Upload All</Button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
