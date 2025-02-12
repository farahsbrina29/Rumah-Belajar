import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 relative overflow-hidden">
            {/* Wave Background */}
            <div className="absolute top-0 left-0 right-0 h-48 bg-blue-200 rounded-b-[50%] transform translate-y-[-30%]" />
            
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6 relative z-10">
                {/* Logo and Title */}
                <div className="flex flex-col items-center space-y-1 mb-6">
                    <h1 className="text-lg font-bold text-[#154561]">Rumah Belajar</h1>
                    <img src="/assets/logo final.png" alt="Logo" className="h-12 w-20 object-contain" />
                    <p className="text-xs text-gray-500 text-center mt-1">
                        Create your account to join our learning community
                    </p>
                </div>

                <form onSubmit={submit} className="space-y-4">
                    {/* Name Input */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="w-full pl-10 pr-4 py-2 border border-blue-100 rounded-xl bg-blue-50/30 text-sm"
                            placeholder="Full Name"
                            autoComplete="name"
                            isFocused={true}
                            onChange={handleOnChange}
                            required
                        />
                        <InputError message={errors.name} className="text-xs mt-1" />
                    </div>

                    {/* Email Input */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="w-full pl-10 pr-4 py-2 border border-blue-100 rounded-xl bg-blue-50/30 text-sm"
                            placeholder="Email Address"
                            autoComplete="username"
                            onChange={handleOnChange}
                            required
                        />
                        <InputError message={errors.email} className="text-xs mt-1" />
                    </div>

                    {/* Password Input */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="w-full pl-10 pr-4 py-2 border border-blue-100 rounded-xl bg-blue-50/30 text-sm"
                            placeholder="Password"
                            autoComplete="new-password"
                            onChange={handleOnChange}
                            required
                        />
                        <InputError message={errors.password} className="text-xs mt-1" />
                    </div>

                    {/* Confirm Password Input */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="w-full pl-10 pr-4 py-2 border border-blue-100 rounded-xl bg-blue-50/30 text-sm"
                            placeholder="Confirm Password"
                            autoComplete="new-password"
                            onChange={handleOnChange}
                            required
                        />
                        <InputError message={errors.password_confirmation} className="text-xs mt-1" />
                    </div>

                    {/* Role Selection */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <select
                            id="role"
                            name="role"
                            value={data.role}
                            onChange={handleOnChange}
                            required
                            className="w-full pl-10 pr-4 py-2 border border-blue-100 rounded-xl bg-blue-50/30 text-sm appearance-none"
                        >
                            <option value="">Select Role</option>
                            <option value="Siswa">Siswa</option>
                            <option value="Orangtua">Orangtua</option>
                            <option value="Guru">Guru</option>
                            <option value="Umum">Umum</option>
                        </select>
                        <InputError message={errors.role} className="text-xs mt-1" />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                        <PrimaryButton
                            className="w-full py-2 bg-blue-200 hover:bg-blue-300 text-white rounded-xl text-center justify-center text-sm"
                            disabled={processing}
                        >
                            Create Account
                        </PrimaryButton>
                    </div>

                    {/* Login Link */}
                    <div className="text-center mt-4">
                        <Link
                            href={route('login')}
                            className="text-xs text-gray-600 hover:text-blue-500 transition-colors duration-200"
                        >
                            Already have an account? Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}