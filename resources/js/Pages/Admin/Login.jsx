import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from '@inertiajs/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const { data, setData, processing } = useForm({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/admin/login', {
        email: data.email,
        password: data.password,
      });

      toast.success('Login berhasil');

      setTimeout(() => {
        window.location.href = '/admin/dashboard';
      }, 1200);

    } catch (error) {
      toast.error('Email atau kata sandi salah');
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
        pauseOnHover
      />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#2C3141] via-[#19386E] to-[#2C3141]">
        <div className="w-full max-w-2xl px-4">
          <div className="backdrop-blur-lg bg-white/10 rounded-lg shadow-2xl p-6">
            <div className="flex space-x-8">

              {/* LEFT */}
              <div className="flex flex-col items-center justify-center w-1/3">
                <img
                  src="/assets/logo final.png"
                  alt="Logo"
                  className="h-10 w-auto brightness-0 invert mb-2"
                />
                <h1 className="text-base font-semibold text-white">
                  Rumah Belajar
                </h1>
                <h2 className="text-xs text-white/80">Admin Panel</h2>
              </div>

              {/* RIGHT */}
              <div className="w-2/3">
                <form onSubmit={handleSubmit} className="space-y-3">

                  {/* EMAIL */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <svg className="h-4 w-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M16 12a4 4 0 10-8 0 4 4 0 008 0z" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      placeholder="Email"
                      value={data.email}
                      onChange={(e) => setData('email', e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-white/60 focus:outline-none"
                      required
                    />
                  </div>

                  {/* PASSWORD */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <svg className="h-4 w-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                      </svg>
                    </div>

                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Kata Sandi"
                      value={data.password}
                      onChange={(e) => setData('password', e.target.value)}
                      className="w-full pl-9 pr-10 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-white/60 focus:outline-none"
                      required
                    />

                    {/* TOGGLE ICON (MUNCUL JIKA ADA PASSWORD) */}
                    {data.password && (
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-3 flex items-center text-white/70 hover:text-white"
                      >
                        {showPassword ? (
                          // Eye Off
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.1.18-2.157.512-3.144M3 3l18 18" />
                          </svg>
                        ) : (
                          // Eye
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        )}
                      </button>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={processing}
                    className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-semibold"
                  >
                    LOGIN
                  </button>

                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
