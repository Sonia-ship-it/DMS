'use client';

import Link from 'next/link';
import { Briefcase, MapPin, Clock, CheckCircle, ArrowLeft, ArrowRight, MoreHorizontal, Sparkles } from 'lucide-react';
import ApplicantLayout from '@/components/ApplicantLayout';

const applications = [
    { company: 'Inyarwanda Ltd', title: 'Senior Software Engineer', location: 'Kigali', applied: '18 Mar', status: 'Under Review', statusColor: 'amber' },
    { company: 'Kigali Tech Hub', title: 'UI/UX Designer', location: 'Kigali', applied: '14 Mar', status: 'Shortlisted', statusColor: 'blue' },
    { company: 'BK Capital', title: 'Data Analyst', location: 'Musanze', applied: '10 Mar', status: 'Interview', statusColor: 'emerald' },
    { company: 'MTN Rwanda', title: 'Digital Marketing Lead', location: 'Huye', applied: '28 Feb', status: 'Rejected', statusColor: 'gray' },
    { company: 'RwandAir', title: 'Systems Engineer', location: 'Kigali', applied: '20 Mar', status: 'Applied', statusColor: 'slate' },
];

export default function MyApplicationsPage() {
    return (
        <ApplicantLayout>
            <div className="max-w-5xl mx-auto space-y-12">
                <div className="text-left mb-12">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Welcome back, Claudine 👋</h1>
                    <p className="text-slate-500 font-medium mt-2">Track your job applications across Rwanda.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: 'Total Applications', value: '5', color: 'blue' },
                        { title: 'Active', value: '4', color: 'emerald' },
                        { title: 'Interviews Scheduled', value: '1', color: 'amber' },
                    ].map(stat => (
                        <div key={stat.title} className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">{stat.title}</p>
                            <div className={`text-4xl font-black text-slate-900`}>{stat.value}</div>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden mt-12">
                    <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/10">
                        <h2 className="text-lg font-black text-slate-900 tracking-tight">My Applications</h2>
                        <Link href="/jobs" className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors flex items-center gap-2">
                            Browse more jobs <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>

                    <div className="divide-y divide-slate-100">
                        {applications.map((app, i) => (
                            <div key={i} className="p-8 hover:bg-slate-50 transition-colors group">
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex gap-6">
                                        <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:shadow-sm transition-all shadow-none">
                                            <Briefcase className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-md font-black text-slate-900 tracking-tight">{app.title}</h3>
                                            <div className="flex items-center gap-2 text-xs text-slate-500 font-bold mt-1">
                                                <span className="text-slate-400">{app.company}</span>
                                                <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                                                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {app.location}</span>
                                                <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Applied {app.applied}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${app.statusColor === 'emerald' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                            app.statusColor === 'amber' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                                app.statusColor === 'blue' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                                    app.statusColor === 'gray' ? 'bg-rose-50 text-rose-700 border-rose-100' :
                                                        'bg-slate-100 text-slate-600 border-slate-200'
                                        }`}>
                                        {app.status === 'Rejected' ? 'Rejected' : app.status}
                                    </span>
                                </div>

                                {/* Progress Bar (Dotted as in image) */}
                                <div className="relative h-1 w-full bg-slate-100 rounded-full mt-4 flex justify-between overflow-hidden">
                                    <div className={`absolute top-0 left-0 h-full ${app.statusColor === 'gray' ? 'bg-rose-500' : 'bg-blue-600'}`} style={{ width: app.status === 'Applied' ? '20%' : app.status === 'Under Review' ? '40%' : app.status === 'Shortlisted' ? '70%' : app.status === 'Interview' ? '90%' : '100%' }}></div>
                                    {[0, 25, 50, 75, 100].map(p => (
                                        <div key={p} className="w-1 h-full bg-white z-10 scale-x-[1.2]"></div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </ApplicantLayout>
    );
}
