import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";
import Navbar from "@/Components/NavbarUser";
import Footer from "@/Components/Footer";
import PopupPilihJenjang from "@/components/PopupPilihJenjang";


export default function Rangkuman({ auth, submateriList = [] }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedJenjangId, setSelectedJenjangId] = useState(null);
    const [selectedJenjangName, setSelectedJenjangName] = useState("Pilih Jenjang");

    
     if ( !auth?.user) {
            router.visit('/login');
        }

    const handleSelectJenjang = (id, name) => {
        setSelectedJenjangId(id);
        setSelectedJenjangName(name);
    };

    const handleSelectRangkuman = (nama_submateri) => {
        router.visit(`/rangkuman/${encodeURIComponent(nama_submateri)}`);
        };

    const filteredSubmateri = submateriList.filter((item) => {
        const byJenjang = selectedJenjangId
            ? String(item.id_jenjang) === String(selectedJenjangId)
            : true;

        const bySearch = item.nama_submateri
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        return byJenjang && bySearch;
    });

    return (
        <div className="flex flex-col min-h-screen bg-blue-100">
            <Head title="Rangkuman" />
            <Navbar auth={auth} />

            <div className="flex-1 p-4 pt-32">
                <h1 className="text-2xl font-bold text-center mb-6 text-[#154561]">
                    Telusuri rangkuman materi belajarmu ✨
                </h1>

                {/* Search + Jenjang */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <input
                        type="text"
                        placeholder="Cari rangkuman..."
                        className="border p-2 rounded-md flex-1"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        onClick={() => setIsPopupOpen(true)}
                        className="bg-[#154561] text-white px-6 py-2 rounded-md"
                    >
                        {selectedJenjangName}
                    </button>
                </div>

                {/* List */}
                {filteredSubmateri.length > 0 ? (
                    <div className="flex flex-col gap-4">
                        {filteredSubmateri.map((item) => (
                            <div
                            key={item.id_rangkuman}
                            className="border rounded-lg shadow-md cursor-pointer overflow-hidden"
                            onClick={() => handleSelectRangkuman(item.nama_submateri)}
                        >
                            <div className="h-5 bg-[#B9C9DA]" />
                            <div className="p-4 bg-white">
                                <h2 className="font-bold text-lg">
                                    {item.nama_submateri}
                                </h2>
                                <p className="text-sm text-gray-500">
                                    {item.nama_jenjang} - {item.nama_pelajaran}
                                </p>
                            </div>
                        </div>

                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-600">
                        Rangkuman tidak tersedia
                    </p>
                )}
            </div>

            <Footer />

            <PopupPilihJenjang
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                onSelectJenjang={handleSelectJenjang}
            />
        </div>
    );
}
