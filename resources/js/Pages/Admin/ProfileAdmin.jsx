import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import AdminNavbar from '@/Components/AdminNavbar';

export default function ProfileAdmin({ auth }) {
    const admin = auth?.user;
    const { data, setData, errors, put, processing, reset } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();
        put(route('admin.password.update'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AdminNavbar>
            <div className="flex-grow p-6">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-2xl font-bold">Informasi Profil</h1>

                    <div className="mt-4">
                        <h2 className="text-lg font-semibold">Akun Admin</h2>
                        <div>
                            <InputLabel htmlFor="email" value="Email" />
                            <TextInput
                                id="email"
                                className="mt-1 block w-full bg-gray-100"
                                value={admin?.email || 'Email not available'}
                                readOnly
                            />
                        </div>
                    </div>

                    {/* Update Password Form */}
                    <div className="mt-4">
                        <h2 className="text-lg font-semibold">Ubah Kata Sandi</h2>
                    </div>
                    <form onSubmit={updatePassword} className="mt-6 space-y-6">
                        <div>
                            <InputLabel htmlFor="current_password" value="Kata Sandi Sekarang" />
                            <TextInput
                                id="current_password"
                                value={data.current_password}
                                onChange={(e) => setData('current_password', e.target.value)}
                                type="password"
                                className="mt-1 block w-full"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="password" value="Kata Sandi Baru" />
                            <TextInput
                                id="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                type="password"
                                className="mt-1 block w-full"
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="password_confirmation" value="Konfirmasi Kata Sandi" />
                            <TextInput
                                id="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                type="password"
                                className="mt-1 block w-full"
                            />
                        </div>

                        <PrimaryButton disabled={processing}>Perbaharui Kata Sandi</PrimaryButton>

                        {errors && (
                            <div className="mt-4 text-red-500">
                                {Object.values(errors).map((err, index) => (
                                    <p key={index}>{err}</p>
                                ))}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </AdminNavbar>
    );
}
