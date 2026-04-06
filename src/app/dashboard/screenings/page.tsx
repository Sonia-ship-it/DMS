'use client';

import { Sparkles, Eye, MoreHorizontal, Calendar, Users, BarChart2 } from 'lucide-react';

const screenings = [
    { jobTitle: 'Senior Frontend Developer', date: '2024-03-20', candidates: 18, topScore: 92, avgScore: 65, status: 'Completed' },
    { jobTitle: 'Product Designer', date: '2024-03-18', candidates: 24, topScore: 88, avgScore: 61, status: 'Completed' },
    { jobTitle: 'DevOps Engineer', date: '2024-03-05', candidates: 12, topScore: 79, avgScore: 58, status: 'Completed' },
    { jobTitle: 'Marketing Manager', date: '2024-03-19', candidates: 15, topScore: 85, avgScore: 63, status: 'Completed' },
];

export default function ScreeningsPage() {
    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Screening History</h2>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-100 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            <th className="px-6 py-4">Job Title</th>
                            <th className="px-6 py-4">Date Run</th>
                            <th className="px-6 py-4 text-center">Candidates</th>
                            <th className="px-6 py-4">Top Score</th>
                            <th className="px-6 py-4">Avg Score</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                        {screenings.map((s, i) => (
                            <tr key={i} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-5 font-semibold text-slate-900">{s.jobTitle}</td>
                                <td className="px-6 py-5 text-slate-500 font-medium">{s.date}</td>
                                <td className="px-6 py-5 text-center text-slate-900 font-medium">{s.candidates}</td>
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className="h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-500" style={{ width: `${s.topScore}%` }}></div>
                                        </div>
                                        <span className="font-bold text-slate-900">{s.topScore}%</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className="h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-amber-500" style={{ width: `${s.avgScore}%` }}></div>
                                        </div>
                                        <span className="font-bold text-slate-900">{s.avgScore}%</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                                        {s.status}
                                    </span>
                                </td>
                                <td className="px-6 py-5 text-right">
                                    <button className="text-blue-600 hover:text-blue-800 font-bold text-sm">
                                        View Results
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
