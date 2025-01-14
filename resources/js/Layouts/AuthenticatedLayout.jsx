import { usePage } from '@inertiajs/react';
import NavbarUser from '@/Components/NavbarUser'; // Pastikan NavbarUser diimpor


export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    return (
        <div className="min-h-screen flex flex-col">
            {/* NavbarUser menggantikan penggunaan Navbar dan dropdown */}
            <NavbarUser auth={{ user }} />

            <main className="flex-grow">{children}</main>
        </div>
    );
}
