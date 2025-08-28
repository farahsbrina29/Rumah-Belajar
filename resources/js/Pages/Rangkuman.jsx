import React, { useState, useEffect } from "react";
import { Head, router } from "@inertiajs/react";
import Navbar from "@/components/NavbarUser";
import Footer from "@/components/Footer";
import PopupPilihJenjang from "@/components/PopupPilihJenjang";
import axios from "axios";

export default function Rangkuman({ auth }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [submateriList, setSubmateriList] = useState([]);
    const [selectedJenjangId, setSelectedJenjangId] = useState(null);
    const [selectedJenjangName, setSelectedJenjangName] = useState("Pilih Jenjang");

    // ✅ tambahan state
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ✅ Fetch submateri + rangkuman dari API
    useEffect(() => {
        const fetchSubmateri = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/rangkuman/submateri");

                if (Array.isArray(response.data.data)) {
                    setSubmateriList(response.data.data);
                } else {
                    setError("Format data tidak valid.");
                }
            } catch (err) {
                console.error("Gagal mengambil data submateri:", err);
                setError("Gagal memuat rangkuman. Silakan coba lagi.");
            } finally {
                setLoading(false);
            }
        };

        fetchSubmateri();
    }, []);

    // ✅ Aksi ketika klik rangkuman → buka halaman /rangkuman/:nama_submateri
    const handleSelectRangkuman = (nama_submateri) => {
        if (!nama_submateri) {
            console.error("Nama Submateri belum ada");
            return;
        }
        router.visit(`/rangkuman/${nama_submateri}`);
    };

    if (!auth || !auth.user) {
        return (
            <div className="flex flex-col min-h-screen">
                <Navbar auth={auth} />
                <div className="flex-1 flex items-center justify-center">
                    <h1 className="text-xl font-bold text-[#154561]">
                        Anda harus login untuk mengakses halaman ini.
                    </h1>
                </div>
                <Footer />
            </div>
        );
    }

    // ✅ Handler pilih jenjang dari popup
    const handleSelectJenjang = (jenjangId, jenjangName) => {
        setSelectedJenjangId(jenjangId);
        setSelectedJenjangName(jenjangName);
    };

    // ✅ Filtering submateri berdasarkan jenjang & search
    const filteredSubmateri = submateriList.filter((submateri) => {
        const matchesJenjang = selectedJenjangId
            ? String(submateri.id_jenjang) === String(selectedJenjangId)
            : true;
        const matchesSearch = submateri.nama_submateri
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        return matchesJenjang && matchesSearch;
    });

    return (
        <div className="flex flex-col min-h-screen bg-blue-100">
            <Navbar auth={auth} />
            <div className="flex-1 p-4 pt-32">
                <h1 className="text-2xl font-bold text-center mb-4 text-[#154561]">
                    Telusuri rangkuman materi belajarmu di sini ✨
                </h1>

                {/* 🔍 Search + Pilih Jenjang */}
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
                        className="bg-[#154561] text-white px-6 py-2 rounded-md font-semibold w-full sm:w-auto"
                    >
                        {selectedJenjangName}
                    </button>
                </div>

                {/* 📚 List Rangkuman */}
                {loading ? (
                    // Skeleton loading
                    <div className="flex flex-col gap-4 mt-6">
                        {Array.from({ length: 6 }).map((_, idx) => (
                            <div
                                key={idx}
                                className="border rounded-lg overflow-hidden shadow-md bg-white animate-pulse"
                            >
                                <div className="w-full h-5 bg-gray-300" />
                                <div className="p-4">
                                    <div className="h-4 bg-gray-300 rounded mb-2 w-2/3"></div>
                                    <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <p className="text-center text-red-500 mt-6">{error}</p>
                ) : filteredSubmateri.length > 0 ? (
                    <div className="flex flex-col gap-4 mt-6">
                        {filteredSubmateri.map((submateri) => (
                            <div
                                key={submateri.id_rangkuman}
                                className="border rounded-lg overflow-hidden shadow-md cursor-pointer"
                                onClick={() => handleSelectRangkuman(submateri.nama_submateri)}
                            >
                                <div className="w-full h-5 bg-[#B9C9DA]" />
                                <div className="p-4 bg-white">
                                    <h2 className="font-bold text-lg mb-2">
                                        {submateri.nama_submateri}
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        {submateri.nama_jenjang} - {submateri.nama_pelajaran}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-600 mt-6">
                        Tidak ada rangkuman yang sesuai.
                    </p>
                )}
            </div>

            <Footer />

            {/* 📌 Popup Pilih Jenjang */}
            <PopupPilihJenjang
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                onSelectJenjang={handleSelectJenjang}
            />
        </div>
    );
}
