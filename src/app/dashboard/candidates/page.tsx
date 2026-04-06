'use client';

import { Search, Filter, Eye, MoreHorizontal } from 'lucide-react';

const candidates = [
    { name: 'Amara Uwimana', role: 'Frontend Developer', tags: ['React', 'TypeScript', 'Node.js'], score: 92, appliedTo: 'Senior Software Engineer', initial: 'AU', color: 'bg-indigo-600' },
    { name: 'Jean Nshimiyimana', role: 'Full Stack Engineer', tags: ['React', 'JavaScript', 'Python'], score: 88, appliedTo: 'Senior Software Engineer', initial: 'JN', color: 'bg-emerald-600' },
    { name: 'Marie Hakizimana', role: 'UI Developer', tags: ['TypeScript', 'Next.js', 'Tailwind'], score: 85, appliedTo: 'Senior Software Engineer', initial: 'MH', color: 'bg-amber-500' },
    { name: 'Chantal Mukamana', role: 'React Developer', tags: ['React', 'Vue.js', 'CSS'], score: 82, appliedTo: 'Senior Software Engineer', initial: 'CM', color: 'bg-rose-500' },
    { name: 'Eric Bizimana', role: 'Software Engineer', tags: ['JavaScript', 'React', 'MongoDB'], score: 78, appliedTo: 'Senior Software Engineer', initial: 'EB', color: 'bg-blue-600' },
    { name: 'Fabiola Uwizeye', role: 'Web Developer', tags: ['React', 'TypeScript', 'Node.js'], score: 75, appliedTo: 'Senior Software Engineer', initial: 'FU', color: 'bg-teal-600' },
];

export default function CandidatesPage() {
    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Candidates</h2>
            </div>

            <div className="flex gap-4 mb-8">
                <div className="bg-white border border-slate-200 rounded-lg px-4 py-2 flex items-center gap-2 min-w-[200px]">
                    <span className="text-sm text-slate-500 font-medium">All Jobs</span>
                    <div className="ml-auto w-4 h-4 text-slate-400">⌄</div>
                </div>
                <div className="relative flex-1 max-w-sm">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Filter by skill..."
                        className="w-full bg-white text-sm text-slate-900 placeholder-slate-400 rounded-lg pl-9 pr-4 py-2 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {candidates.map((c, i) => (
                    <div key={i} className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-full ${c.color} flex items-center justify-center text-white font-bold text-sm`}>
                                    {c.initial}
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">{c.name}</h3>
                                    <p className="text-xs text-slate-500 font-medium">{c.role}</p>
                                </div>
                            </div>
                            <button className="text-slate-400 hover:text-slate-600">
                                <MoreHorizontal className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {c.tags.map(tag => (
                                <span key={tag} className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="space-y-2 mb-6">
                            <div className="flex justify-between items-center text-xs">
                                <div className="h-2 flex-1 bg-slate-100 rounded-full overflow-hidden mr-3">
                                    <div className={`h-full bg-emerald-500`} style={{ width: `${c.score}%` }}></div>
                                </div>
                                <span className="font-bold text-slate-900">{c.score}%</span>
                            </div>
                        </div>

                        <div className="text-[10px] text-slate-400 font-medium mb-4">
                            Applied for: <span className="text-slate-600">{c.appliedTo}</span>
                        </div>

                        <button className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-900 text-sm font-bold rounded-lg border border-slate-200 transition-colors">
                            View
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
