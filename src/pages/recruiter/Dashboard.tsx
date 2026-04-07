import { Briefcase, Users, Sparkles, BarChart3, ChevronUp, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { AppHeader } from '@/components/layout/AppHeader';
import { StatusBadge } from '@/components/intore/Badges';
import { mockJobs } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/authStore';

const stats = [
  { label: 'Total Jobs Posted', value: 5, change: '+12%', icon: Briefcase, up: true },
  { label: 'Total Candidates', value: 69, change: '+8%', icon: Users, up: true },
  { label: 'Screenings Run', value: 4, change: '+25%', icon: Sparkles, up: true },
  { label: 'Avg Match Score', value: '62%', change: '-3%', icon: BarChart3, up: false },
];

const activityFeed = [
  { prefix: 'Screening completed for', highlight: 'Senior Software Engineer', suffix: '— 18 candidates ranked', time: '2 hours ago', isAi: true },
  { prefix: 'Screening completed for', highlight: 'UI/UX Designer', suffix: '— 24 candidates ranked', time: '1 day ago', isAi: true },
  { prefix: 'New job posted:', highlight: 'Data Analyst', suffix: '', time: '2 days ago', isAi: false },
  { prefix: 'Screening completed for', highlight: 'Digital Marketing Lead', suffix: '— 15 candidates ranked', time: '3 days ago', isAi: true },
  { prefix: '', highlight: 'Systems Engineer', suffix: 'position closed', time: '5 days ago', isAi: false },
];

export default function RecruiterDashboard() {
  const recentJobs = mockJobs.slice(0, 5);
  const { user } = useAuthStore();
  
  // Format today's date safely
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <>
      <AppHeader title="Dashboard" />
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        <div className="mb-8">
          <h2 className="text-[24px] font-semibold text-slate-900">Good morning, {user?.name?.split(' ')[0] || 'User'}. </h2>
          <p className="text-[13px] text-slate-400 mt-1">{dateStr}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 relative">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[12px] font-medium text-slate-500">{stat.label}</p>
                  <p className="text-[32px] font-bold mt-1 text-slate-900 leading-none">{stat.value}</p>
                </div>
                <div className="absolute top-5 right-5 opacity-60">
                  <stat.icon className="h-[18px] w-[18px] text-slate-400" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-4">
                {stat.up ? <ChevronUp className="h-[12px] w-[12px] text-teal-600" /> : <ChevronDown className="h-[12px] w-[12px] text-red-500" />}
                <span className={cn('text-[12px]', stat.up ? 'text-teal-600' : 'text-red-500')}>{stat.change} this week</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between mb-4">
                <h2 className="text-[15px] font-semibold text-slate-900">Recent jobs</h2>
                <Link href="/recruiter/jobs" className="text-[13px] text-slate-400 hover:text-slate-700 transition-colors">
                  View all →
                </Link>
              </div>
              <div className="overflow-x-auto pb-2">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-100 text-left">
                      <th className="px-5 py-2 text-xs font-medium text-slate-500 uppercase tracking-wider">Job Title</th>
                      <th className="px-5 py-2 text-xs font-medium text-slate-500 uppercase tracking-wider">Department</th>
                      <th className="px-5 py-2 text-xs font-medium text-slate-500 uppercase tracking-wider">Applicants</th>
                      <th className="px-5 py-2 text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                      <th className="px-5 py-2 text-xs font-medium text-slate-500 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentJobs.map((job) => (
                      <tr key={job.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors h-[52px]">
                        <td className="px-5 py-3.5"><Link href={`/recruiter/jobs/${job.id}`} className="text-[14px] font-medium text-slate-900 hover:underline cursor-pointer">{job.title}</Link></td>
                        <td className="px-5 py-3.5 text-[14px] text-slate-500">{job.department}</td>
                        <td className="px-5 py-3.5 text-[14px] text-slate-600">{job.applicantCount}</td>
                        <td className="px-5 py-3.5"><StatusBadge status={job.status} /></td>
                        <td className="px-5 py-3.5 text-right">
                          <Link href={`/recruiter/jobs/${job.id}`} className="inline-flex items-center text-[13px] text-slate-400 hover:text-slate-700 transition-colors bg-transparent px-2 py-1">
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="p-5 border-b border-slate-100 mb-4">
                <h2 className="text-[15px] font-semibold text-slate-900">Activity</h2>
              </div>
              <div className="flex flex-col pb-2">
                {activityFeed.map((item, i) => (
                  <div key={i} className="flex gap-3 px-5 py-3 border-b border-slate-100 last:border-0 items-start">
                    {item.isAi && <Sparkles className="h-[14px] w-[14px] text-slate-400 mt-0.5 shrink-0" />}
                    <div className="flex-1">
                      <p className="text-[14px] text-slate-700 leading-snug">
                        {item.prefix} <span className="font-medium text-slate-900">{item.highlight}</span> {item.suffix}
                      </p>
                    </div>
                    <p className="text-[12px] text-slate-400 shrink-0">{item.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
