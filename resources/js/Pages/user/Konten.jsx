import React, { useState, useEffect } from "react";
import { Head, router } from "@inertiajs/react";
import axios from "axios";

import Navbar from "@/Components/NavbarUser";
import Footer from "@/Components/Footer";
import PopupPilihJenjang from "@/Components/PopupPilihJenjang";

export default function Konten({ auth }) {
    /*   STATE*/
    const [searchTerm, setSearchTerm] = useState("");
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const [submaterialList, setSubmaterialList] = useState([]);
    const [filteredSubmaterial, setFilteredSubmaterial] = useState([]);
    const [jenjangList, setJenjangList] = useState([]);
    const [selectedJenjang, setSelectedJenjang] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /*  FETCH DATA*/
    useEffect(() => {
        setLoading(true);
        setError(null);

        Promise.all([
            axios.get("/api/submaterial", { withCredentials: true }),
            axios.get("/api/jenjangg", { withCredentials: true })
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

    /*   AUTH GUARD (FRONTEND)*/
    if ( !auth?.user) {
        router.visit('/login');
    }

    /*  FILTER JENJANG*/
    const handleSelectJenjang = (nama) => {
        const normalized = (nama || "").trim().toLowerCase();

        const noFilter =
            !normalized ||
            normalized === "pilih jenjang" ||
            normalized === "semua jenjang";

        if (noFilter) {
            setSelectedJenjang(null);
            setFilteredSubmaterial(submaterialList);
            return;
        }

        setSelectedJenjang(nama);
        setFilteredSubmaterial(
            submaterialList.filter(
                (sub) =>
                    (sub.jenjang || "").toLowerCase() === normalized
            )
        );
    };

    /* FILTER SEARCH */
    const filteredBySearch = filteredSubmaterial.filter((sub) =>
        sub.konten?.[0]?.judul_konten
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

  
    return (
        <div className="min-h-screen flex flex-col bg-blue-100">
            <Head title="Konten Pembelajaran" />

            <Navbar auth={auth} />

            <div className="flex-1 p-4 pt-32 min-h-[calc(100vh-160px)]">
                <h1 className="text-2xl font-bold text-center mb-4 text-[#154561]">
                    Telusuri Berbagai Konten Menarik 🚀
                </h1>

                {/* SEARCH & FILTER */}
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6 mt-12">
                    <input
                        type="text"
                        placeholder="Cari video..."
                        className="border border-gray-300 p-2 rounded-md flex-1"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <button
                        onClick={() => setIsPopupOpen(true)}
                        className="bg-[#154561] text-white px-6 py-2 rounded-md font-semibold w-full sm:w-auto"
                    >
                        {selectedJenjang || "Pilih Jenjang"}
                    </button>
                </div>

                {/* CONTENT */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {Array.from({ length: 8 }).map((_, idx) => (
                            <div
                                key={idx}
                                className="border rounded-lg overflow-hidden shadow-md bg-white animate-pulse"
                            >
                                <div className="w-full h-48 bg-gray-300" />
                                <div className="p-4">
                                    <div className="h-4 bg-gray-300 rounded mb-2" />
                                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500 py-10">
                        {error}
                    </div>
                ) : filteredBySearch.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredBySearch.map((sub) => (
                            <div
                                key={sub.nama_submateri}
                                onClick={() =>
                                    router.visit(
                                        `/konten/${encodeURIComponent(
                                            sub.mata_pelajaran
                                        )}/${encodeURIComponent(
                                            sub.jenjang
                                        )}/${encodeURIComponent(
                                            sub.nama_submateri
                                        )}`
                                    )
                                }
                                className="cursor-pointer border rounded-lg overflow-hidden shadow-md bg-white hover:shadow-lg transition"
                            >
                                <img
                                    src={
                                        sub.konten?.[0]?.thumbnail ||
                                        "https://via.placeholder.com/300"
                                    }
                                    alt={
                                        sub.konten?.[0]?.judul_konten ||
                                        sub.nama_submateri
                                    }
                                    className="w-full h-48 object-cover"
                                />

                                <div className="p-4">
                                    <h2 className="font-bold text-lg text-center mb-2 text-[#154561]">
                                        {sub.konten?.[0]?.judul_konten ||
                                            sub.nama_submateri}
                                    </h2>

                                    <p className="text-sm text-gray-500 text-center">
                                        {sub.jenjang || "Tidak Diketahui"} -{" "}
                                        {sub.mata_pelajaran ||
                                            "Tidak Diketahui"}
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
                onSelectJenjang={(id, nama) =>
                    handleSelectJenjang(nama)
                }
            />
        </div>
    );
}
