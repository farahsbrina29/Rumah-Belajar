import { Link } from '@inertiajs/react';

export default function Navbar({ auth }) {
    return (
        <nav className="fixed top-0 left-0 w-full bg-blue-600 p-4 shadow-md z-50 flex space-x-4">
            <Link
                href={route('beranda')}
                className="text-white font-semibold text-lg hover:text-gray-200"
            >
                Beranda
            </Link>
            <Link
                href={route('tentang-kami')}
                className="text-white font-semibold text-lg hover:text-gray-200"
            >
                Tentang Kami
            </Link>
            <Link
                href={route('informasi-pendidikan')}
                className="text-white font-semibold text-lg hover:text-gray-200"
            >
                Informasi Pendidikan
            </Link>
            <Link
                href={route('informasi-kebudayaan')}
                className="text-white font-semibold text-lg hover:text-gray-200"
            >
                Informasi Kebudayaan
            </Link>
            {auth.user ? (
                <Link
                    href={route('dashboard')}
                    className="text-white font-semibold text-lg hover:text-gray-200"
                >
                    Dashboard
                </Link>
            ) : (
                <>
                    <Link
                        href={route('login')}
                        className="text-white font-semibold text-lg hover:text-gray-200"
                    >
                        Log in
                    </Link>
                    <Link
                        href={route('register')}
                        className="rounded-md px-3 py-2 text-white bg-[#FF2D20] hover:bg-[#d9211b] font-semibold transition focus:outline-none focus:ring-2 focus:ring-white"
                    >
                        Register
                    </Link>
                </>
            )}
        </nav>
    );
}
