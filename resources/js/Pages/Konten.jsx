import React, { useState } from "react";
import Navbar from "@/components/NavbarUser"; // Pastikan NavbarUser yang benar diimpor
import Footer from "@/components/Footer"; // Impor Footer
import PopupPilihJenjang from "@/components/PopupPilihJenjang"; // Impor Popup Pilih Jenjang

export default function Konten({ auth }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    if (!auth || !auth.user) {
        return (
            <div className="flex flex-col min-h-screen">
                <Navbar auth={auth} />
                <div className="flex-1 flex items-center justify-center">
                    <h1 className="text-xl font-bold text-[#154561]">Anda harus login untuk mengakses halaman ini.</h1>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-blue-100">
            <Navbar auth={auth} />
            <div className="flex-1 p-4">
                <h1 className="text-2xl font-bold mb-4">Halaman Konten Video</h1>

                {/* Pencarian dan Pilihan Jenjang */}
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6 mt-12">
                    <input
                        type="text"
                        placeholder="Cari video..."
                        className="border p-2 rounded-md flex-1"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        onClick={() => setIsPopupOpen(true)}
                        className="bg-[#154561] text-white px-4 py-2 rounded-md font-semibold"
                    >
                        Pilih Jenjang
                    </button>
                </div>

                {/* Grid Video */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {[...Array(8)].map((_, index) => (
                        <div
                            key={index}
                            className="border rounded-lg overflow-hidden shadow-md"
                        >
                            <div className="w-full h-48 bg-blue-200 flex items-center justify-center">
                                <span className="text-[#154561]">Video {index + 1}</span>
                            </div>
                            <div className="p-4 bg-white">
                                <h2 className="font-bold text-lg mb-2">Judul Video {index + 1}</h2>
                                <p className="text-sm text-gray-500">Jenjang</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />

            {/* Popup Pilih Jenjang */}
            <PopupPilihJenjang isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
        </div>
    );
}
