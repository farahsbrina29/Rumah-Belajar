import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import Navbar from "@/components/NavbarUser";
import Footer from "@/components/Footer";
import axios from "axios";

export default function RangkumanDetail({ auth, id_submateri }) {
    const [rangkuman, setRangkuman] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRangkuman = async () => {
            if (!id_submateri) {
                console.error("ID Submateri tidak ditemukan.");
                setError("ID Submateri tidak ditemukan.");
                setLoading(false);
                return;
            }

            try {
                console.log(`Fetching rangkuman dengan id_submateri=${id_submateri}`);

                const response = await axios.get("http://127.0.0.1:8000/api/rangkuman/submateri", {
                    params: { id_submateri }
                });

                console.log("Data dari API:", response.data);

                if (response.data) {
                    setRangkuman(response.data);
                } else {
                    setError("Rangkuman tidak ditemukan.");
                }
                
            } catch (error) {
                console.error("Gagal mengambil data rangkuman:", error);
                setError("Terjadi kesalahan saat mengambil data.");
            } finally {
                setLoading(false);
            }
        };

        fetchRangkuman();
    }, [id_submateri]);

    return (
        <>
            <Head title="Detail Rangkuman" />
            <Navbar auth={auth} />
            <div className="container mx-auto px-4 py-8">
                {loading ? (
                    <p className="text-center text-gray-500">Memuat data...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : rangkuman ? (
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">{rangkuman.nama_submateri}</h2>
                        <p className="text-gray-700">File Rangkuman: {rangkuman.file_rangkuman}</p>
                        {/* Ensure that the path to the file is correct and accessible */}
                        {rangkuman.file_rangkuman && (
                           <a 
                           href={`http://127.0.0.1:8000/storage/${rangkuman.file_rangkuman}`} 
                           download 
                           className="text-blue-500 underline"
                       >
                           Unduh Rangkuman
                       </a>
                        )}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">Tidak ada rangkuman tersedia.</p>
                )}
            </div>
            <Footer />
        </>
    );
}
