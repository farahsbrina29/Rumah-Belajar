import { Link } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';

export default function Navbar({ auth }) {
    return (
        <nav className="fixed top-0 left-0 w-full bg-white p-4 shadow-md z-50 flex items-center justify-between">
            {/* Logo dan Nama */}
            <div className="flex items-center space-x-2">
                <img
                    src="/path-to-your-logo.png" // Ganti dengan path logo Anda
                    alt="Logo"
                    className="h-8 w-8"
                />
                <span className="text-sm font-bold" style={{ color: '#154561' }}>Rumah Belajar NTB</span>
            </div>

            {/* Link Tengah */}
            <div className="flex space-x-4">
                <Link
                    href={route('beranda')}
                    className="text-154561 font-semibold text-sm hover:text-gray-200"
                    style={{ color: '#154561' }}
                >
                    Beranda
                </Link>
                <Link
                    href={route('konten')}
                    className="text-154561 font-semibold text-sm hover:text-gray-200"
                    style={{ color: '#154561' }}
                >
                    Konten
                </Link>
                <Link
                    href={route('rangkuman')}
                    className="text-154561 font-semibold text-sm hover:text-gray-200"
                    style={{ color: '#154561' }}
                >
                    Rangkuman
                </Link>
            </div>

            {/* Profil atau Login/Register */}
            <div className="flex items-center space-x-4">
                {auth.user ? (
                    <Dropdown>
                        <Dropdown.Trigger>
                            <span className="inline-flex rounded-md">
                                <button
                                    type="button"
                                    className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-semibold leading-4 text-154561 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                    style={{ color: '#154561' }}
                                >
                                    {auth.user.name}
                                    <svg
                                        className="-me-0.5 ms-2 h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </span>
                        </Dropdown.Trigger>

                        <Dropdown.Content>
                            <Dropdown.Link href={route('profile.edit')}>
                                Profile
                            </Dropdown.Link>
                            <Dropdown.Link
                                href={route('logout')}
                                method="post"
                                as="button"
                            >
                                Log Out
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                ) : (
                    <>
                        <Link
                            href={route('login')}
                            className="text-154561 font-semibold text-sm hover:text-gray-200"
                            style={{ color: '#154561' }}
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
            </div>
        </nav>
    );
}
