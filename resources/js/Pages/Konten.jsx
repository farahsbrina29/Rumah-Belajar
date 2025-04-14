import React, { useState, useEffect } from "react";
import { Head, router } from '@inertiajs/react';
import axios from "axios";
import Navbar from "@/components/NavbarUser";
import Footer from "@/components/Footer";
import PopupPilihJenjang from "@/components/PopupPilihJenjang";

export default function Konten({ auth }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [kontenList, setKontenList] = useState([]);
    const [filteredKonten, setFilteredKonten] = useState([]);
    const [jenjangList, setJenjangList] = useState([]);
    const [selectedJenjang, setSelectedJenjang] = useState(null);

    useEffect(() => {
        // Fetch konten data
        axios.get("http://localhost:8000/api/konten")
            .then((response) => {
                setKontenList(response.data);
                setFilteredKonten(response.data);
            })
            .catch((error) => {
                console.error("Error fetching konten:", error);
            });

        // Fetch jenjang data
        axios.get("http://localhost:8000/api/jenjang")
            .then((response) => {
                setJenjangList(response.data);
            })
            .catch((error) => {
                console.error("Error fetching jenjang:", error);
            });
    }, []);

    // Redirect if not authenticated
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

    const handleSelectJenjang = (id, nama) => {
        setSelectedJenjang({ id, nama });
        if (id) {
            setFilteredKonten(kontenList.filter(konten => String(konten.id_jenjang) === String(id)));
        } else {
            setFilteredKonten(kontenList);
        }
    };

    const getNamaJenjang = (id_jenjang) => {
        const jenjang = jenjangList.find(j => String(j.id) === String(id_jenjang));
        return jenjang ? jenjang.nama_jenjang : "Tidak Diketahui";
    };

    // Filter konten berdasarkan pencarian
    const filteredBySearch = filteredKonten.filter(konten => 
        konten.judul_konten.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col min-h-screen bg-blue-100">
            <Navbar auth={auth} />
            <div className="flex-1 p-4 pt-32">
                <h1 className="text-2xl font-bold text-center mb-4 text-[#154561]">
                    Telusuri Berbagai Konten Menarik 🚀
                </h1>

                {/* Search and Jenjang selection */}
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
                        {selectedJenjang ? selectedJenjang.nama : "Pilih Jenjang"}
                    </button>
                </div>

                {/* Konten Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredBySearch.map((konten) => (
                <div
                    key={konten.id}
                    onClick={() =>
                        router.visit(`/konten/${konten.id_mata_pelajaran}/${konten.id_jenjang}/${konten.id_submateri}`)
                    }
                    className="cursor-pointer border rounded-lg overflow-hidden shadow-md bg-white hover:shadow-lg transition"
                >
                    <img
                        src={konten.thumbnail || "https://via.placeholder.com/300"}
                        alt={konten.judul_konten}
                        className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                        <h2 className="font-bold text-lg text-center mb-2 text-[#154561]">
                            {konten.judul_konten}
                        </h2>
                        <p className="text-sm text-gray-500 text-center">
                            {konten.jenjang?.nama_jenjang || "Tidak Diketahui"} - {konten.mata_pelajaran?.nama_pelajaran || "Tidak Diketahui"}
                        </p>
                    </div>
                </div>
            ))}

                </div>
            </div>

            <Footer />

            {/* Popup Pilih Jenjang */}
            <PopupPilihJenjang 
                isOpen={isPopupOpen} 
                onClose={() => setIsPopupOpen(false)} 
                onSelectJenjang={handleSelectJenjang} 
            />
        </div>
    );
}
