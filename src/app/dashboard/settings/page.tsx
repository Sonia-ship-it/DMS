'use client';

import { Moon, User, Mail, Shield, Bell } from 'lucide-react';

export default function SettingsPage() {
    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-12">
                <h2 className="text-2xl font-bold text-slate-900">Settings</h2>
            </div>

            <div className="max-w-4xl space-y-8">
                {/* Profile Section */}
                <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-8 border-b border-slate-50 pb-4">Profile</h3>
                    <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Name</label>
                            <input
                                type="text"
                                defaultValue="Claudine U."
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">Email</label>
                            <input
                                type="email"
                                defaultValue="claudine@intore.rw"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Appearance Section */}
                <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-8 border-b border-slate-50 pb-4">Appearance</h3>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-bold text-slate-900">Dark Mode</p>
                            <p className="text-sm text-slate-500 font-medium mt-1">Switch between light and dark mode</p>
                        </div>
                        <button className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-6 py-3 text-slate-900 font-bold hover:bg-slate-100 transition-colors">
                            <Moon className="w-5 h-5 text-slate-500" />
                            Dark Mode
                        </button>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-blue-600/20 transition-all">
                        Save Changes
                    </button>
                    <button className="bg-slate-50 hover:bg-slate-100 text-slate-900 font-bold px-8 py-3 rounded-xl border border-slate-200 transition-all">
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
}
