import Link from 'next/link';
import { Briefcase, Users, Sparkles, BarChart2, ArrowUpRight, ArrowDownRight, Eye } from 'lucide-react';

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
                    <div className="w-8 h-8 bg-[#1e2646] rounded-full flex items-center justify-center">X</div>
                    <div className="w-8 h-8 bg-[#1e2646] rounded-full flex items-center justify-center">in</div>
                    <div className="w-8 h-8 bg-[#1e2646] rounded-full flex items-center justify-center">gh</div>
                </div>
                <div className="mt-8">
                    <p className="text-xs mb-2">Get Rwanda talent insights</p>
                    <div className="flex">
                        <input type="email" placeholder="Enter your email" className="bg-[#1e2646] text-sm text-white rounded-l-md px-3 py-2 border border-white/10 focus:outline-none w-full" />
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md text-sm font-medium hover:bg-blue-700">Subscribe</button>
                    </div>
                </div>
            </div>

            <div className="flex gap-16">
                <div>
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Product</h4>
                    <ul className="space-y-3 text-sm">
                        <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">How it works</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Company</h4>
                    <ul className="space-y-3 text-sm">
                        <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Legal</h4>
                    <ul className="space-y-3 text-sm">
                        <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">GDPR</a></li>
                    </ul>
                </div>
            </div>
        </div>

        <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-white/10 flex justify-between items-center text-xs text-slate-500 relative z-10">
            <p>© 2026 Intore. All rights reserved.</p>
            <p className="italic">Built for recruiters who value fairness.</p>
        </div>
    </footer>
);

export default function DashboardPage() {
    return (
        <div className="min-h-full">
            <div className="p-8 pb-4">
                <h2 className="text-2xl font-bold text-slate-900">Good morning, Claudine.</h2>
                <p className="text-sm text-slate-500 mt-1">Friday, April 3, 2026</p>

                <div className="grid grid-cols-4 gap-6 mt-8">
                    {[
                        { title: 'Total Jobs Posted', value: '5', change: '+12% this week', trend: 'up', icon: Briefcase },
                        { title: 'Total Candidates', value: '69', change: '+8% this week', trend: 'up', icon: Users },
                        { title: 'Screenings Run', value: '4', change: '+25% this week', trend: 'up', icon: Sparkles },
                        { title: 'Avg Match Score', value: '62%', change: '-3% this week', trend: 'down', icon: BarChart2 },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                            <div className="flex justify-between items-start">
                                <div className="text-sm font-medium text-slate-500">{stat.title}</div>
                                <stat.icon className="w-5 h-5 text-slate-400" />
                            </div>
                            <div className="mt-4 text-3xl font-bold text-slate-900">{stat.value}</div>
                            <div className={`mt-2 flex items-center text-xs font-medium ${stat.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
                                {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                                {stat.change}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-3 gap-8 mt-8">
                    <div className="col-span-2">
                        <div className="bg-white rounded-xl shadow-sm border border-slate-100">
                            <div className="flex justify-between items-center p-6 border-b border-slate-100">
                                <h3 className="font-semibold text-slate-900">Recent jobs</h3>
                                <Link href="/dashboard/jobs" className="text-sm font-medium text-slate-500 hover:text-slate-700 flex items-center">
                                    View all <span className="ml-1">→</span>
                                </Link>
                            </div>
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-slate-100 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                        <th className="px-6 py-4">Job Title</th>
                                        <th className="px-6 py-4">Department</th>
                                        <th className="px-6 py-4">Applicants</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm">
                                    {[
                                        { title: 'Senior Software Engineer', dept: 'Engineering', apps: '18', status: 'Active' },
                                        { title: 'UI/UX Designer', dept: 'Design', apps: '24', status: 'Active' },
                                        { title: 'Data Analyst', dept: 'Data', apps: '0', status: 'Draft' },
                                        { title: 'Systems Engineer', dept: 'Infrastructure', apps: '12', status: 'Closed' },
                                        { title: 'Digital Marketing Lead', dept: 'Marketing', apps: '15', status: 'Active' },
                                    ].map((job, i) => (
                                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-blue-900">{job.title}</td>
                                            <td className="px-6 py-4 text-slate-500">{job.dept}</td>
                                            <td className="px-6 py-4 text-slate-900">{job.apps}</td>
                                            <td className="px-6 py-4 mb-2">
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${job.status === 'Active' ? 'bg-slate-100 text-slate-800' :
                                                        job.status === 'Draft' ? 'bg-slate-100 text-slate-500' :
                                                            'bg-slate-100 text-slate-400'
                                                    }`}>
                                                    {job.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-end w-full gap-1">
                                                    <Eye className="w-4 h-4" /> View
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="col-span-1">
                        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 h-full">
                            <h3 className="font-semibold text-slate-900 mb-6">Activity</h3>
                            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                                {[
                                    { text: 'Screening completed for Senior Software Engineer — 18 candidates ranked', time: '2 hours ago', icon: Sparkles },
                                    { text: 'Screening completed for UI/UX Designer — 24 candidates ranked', time: '1 day ago', icon: Sparkles },
                                    { text: 'New job posted: Data Analyst', time: '2 days ago', icon: null },
                                    { text: 'Screening completed for Digital Marketing Lead — 15 candidates ranked', time: '3 days ago', icon: Sparkles },
                                    { text: 'Systems Engineer position closed', time: '5 days ago', icon: null },
                                ].map((act, i) => (
                                    <div key={i} className="flex gap-4 items-start relative z-10">
                                        <div className="w-5 h-5 rounded-full flex items-center justify-center bg-transparent mt-0.5 flex-shrink-0">
                                            {act.icon ? <act.icon className="w-4 h-4 text-slate-500" /> : <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>}
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-900 leading-snug">
                                                {act.text.includes('Senior Software Engineer') ? (
                                                    <>Screening completed for <strong>Senior Software Engineer</strong> — 18 candidates ranked</>
                                                ) : act.text.includes('UI/UX Designer') ? (
                                                    <>Screening completed for <strong>UI/UX Designer</strong> — 24 candidates ranked</>
                                                ) : act.text.includes('Data Analyst') ? (
                                                    <>New job posted: <strong>Data Analyst</strong></>
                                                ) : act.text.includes('Digital Marketing Lead') ? (
                                                    <>Screening completed for <strong>Digital Marketing Lead</strong> — 15 candidates ranked</>
                                                ) : act.text.includes('Systems Engineer') ? (
                                                    <><strong>Systems Engineer</strong> position closed</>
                                                ) : (
                                                    act.text
                                                )}
                                            </p>
                                            <p className="text-xs text-slate-400 mt-1">{act.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
