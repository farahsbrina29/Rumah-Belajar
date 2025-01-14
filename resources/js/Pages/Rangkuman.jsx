import React from "react";
import Navbar from "@/components/NavbarUser";  // Pastikan NavbarUser yang benar diimpor
import Footer from "@/components/Footer";  // Impor Footer

export default function Rangkuman({ auth }) {
    return (
        <div className="flex flex-col min-h-screen"> {/* Menggunakan flexbox dan min-h-screen untuk memastikan Footer selalu di bawah */}
            <Navbar auth={auth} />  {/* Menggunakan NavbarUser */}
            <div className="flex-1 p-4"> {/* Bagian konten agar dapat mengisi sisa ruang */}
                <h1 className="text-2xl font-bold mb-4">Halaman Konten</h1>
                {auth.user ? (
                    <p>Selamat datang, {auth.user.name}!</p>
                ) : (
                    <p>Anda belum login. Silakan login untuk mengakses konten lebih lanjut.</p>
                )}
            </div>
            
            {/* Footer akan selalu berada di bawah */}
            <Footer />
        </div>
    );
}
