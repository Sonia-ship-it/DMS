'use client';
import Link from 'next/link';
import { Briefcase, User } from 'lucide-react';
import { useState } from 'react';

export default function RegisterPage() {
    const [role, setRole] = useState<'recruiter' | 'applicant'>('recruiter');

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f7f9fc] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6">
                <div className="text-center mb-6">
                    <div className="flex justify-center items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded border-2 border-blue-900 flex items-center justify-center rotate-45">
                            <div className="w-3 h-3 bg-blue-900 rounded-sm"></div>
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Intore</h1>
                    </div>
                    <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">Create your account</h2>
                </div>

                <form className="space-y-4" action="#" method="POST">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700">Full Name</label>
                        <div className="mt-1">
                            <input id="name" name="name" type="text" required
                                className="appearance-none block w-full px-3 py-2 border border-slate-200 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
                        <div className="mt-1">
                            <input id="email" name="email" type="email" required
                                className="appearance-none block w-full px-3 py-2 border border-slate-200 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
                        <div className="mt-1">
                            <input id="password" name="password" type="password" required
                                className="appearance-none block w-full px-3 py-2 border border-slate-200 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700">Confirm Password</label>
                        <div className="mt-1">
                            <input id="confirmPassword" name="confirmPassword" type="password" required
                                className="appearance-none block w-full px-3 py-2 border border-slate-200 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                        </div>
                    </div>

                    <div className="pt-2">
                        <label className="block text-sm font-medium text-slate-700 mb-2">I am a...</label>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => setRole('recruiter')}
                                className={`relative flex flex-col items-center justify-center p-4 border rounded-lg ${role === 'recruiter' ? 'border-blue-600 bg-blue-50/50' : 'border-slate-200'} hover:bg-slate-50 transition-colors`}
                            >
                                {role === 'recruiter' && (
                                    <span className="absolute top-2 right-2 text-blue-600">✓</span>
                                )}
                                <Briefcase className={`w-6 h-6 mb-2 ${role === 'recruiter' ? 'text-blue-600' : 'text-slate-500'}`} />
                                <span className={`text-sm font-medium ${role === 'recruiter' ? 'text-slate-900' : 'text-slate-700'}`}>I'm a Recruiter</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole('applicant')}
                                className={`relative flex flex-col items-center justify-center p-4 border rounded-lg ${role === 'applicant' ? 'border-blue-600 bg-blue-50/50' : 'border-slate-200'} hover:bg-slate-50 transition-colors`}
                            >
                                {role === 'applicant' && (
                                    <span className="absolute top-2 right-2 text-blue-600">✓</span>
                                )}
                                <User className={`w-6 h-6 mb-2 ${role === 'applicant' ? 'text-blue-600' : 'text-slate-500'}`} />
                                <span className={`text-sm font-medium ${role === 'applicant' ? 'text-slate-900' : 'text-slate-700'}`}>I'm an Applicant</span>
                            </button>
                        </div>
                    </div>

                    <div className="pt-4">
                        <Link href="/dashboard" className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#303f9f] hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Create Account
                        </Link>
                    </div>
                </form>

                <p className="mt-4 text-center text-sm text-slate-600">
                    Already have an account?{' '}
                    <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500 inline-block">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
