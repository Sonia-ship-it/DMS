import Link from 'next/link';
import { useRouter } from 'next/router';
import { MapPin, Clock, Briefcase, ArrowLeft, CheckCircle, Building2, GraduationCap } from 'lucide-react';
import { mockJobs } from '@/data/mockData';

export default function JobDetailPage() {
  const router = useRouter();
  const id = typeof router.query.id === 'string' ? router.query.id : undefined;
  const job = mockJobs.find((j) => j.id === id);

  if (!job) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <Briefcase className="h-12 w-12 text-slate-300 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-slate-900">Job not found</h2>
        <p className="text-sm text-slate-500 mt-2">This position may have been closed or removed.</p>
        <Link href="/jobs" className="inline-block mt-6 text-sm text-[#4B7BFF] hover:text-[#2D3DB5] font-medium">
          ← Back to all jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Breadcrumb */}
      <Link href="/jobs" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-[#4B7BFF] transition-colors mb-6">
        <ArrowLeft className="h-4 w-4" />
        Back to all jobs
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center shrink-0">
                <Briefcase className="h-7 w-7 text-[#4B7BFF]" />
              </div>
              <div className="flex-1">
                <h1 className="text-[24px] font-bold text-slate-900">{job.title}</h1>
                <div className="flex flex-wrap items-center gap-4 mt-3">
                  <div className="flex items-center gap-1.5 text-[13px] text-slate-500">
                    <Building2 className="h-4 w-4" />
                    {job.department}
                  </div>
                  <div className="flex items-center gap-1.5 text-[13px] text-slate-500">
                    <MapPin className="h-4 w-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1.5 text-[13px] text-slate-500">
                    <Clock className="h-4 w-4" />
                    {job.type} · {job.employmentType}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8">
            <h2 className="text-[16px] font-semibold text-slate-900 mb-4">About this role</h2>
            <p className="text-[14px] text-slate-600 leading-[1.8]">{job.description}</p>

            <h3 className="text-[14px] font-semibold text-slate-900 mt-8 mb-3">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {job.requiredSkills.map((skill) => (
                <span key={skill} className="flex items-center gap-1.5 text-[13px] text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-1.5">
                  <CheckCircle className="h-3.5 w-3.5" />
                  {skill}
                </span>
              ))}
            </div>

            {job.niceToHaveSkills.length > 0 && (
              <>
                <h3 className="text-[14px] font-semibold text-slate-900 mt-6 mb-3">Nice to Have</h3>
                <div className="flex flex-wrap gap-2">
                  {job.niceToHaveSkills.map((skill) => (
                    <span key={skill} className="text-[13px] text-slate-500 bg-slate-100 rounded-lg px-3 py-1.5">
                      {skill}
                    </span>
                  ))}
                </div>
              </>
            )}

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-xl p-4">
                <div className="text-[12px] text-slate-400 uppercase tracking-wider mb-1">Experience</div>
                <div className="text-[15px] font-semibold text-slate-900">{job.minExperience}+ years</div>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <div className="text-[12px] text-slate-400 uppercase tracking-wider mb-1">Education</div>
                <div className="text-[15px] font-semibold text-slate-900 flex items-center gap-1.5">
                  <GraduationCap className="h-4 w-4 text-slate-500" />
                  {job.educationLevel}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Apply CTA */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center sticky top-24">
            <div className="text-[13px] text-slate-500 mb-1">{job.applicantCount} applicants</div>
            <Link
              href={`/apply/${job.id}`}
              className="block w-full bg-[#0F1547] hover:bg-[#1E2A8A] text-white py-3 rounded-xl font-semibold text-[15px] transition-colors mt-4 shadow-sm border border-[rgba(75,123,255,0.3)]"
            >
              Apply Now
            </Link>
            <p className="text-[11px] text-slate-400 mt-3">Takes about 5 minutes</p>
          </div>

          {/* Quick Info */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="text-[13px] font-semibold text-slate-900 mb-4">Job Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-[13px]">
                <span className="text-slate-400">Posted</span>
                <span className="text-slate-700 font-medium">{new Date(job.postedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-slate-400">Type</span>
                <span className="text-slate-700 font-medium">{job.employmentType}</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-slate-400">Location</span>
                <span className="text-slate-700 font-medium">{job.type}</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-slate-400">Department</span>
                <span className="text-slate-700 font-medium">{job.department}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
