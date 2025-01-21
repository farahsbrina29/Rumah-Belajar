import { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import AdminSidebar from '@/Components/AdminSidebar';

export default function ProfileAdmin({ auth }) {  // Tambahkan props auth
    const [admin, setAdmin] = useState(auth.user); // Gunakan data auth langsung
    const { data, setData, errors, put, processing, reset } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    // Hapus useEffect fetch karena kita sudah dapat data dari props

    const updatePassword = (e) => {
        e.preventDefault();
        put(route('admin.password.update'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="flex">
            <AdminSidebar />
            <div className="container mx-auto mt-6">
                <h1 className="text-2xl font-bold">Profile Page</h1>

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
                        <InputLabel htmlFor="current_password" value="Current Password" />
                        <TextInput
                            id="current_password"
                            value={data.current_password}
                            onChange={(e) => setData('current_password', e.target.value)}
                            type="password"
                            className="mt-1 block w-full"
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="password" value="New Password" />
                        <TextInput
                            id="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            type="password"
                            className="mt-1 block w-full"
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                        <TextInput
                            id="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            type="password"
                            className="mt-1 block w-full"
                        />
                    </div>

                    <PrimaryButton disabled={processing}>Update Password</PrimaryButton>

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
    );
}
