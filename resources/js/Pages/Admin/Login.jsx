import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import axios from 'axios'; // Tambahkan axios jika belum diimpor

const Login = () => {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Kirim permintaan login ke backend
            const response = await axios.post('/admin/login', {
                email: data.email,
                password: data.password,
            });

            // Simpan token ke localStorage
            const token = response.data.token; // Sesuaikan dengan properti token pada respons
            localStorage.setItem('token', token);

            alert('Login berhasil!');
            // Redirect ke dashboard admin
            window.location.href = '/admin/dashboard';
        } catch (error) {
            console.error('Login error:', error);
            alert('Login gagal. Silakan periksa kredensial Anda.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white shadow-md rounded px-8 py-6">
                <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full border px-3 py-2 rounded"
                        />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full border px-3 py-2 rounded"
                        />
                        {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
                    </div>
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-blue-500 text-white py-2 rounded"
                    >
                        {processing ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
