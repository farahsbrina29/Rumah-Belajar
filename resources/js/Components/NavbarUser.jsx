import { Link } from '@inertiajs/react';

export default function Navbar({ auth }) {
    return (
        <nav className="fixed top-0 left-0 w-full bg-white p-4 shadow-md z-50 flex space-x-4">
            <Link
                href={route('beranda')}
                className="text-154561 font-semibold text-lg hover:text-gray-200"
            >
                Beranda
            </Link>
            <Link
                href={route('konten')} // Menyesuaikan dengan perubahan di web.php
                className="text-154561 font-semibold text-lg hover:text-gray-200"
            >
                Konten
            </Link>
            <Link
                href={route('rangkuman')} // Menyesuaikan dengan perubahan di web.php
                className="text-154561 font-semibold text-lg hover:text-gray-200"
            >
                Rangkuman
            </Link>
           
            {auth.user ? (
                <Link
                    href={route('dashboard')}
                    className="text-154561 font-semibold text-lg hover:text-gray-200"
                >
                    Dashboard
                </Link>
            ) : (
                <>
                    <Link
                        href={route('login')}
                        className="text-154561 font-semibold text-lg hover:text-gray-200"
                    >
                        Log in
                    </Link>
                    <Link
                        href={route('register')}
                        className="rounded-md px-3 py-2 text-white bg-[#154561] hover:bg-[#d9211b] font-semibold transition focus:outline-none focus:ring-2 focus:ring-white"
                    >
                        Register
                    </Link>
                </>
            )}
        </nav>
    );
}
