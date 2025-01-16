// resources/js/Components/AdminSidebar.jsx
import React from "react";
import { Link } from '@inertiajs/react';

const AdminSidebar = () => {
    return (
        <div className="bg-gray-900 text-white w-64 min-h-screen">
            <div className="p-4">
                <img src="/logo.png" alt="Logo" className="h-16 mx-auto" />
                <h1 className="text-center font-bold mt-4">RUMAH BELAJAR NTB</h1>
            </div>
            <nav className="mt-6">
                <Link href="/admin/dashboard" className="block px-4 py-2 hover:bg-gray-800">
                    Dashboard
                </Link>
                <Link href="/admin/PageUser" className="block px-4 py-2 hover:bg-gray-800">
                    Pengguna
                </Link>
                <Link href="/admin/PageContent" className="block px-4 py-2 hover:bg-gray-800">
                    Konten
                </Link>
            </nav>
            <div className="mt-auto">
                <Link href="/admin/logout" method="post" className="block px-4 py-2 hover:bg-red-800">
                    Logout
                </Link>
            </div>
        </div>
    );
};

export default AdminSidebar;
