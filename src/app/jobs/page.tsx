'use client';

import Link from 'next/link';
import { Search, MapPin, Briefcase, Clock, ArrowRight, Filter } from 'lucide-react';
import ApplicantLayout from '@/components/ApplicantLayout';

const jobs = [
    { id: '1', title: 'Senior Software Engineer', company: 'Inyarwanda Ltd', location: 'Kigali', type: 'Remote', salary: '$1200 - $1800', posted: '15 Mar' },
    { id: '2', title: 'UI/UX Designer', company: 'Kigali Tech Hub', location: 'Kigali', type: 'Hybrid', salary: '$800 - $1200', posted: '10 Mar' },
    { id: '3', title: 'Data Scientist', company: 'BK Group', location: 'Musanze', type: 'Onsite', salary: '$1500 - $2200', posted: '18 Mar' },
    { id: '4', title: 'Marketing Lead', company: 'MTN Rwanda', location: 'Kigali', type: 'Hybrid', salary: '$1000 - $1500', posted: '12 Mar' },
    { id: '5', title: 'Product Manager', company: 'Zipline', location: 'Muhanga', type: 'Remote', salary: '$2000 - $2800', posted: '20 Mar' },
];

export default function BrowseJobsPage() {
    return (
        <ApplicantLayout>
            <div className="max-w-6xl mx-auto space-y-12">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Find your dream job in Rwanda.</h1>
                    <p className="text-slate-500 font-medium mt-4">Discover opportunities at the fastest growing Rwandan companies.</p>

                    <div className="max-w-2xl mx-auto mt-10 relative">
                        <Search className="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by job title, company, or keywords..."
                            className="w-full bg-white border border-slate-200 rounded-2xl pl-14 pr-32 py-5 text-slate-900 font-medium shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500"
                        />
                        <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-blue-600/20">
                            Search
                        </button>
                    </div>
                </div>

                <div className="flex gap-8 items-start">
                    <div className="hidden lg:block w-64 space-y-8 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm sticky top-24">
                        <div className="space-y-4">
                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                <Filter className="w-4 h-4 text-slate-400" />
                                Filters
                            </h3>
                            <div className="space-y-6 pt-4 border-t border-slate-50">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Job Type</p>
                                    <label className="flex items-center gap-2 mb-3 text-sm font-bold text-slate-700 cursor-pointer">
                                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                                        Remote
                                    </label>
                                    <label className="flex items-center gap-2 mb-3 text-sm font-bold text-slate-700 cursor-pointer">
                                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                                        Hybrid
                                    </label>
                                    <label className="flex items-center gap-2 mb-3 text-sm font-bold text-slate-700 cursor-pointer">
                                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                                        Onsite
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 space-y-6">
                        <div className="flex justify-between items-center px-2">
                            <p className="text-sm font-bold text-slate-500">Showing <span className="text-slate-900">52 jobs</span> in Rwanda</p>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            {jobs.map((job) => (
                                <Link key={job.id} href={`/jobs/${job.id}`} className="block group">
                                    <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm hover:shadow-xl hover:border-blue-100 group-hover:translate-y-[-4px] transition-all relative overflow-hidden">
                                        <div className="flex items-start justify-between">
                                            <div className="flex gap-6">
                                                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
                                                    <Briefcase className="w-7 h-7 group-hover:text-blue-500 transition-colors" />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-black text-slate-900 tracking-tight mb-2 group-hover:text-blue-600 transition-colors">{job.title}</h3>
                                                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-bold uppercase tracking-widest">
                                                        <span className="text-slate-400 font-black">{job.company}</span>
                                                        <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                                                        <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                                                        <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                                                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {job.type}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-lg font-black text-slate-900 mb-1">{job.salary}</div>
                                                <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest">monthly</div>
                                            </div>
                                        </div>
                                        <div className="mt-8 pt-6 border-t border-slate-50 flex justify-between items-center">
                                            <div className="flex gap-2">
                                                {['React', 'Node.js', 'Next.js'].map(tag => (
                                                    <span key={tag} className="bg-slate-50 text-slate-500 text-[10px] px-3 py-1 rounded-lg font-black tracking-widest border border-slate-100">{tag}</span>
                                                ))}
                                            </div>
                                            <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Posted {job.posted}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </ApplicantLayout>
    );
}
