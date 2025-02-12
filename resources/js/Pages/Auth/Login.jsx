import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 relative overflow-hidden">
            {/* Wave Background */}
            <div className="absolute top-0 left-0 right-0 h-48 bg-blue-200 rounded-b-[50%] transform translate-y-[-30%]" />
            
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6 relative z-10">
                <Head title="Log in" />

                <div className="flex flex-col items-center space-y-1 mb-6">
                    <h1 className="text-lg font-bold text-[#154561]">Rumah Belajar</h1>
                    <img src="/assets/logo final.png" alt="Logo" className="h-12 w-20 object-contain" />
                </div>

                {status && (
                    <div className="mb-4 bg-green-50 text-green-600 p-2 rounded-xl text-xs">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <InputLabel htmlFor="email" value="Email" className="text-gray-600 text-sm font-medium" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="w-full p-2 border border-blue-100 rounded-xl bg-blue-50/30 text-sm"
                            autoComplete="username"
                            isFocused={true}
                            onChange={handleOnChange}
                        />
                        <InputError message={errors.email} className="text-xs" />
                    </div>

                    <div>
                        <InputLabel htmlFor="password" value="Password" className="text-gray-600 text-sm font-medium" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="w-full p-2 border border-blue-100 rounded-xl bg-blue-50/30 text-sm"
                            autoComplete="current-password"
                            onChange={handleOnChange}
                        />
                        <InputError message={errors.password} className="text-xs" />
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                value={data.remember}
                                onChange={handleOnChange}
                                className="text-blue-200"
                            />
                            <span className="ml-2 text-xs text-gray-600">Remember me</span>
                        </label>

                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-xs text-gray-600"
                            >
                                Forgot password?
                            </Link>
                        )}
                    </div>

                    <div className="flex flex-col space-y-3 pt-2">
                        <PrimaryButton
                            className="w-full py-2 bg-blue-200 hover:bg-blue-300 text-white rounded-xl text-center justify-center text-sm"
                            disabled={processing}
                        >
                            Log in
                        </PrimaryButton>

                        <div className="text-center">
                            <Link
                                href={route('register')}
                                className="text-xs text-gray-600 hover:text-blue-500 transition-colors duration-200"
                            >
                                Don't have an account? Register
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}