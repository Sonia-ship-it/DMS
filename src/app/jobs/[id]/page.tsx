'use client';

import Link from 'next/link';
import { Briefcase, MapPin, Clock, CheckCircle, ArrowLeft } from 'lucide-react';
import ApplicantLayout from '@/components/ApplicantLayout';

export default function JobDetailsPage() {
    return (
        <ApplicantLayout>
            <div className="max-w-5xl mx-auto space-y-12">
                <div className="flex items-center gap-2 mb-8 text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-slate-600 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    <Link href="/jobs">Back to all jobs</Link>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Main Content */}
                    <div className="flex-1 space-y-12">
                        <div className="bg-white rounded-3xl border border-slate-100 p-10 shadow-sm flex items-start gap-8">
                            <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400">
                                <Briefcase className="w-8 h-8" />
                            </div>
                            <div className="space-y-4 flex-1">
                                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Senior Software Engineer</h1>
                                <div className="flex flex-wrap gap-6 text-sm font-bold text-slate-500 uppercase tracking-widest">
                                    <span className="flex items-center gap-2"><Briefcase className="w-4 h-4" /> Engineering</span>
                                    <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Kigali, Rwanda</span>
                                    <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> Remote · Full-time</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl border border-slate-100 p-10 shadow-sm space-y-10">
                            <section className="space-y-4">
                                <h2 className="text-lg font-black text-slate-900">About this role</h2>
                                <p className="text-slate-600 leading-relaxed font-medium">
                                    We are looking for an experienced software engineer to join our engineering team and build modern web applications using React and TypeScript.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-lg font-black text-slate-900">Required Skills</h2>
                                <div className="flex flex-wrap gap-3">
                                    {['React', 'TypeScript', 'CSS', 'REST APIs', 'Git'].map(skill => (
                                        <span key={skill} className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl text-xs font-bold border border-emerald-100">
                                            <CheckCircle className="w-4 h-4 text-emerald-500" />
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-lg font-black text-slate-900">Nice to Have</h2>
                                <div className="flex flex-wrap gap-3">
                                    {['Next.js', 'GraphQL', 'AWS'].map(skill => (
                                        <span key={skill} className="bg-slate-100 text-slate-600 px-4 py-2 rounded-xl text-xs font-bold border border-slate-200">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </section>

                            <div className="grid grid-cols-2 gap-8 pt-6">
                                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
                                    <div className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-2">Experience</div>
                                    <div className="text-lg font-black text-slate-900">5+ years</div>
                                </div>
                                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
                                    <div className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-2">Education</div>
                                    <div className="text-lg font-black text-slate-900">Bachelor's</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar info */}
                    <div className="w-full lg:w-96 space-y-8">
                        <div className="bg-white rounded-3xl border border-slate-100 p-10 shadow-sm text-center">
                            <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-4">18 applicants</p>
                            <button className="w-full bg-[#0a0f24] hover:bg-slate-900 text-white font-black py-4 rounded-2xl shadow-xl transition-all mb-4">
                                Apply Now
                            </button>
                            <p className="text-[10px] text-slate-400 font-bold mb-4">Takes about 5 minutes</p>
                        </div>

                        <div className="bg-white rounded-3xl border border-slate-100 p-10 shadow-sm space-y-6">
                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest border-b border-slate-50 pb-4">Job Summary</h3>
                            {[
                                { label: 'Posted', value: '15 Mar 2024' },
                                { label: 'Type', value: 'Full-time' },
                                { label: 'Location', value: 'Remote' },
                                { label: 'Department', value: 'Engineering' },
                            ].map(item => (
                                <div key={item.label} className="flex justify-between items-center text-sm">
                                    <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">{item.label}</span>
                                    <span className="text-slate-900 font-bold">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </ApplicantLayout>
    );
}
