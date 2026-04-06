import Link from 'next/link';

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f7f9fc] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-8">
                <div className="text-center">
                    <div className="flex justify-center items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded border-2 border-blue-900 flex items-center justify-center rotate-45">
                            <div className="w-3 h-3 bg-blue-900 rounded-sm"></div>
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Intore</h1>
                    </div>
                    <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">Welcome back</h2>
                    <p className="mt-2 text-sm text-slate-500">Sign in to your account</p>
                </div>

                <form className="mt-8 space-y-6" action="#" method="POST">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                                Email
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    placeholder="you@example.com"
                                    className="appearance-none block w-full px-3 py-2 border border-slate-200 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    placeholder="••••••••"
                                    className="appearance-none block w-full px-3 py-2 border border-slate-200 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-700">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                Forgot password?
                            </a>
                        </div>
                    </div>

                    <div>
                        <Link href="/dashboard" className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#303f9f] hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Sign In
                        </Link>
                    </div>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-slate-500">or</span>
                        </div>
                    </div>

                    <div className="mt-6">
                        <button className="w-full flex justify-center py-2.5 px-4 border border-slate-200 rounded-lg shadow-sm bg-slate-50 text-sm font-medium text-slate-700 hover:bg-slate-100">
                            Sign in with Google
                        </button>
                    </div>
                </div>

                <p className="mt-2 text-center text-sm text-slate-600">
                    Don't have an account?{' '}
                    <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500 inline-block">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}
