import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import Navbar from "@/components/NavbarUser";
import Footer from "@/components/Footer";
import axios from "axios";

export default function RangkumanDetail({ auth, id_submateri }) {
    const [rangkuman, setRangkuman] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`/api/rangkuman/submateri/${id_submateri}`)
            .then((response) => {
                setRangkuman(response.data.data);
            })
            .catch((error) => {
                console.error("Gagal mengambil rangkuman:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id_submateri]);

    return (
        <>
            <Head title="Detail Rangkuman" />
            <Navbar auth={auth} />

            <div className="container mx-auto p-6">
                <div className="bg-white shadow-md rounded-lg p-6 text-center">
                    <h2 className="text-xl font-bold mb-4">Detail Rangkuman</h2>
                    
                    {loading ? (
                        <p>Loading...</p>
                    ) : rangkuman ? (
                        <div>
                            <p className="text-gray-700">Submateri: {rangkuman.nama_submateri}</p>
                            <p className="text-gray-700">File: <a href={`/storage/${rangkuman.file_rangkuman}`} className="text-blue-500">Download</a></p>
                        </div>
                    ) : (
                        <p className="text-red-500">Rangkuman tidak ditemukan.</p>
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
}
