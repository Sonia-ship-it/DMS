import Link from 'next/link';
import { AppHeader } from '@/components/layout/AppHeader';
import { StatusBadge } from '@/components/intore/Badges';
import { ScoreBar } from '@/components/intore/ScoreBar';
import { mockScreeningRuns } from '@/data/mockData';

export default function ScreeningsList() {
  return (
    <>
      <AppHeader title="Screenings" />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-semibold mb-6">Screening History</h2>
        <div className="bg-card rounded-xl shadow-sm border overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                {['Job Title', 'Date Run', 'Candidates', 'Top Score', 'Avg Score', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="px-5 py-3 text-xs font-medium text-muted-foreground uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockScreeningRuns.map((run) => (
                <tr key={run.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="px-5 py-3 text-sm font-medium">{run.jobTitle}</td>
                  <td className="px-5 py-3 text-sm text-muted-foreground">{run.dateRun}</td>
                  <td className="px-5 py-3 text-sm">{run.candidatesScreened}</td>
                  <td className="px-5 py-3 min-w-[100px]"><ScoreBar score={run.topScore} /></td>
                  <td className="px-5 py-3 min-w-[100px]"><ScoreBar score={run.avgScore} /></td>
                  <td className="px-5 py-3"><StatusBadge status={run.status} /></td>
                  <td className="px-5 py-3">
                    <Link href={`/recruiter/jobs/${run.jobId}`} className="text-sm text-primary hover:underline">View Results</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
