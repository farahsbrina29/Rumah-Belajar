import React, { useState } from "react";
import Navbar from "@/components/NavbarUser";  // Pastikan NavbarUser yang benar diimpor
import Footer from "@/components/Footer";  // Impor Footer
import PopupPilihJenjang from "@/components/PopupPilihJenjang";  // Impor Popup Pilih Jenjang

export default function Rangkuman({ auth }) {
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
            <div className="flex-1 p-4 pt-32"> {/* Increased padding top to pt-32 */}
                <h1 className="text-2xl font-bold text-center mb-4 text-[#154561]">
                    Telusuri rangkuman materi belajarmu di sini ✨
                </h1>

                {/* Pencarian dan Pilihan Jenjang */}
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6 mt-12">
                    <input
                        type="text"
                        placeholder="Cari rangkuman..."
                        className="border-[1px] border-gray-300 p-2 rounded-md flex-1"
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

                {/* Kotak Rangkuman Menurun tanpa tulisan */}
                <div className="flex flex-col gap-4 mt-6">
                    {[...Array(5)].map((_, index) => (
                        <div
                            key={index}
                            className="border rounded-lg overflow-hidden shadow-md"
                        >
                            <div className="w-full h-5 bg-blue-200" /> {/* Placeholder */}
                            <div className="p-4 bg-white">
                                <h2 className="font-bold text-lg mb-2">Judul Rangkuman {index + 1}</h2>
                                <p className="text-sm text-gray-500">Deskripsi singkat rangkuman {index + 1}.</p>
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
