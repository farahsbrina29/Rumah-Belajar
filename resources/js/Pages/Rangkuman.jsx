import React from "react";
import Navbar from "@/components/NavbarUser";  // Pastikan NavbarUser yang benar diimpor

export default function Rangkuman({ auth }) {
    return (
        <div>
            <Navbar auth={auth} />  {/* Menggunakan NavbarUser */}
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Halaman Konten</h1>
                {auth.user ? (
                    <p>Selamat datang, {auth.user.name}!</p>
                ) : (
                    <p>Anda belum login. Silakan login untuk mengakses konten lebih lanjut.</p>
                )}
            </div>
        </div>
    );
}
