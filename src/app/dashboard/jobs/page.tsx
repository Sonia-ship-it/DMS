'use client';

import { Search, Plus, Filter, Eye, MoreHorizontal } from 'lucide-react';

const Footer = () => (
    <footer className="mt-12 bg-[#0a0f24] text-slate-300 py-16 px-8 rounded-tr-[4rem] relative overflow-hidden">
        <div className="absolute -bottom-[20%] -right-[10%] text-[200px] font-black text-white/5 leading-none tracking-tighter italic">
            INTORE
        </div>
        <div className="max-w-6xl w-full mx-auto relative z-10 flex flex-col md:flex-row justify-between gap-12">
            <div className="max-w-xs">
                <div className="flex items-center gap-2 mb-4 text-white">
                    <div className="w-6 h-6 rounded border-2 border-white flex items-center justify-center rotate-45">
                        <div className="w-2 h-2 bg-white rounded-sm"></div>
                    </div>
                    <span className="text-xl font-bold">Intore</span>
                </div>
                <p className="text-sm mb-6">Built for Rwanda. Powered by AI.</p>
                <div className="flex gap-4">
                    <div className="w-8 h-8 bg-[#1e2646] rounded-full flex items-center justify-center text-xs">X</div>
                    <div className="w-8 h-8 bg-[#1e2646] rounded-full flex items-center justify-center text-xs">in</div>
                    <div className="w-8 h-8 bg-[#1e2646] rounded-full flex items-center justify-center text-xs">gh</div>
                </div>
            </div>
            <div className="flex gap-16">
                <div>
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Product</h4>
                    <ul className="space-y-3 text-sm">
                        <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">How it works</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Legal</h4>
                    <ul className="space-y-3 text-sm">
                        <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-white/10 flex justify-between items-center text-xs text-slate-500 relative z-10">
            <p>© 2026 Intore. All rights reserved.</p>
        </div>
    </footer>
);

export default function JobsPage() {
    const jobs = [
        { title: 'Senior Software Engineer', dept: 'Engineering', location: 'Kigali, Rwanda', type: 'Remote', applicants: 18, status: 'Active', posted: '2024-03-15' },
        { title: 'UI/UX Designer', dept: 'Design', location: 'Kigali, Rwanda', type: 'Hybrid', applicants: 24, status: 'Active', posted: '2024-03-10' },
        { title: 'Data Analyst', dept: 'Data', location: 'Musanze, Rwanda', type: 'Remote', applicants: 0, status: 'Draft', posted: '2024-03-20' },
        { title: 'Systems Engineer', dept: 'Infrastructure', location: 'Kigali, Rwanda', type: 'Onsite', applicants: 12, status: 'Closed', posted: '2024-02-28' },
        { title: 'Digital Marketing Lead', dept: 'Marketing', location: 'Huye, Rwanda', type: 'Hybrid', applicants: 15, status: 'Active', posted: '2024-03-18' },
    ];

    return (
        <div className="h-full flex flex-col">
            <div className="p-8 pb-4 flex-1">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-slate-900">All Jobs</h2>
                    <button className="flex items-center gap-2 bg-[#303f9f] hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
                        <Plus className="w-4 h-4" />
                        Post New Job
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-4 border-b border-slate-100 flex items-center gap-4">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search jobs..."
                                className="w-full bg-slate-50 text-sm text-slate-900 placeholder-slate-500 rounded-lg pl-9 pr-4 py-2 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                            />
                        </div>
                        <select className="bg-slate-50 text-sm text-slate-900 rounded-lg px-3 py-2 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                            <option>All Departments</option>
                            <option>Engineering</option>
                            <option>Design</option>
                        </select>
                        <select className="bg-slate-50 text-sm text-slate-900 rounded-lg px-3 py-2 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                            <option>All Locations</option>
                            <option>Kigali</option>
                            <option>Musanze</option>
                        </select>
                    </div>

                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                <th className="px-6 py-4">Job Title</th>
                                <th className="px-6 py-4">Department</th>
                                <th className="px-6 py-4">Location</th>
                                <th className="px-6 py-4">Type</th>
                                <th className="px-6 py-4 text-center">Applicants</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Posted</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {jobs.map((job, i) => (
                                <tr key={i} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-6 py-4 font-semibold text-blue-800">{job.title}</td>
                                    <td className="px-6 py-4 text-slate-500">{job.dept}</td>
                                    <td className="px-6 py-4 text-slate-500">{job.location}</td>
                                    <td className="px-6 py-4">
                                        <span className="text-slate-600 bg-slate-100 px-2 py-1 rounded text-xs font-medium">
                                            {job.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center font-medium text-slate-900">{job.applicants}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${job.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                                                job.status === 'Draft' ? 'bg-slate-100 text-slate-600 border border-slate-200' :
                                                    'bg-rose-50 text-rose-700 border border-rose-100'
                                            }`}>
                                            {job.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500">{job.posted}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
                                                <Eye className="w-4 h-4" /> View
                                            </button>
                                            <button className="text-slate-400 hover:text-slate-600">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </div>
    );
}
