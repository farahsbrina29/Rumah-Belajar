import React, { useState, useEffect } from "react";
import { Head, router } from '@inertiajs/react';
import axios from "axios";
import Navbar from "@/components/NavbarUser";
import Footer from "@/components/Footer";
import PopupPilihJenjang from "@/components/PopupPilihJenjang";

export default function Konten({ auth }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [submaterialList, setSubmaterialList] = useState([]); // ✅ pakai submaterial
    const [filteredSubmaterial, setFilteredSubmaterial] = useState([]);
    const [jenjangList, setJenjangList] = useState([]);
    const [selectedJenjang, setSelectedJenjang] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8000/api/submaterial")
            .then((response) => {
                setSubmaterialList(response.data);
                setFilteredSubmaterial(response.data);
            })
            .catch((error) => {
                console.error("Error fetching submaterial:", error);
            });

        axios.get("http://localhost:8000/api/jenjang")
            .then((response) => {
                setJenjangList(response.data);
            })
            .catch((error) => {
                console.error("Error fetching jenjang:", error);
            });
    }, []);

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

    const handleSelectJenjang = (nama) => {
        setSelectedJenjang(nama);
        if (nama) {
            setFilteredSubmaterial(submaterialList.filter(sub => sub.jenjang === nama));
        } else {
            setFilteredSubmaterial(submaterialList);
        }
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
