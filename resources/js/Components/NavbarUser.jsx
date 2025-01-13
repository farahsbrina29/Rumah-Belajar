import { Link } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';  // Pastikan komponen Dropdown diimpor

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
                href={route('konten')}
                className="text-154561 font-semibold text-lg hover:text-gray-200"
            >
                Konten
            </Link>
            <Link
                href={route('rangkuman')}
                className="text-154561 font-semibold text-lg hover:text-gray-200"
            >
                Rangkuman
            </Link>

            {auth.user ? (
                <div className="flex items-center space-x-4">
                   

                    <Dropdown>
                        <Dropdown.Trigger>
                            <span className="inline-flex rounded-md">
                                <button
                                    type="button"
                                    className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
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
                </div>
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
