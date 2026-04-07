import { Link } from '@inertiajs/react'
import { useState } from 'react'
import Dropdown from '@/components/Dropdown'

export default function Navbar({ auth }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    return (
        <>
            {/* NAVBAR */}
            <nav className="fixed top-0 left-0 w-full bg-white p-4 shadow-md z-50 flex items-center justify-between">
                {/* LOGO */}
                <div className="flex items-center space-x-2">
                    <img
                        src="/assets/logo final.png"
                        alt="Logo"
                        className="h-7 w-auto"
                    />
                    <span className="text-sm font-bold text-[#154561]">
                        Rumah Belajar
                    </span>
                </div>

                {/* HAMBURGER (MOBILE) */}
                <button
                    className="block md:hidden text-[#154561]"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>

                {/* MENU DESKTOP */}
                <div className="hidden md:flex space-x-6">
                    <Link href={route('beranda')} className="font-semibold text-sm text-[#154561]">
                        Beranda
                    </Link>

                    <Link href={route('konten')} className="font-semibold text-sm text-[#154561]">
                        Konten
                    </Link>

                    <Link href={route('rangkuman.index')} className="font-semibold text-sm text-[#154561]">
                        Rangkuman
                    </Link>
                </div>

                {/* AUTH DESKTOP */}
                <div className="hidden md:flex items-center space-x-4">
                    {auth?.user ? (
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button className="flex items-center text-sm font-semibold text-[#154561]">
                                    {auth.user.name}
                                    <svg className="ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293
                                            a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd" />
                                    </svg>
                                </button>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                <Dropdown.Link href={route('profile.edit')}>
                                    Profil
                                </Dropdown.Link>

                                <Dropdown.Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                >
                                    Keluar
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    ) : (
                        <>
                            <Link href={route('login')} className="font-semibold text-sm text-[#154561]">
                                Log in
                            </Link>
                            <Link
                                href={route('register')}
                                className="px-3 py-1 rounded-md bg-[#154561] text-white font-semibold"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </nav>

            {/* SIDEBAR MOBILE */}
            {isSidebarOpen && (
                <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-md z-50 p-4">
                    <button
                        className="mb-6 text-[#154561]"
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        ✕
                    </button>

                    <div className="flex flex-col space-y-3">
                        <Link href={route('beranda')} className="font-semibold text-sm text-[#154561]">
                            Beranda
                        </Link>

                        <Link href={route('konten')} className="font-semibold text-sm text-[#154561]">
                            Konten
                        </Link>

                        <Link href={route('rangkuman.index')} className="font-semibold text-sm text-[#154561]">
                            Rangkuman
                        </Link>

                        <hr />

                        {auth?.user ? (
                            <>
                                <Link href={route('profile.edit')} className="font-semibold text-sm text-[#154561]">
                                    Profil
                                </Link>

                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="font-semibold text-sm text-[#154561] text-left"
                                >
                                    Log Out
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href={route('login')} className="font-semibold text-sm text-[#154561]">
                                    Log in
                                </Link>

                                <Link
                                    href={route('register')}
                                    className="px-3 py-2 rounded-md bg-[#154561] text-white font-semibold"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}
