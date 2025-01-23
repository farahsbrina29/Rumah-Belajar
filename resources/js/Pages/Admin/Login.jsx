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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
            <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-4">
                <h2 className="text-center text-lg font-bold text-gray-700 mb-4">Admin Login</h2>

                <div className="flex justify-center my-4">
                    <img src="/assets/logorbn.png" alt="Logo" className="h-16 w-auto" />
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-[#154561] text-white py-2 rounded-md shadow-md focus:outline-none focus:ring focus:ring-blue-200"
                    >
                        {processing ? 'Logging in...' : 'Log in'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
