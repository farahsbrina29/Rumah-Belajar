import React from 'react';
import { useForm } from '@inertiajs/react';
import axios from 'axios';

const Login = () => {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/admin/login', {
                email: data.email,
                password: data.password,
            });

            const token = response.data.token;
            localStorage.setItem('token', token);

            alert('Login berhasil!');
            window.location.href = '/admin/dashboard';
        } catch (error) {
            console.error('Login error:', error);
            alert('Login gagal. Silakan periksa kredensial Anda.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#2C3141] via-[#19386E] to-[#2C3141]">
            <div className="w-full max-w-2xl px-4">
                {/* Transparent Login Container */}
                <div className="backdrop-blur-lg bg-white/10 rounded-lg shadow-2xl p-6">
                    <div className="flex space-x-8">
                        {/* Left side - Logo and title */}
                        <div className="flex flex-col items-center justify-center w-1/3">
                            <img src="/assets/logo final.png" alt="Logo" className="h-10 w-auto brightness-0 invert mb-2" />
                            <h1 className="text-base font-semibold text-white">Rumah Belajar</h1>
                            <h2 className="text-xs text-white/80">Admin Panel</h2>
                        </div>

                        {/* Right side - Login form */}
                        <div className="w-2/3">
                            <form onSubmit={handleSubmit} className="space-y-3">
                                <div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                            <svg className="h-4 w-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                            </svg>
                                        </div>
                                        <input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="Username"
                                            className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-white/60 focus:outline-none focus:border-white/30 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                            <svg className="h-4 w-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        </div>
                                        <input
                                            id="password"
                                            type="password"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            placeholder="Password"
                                            className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-white/60 focus:outline-none focus:border-white/30 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <label className="flex items-center">
                                        <input type="checkbox" className="rounded border-white/10 bg-white/5 text-blue-500 mr-2" />
                                        <span className="text-xs text-white/60">Remember me</span>
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-semibold transition-colors duration-200"
                                >
                                    LOGIN
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;