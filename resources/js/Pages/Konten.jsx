import React, { useState, useEffect } from "react";
import { Head, router } from '@inertiajs/react';
import axios from "axios";
import Navbar from "@/components/NavbarUser";
import Footer from "@/components/Footer";
import PopupPilihJenjang from "@/components/PopupPilihJenjang";

export default function Konten({ auth }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [submaterialList, setSubmaterialList] = useState([]);
    const [filteredSubmaterial, setFilteredSubmaterial] = useState([]);
    const [jenjangList, setJenjangList] = useState([]);
    const [selectedJenjang, setSelectedJenjang] = useState(null);

    // ✅ tambahan state
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        Promise.all([
            axios.get("http://localhost:8000/api/submaterial"),
            axios.get("http://localhost:8000/api/jenjang")
        ])
        .then(([subResponse, jenjangResponse]) => {
            setSubmaterialList(subResponse.data);
            setFilteredSubmaterial(subResponse.data);
            setJenjangList(jenjangResponse.data);
        })
        .catch((err) => {
            console.error("Error fetching data:", err);
            setError("Gagal memuat konten. Silakan coba lagi.");
        })
        .finally(() => {
            setLoading(false);
        });
    }, []);

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

    const handleSelectJenjang = (nama) => {
    const normalized = (nama || "").trim();
    const noFilter =
        !normalized ||
        normalized.toLowerCase() === "pilih jenjang" ||
        normalized.toLowerCase() === "semua jenjang";

    if (noFilter) {
        setSelectedJenjang(null);                // label tombol kembali ke placeholder
        setFilteredSubmaterial(submaterialList); // tampilkan semua konten
        return;
    }

    setSelectedJenjang(normalized);
    setFilteredSubmaterial(
        submaterialList.filter(
        (sub) => (sub.jenjang || "").toLowerCase() === normalized.toLowerCase()
        )
    );
    };


    const filteredBySearch = filteredSubmaterial.filter(sub =>
        sub.konten?.[0]?.judul_konten?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col min-h-screen bg-blue-100">
            <Navbar auth={auth} />
            <div className="flex-1 p-4 pt-32">
                <h1 className="text-2xl font-bold text-center mb-4 text-[#154561]">
                    Telusuri Berbagai Konten Menarik 🚀
                </h1>

                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6 mt-12">
                    <input
                        type="text"
                        placeholder="Cari video..."
                        className="border-[1px] border-gray-300 p-2 rounded-md flex-1"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        onClick={() => setIsPopupOpen(true)}
                        className="bg-[#154561] text-white px-6 py-2 rounded-md font-semibold w-full sm:w-auto"
                    >
                        {selectedJenjang ? selectedJenjang : "Pilih Jenjang"}
                    </button>
                </div>

                {/* 🔥 Bagian konten */}
                {loading ? (
                    // Skeleton grid loading
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {Array.from({ length: 8 }).map((_, idx) => (
                            <div
                                key={idx}
                                className="border rounded-lg overflow-hidden shadow-md bg-white animate-pulse"
                            >
                                <div className="w-full h-48 bg-gray-300"></div>
                                <div className="p-4">
                                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500 py-10">{error}</div>
                ) : filteredBySearch.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredBySearch.map((sub) => (
                            <div
                                key={sub.nama_submateri}
                                onClick={() =>
                                    router.visit(
                                        `/konten/${encodeURIComponent(sub.mata_pelajaran)}/${encodeURIComponent(sub.jenjang)}/${encodeURIComponent(sub.nama_submateri)}`
                                    )
                                }
                                className="cursor-pointer border rounded-lg overflow-hidden shadow-md bg-white hover:shadow-lg transition"
                            >
                                <img
                                    src={sub.konten?.[0]?.thumbnail || "https://via.placeholder.com/300"}
                                    alt={sub.konten?.[0]?.judul_konten || sub.nama_submateri}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h2 className="font-bold text-lg text-center mb-2 text-[#154561]">
                                        {sub.konten?.[0]?.judul_konten || sub.nama_submateri}
                                    </h2>
                                    <p className="text-sm text-gray-500 text-center">
                                        {sub.jenjang || "Tidak Diketahui"} - {sub.mata_pelajaran || "Tidak Diketahui"}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-600 py-10">
                        Tidak ada konten ditemukan
                    </div>
                )}
            </div>

            <Footer />

            <PopupPilihJenjang 
                isOpen={isPopupOpen} 
                onClose={() => setIsPopupOpen(false)} 
                onSelectJenjang={(id, nama) => handleSelectJenjang(nama)} 
            />
        </div>
    );
}
