import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/NavbarUser";
import Footer from "@/components/Footer";
import axios from "axios";

export default function RangkumanDetail({ auth }) {
    const { id_submateri } = useParams(); // Ambil ID dari URL
    const [rangkuman, setRangkuman] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/rangkuman/${id_submateri}`)
            .then((response) => {
                setRangkuman(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching rangkuman:", error);
                setLoading(false);
            });
    }, [id_submateri]);

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
            <div className="flex-1 p-4 pt-32">
                {loading ? (
                    <p className="text-center text-gray-600">Memuat rangkuman...</p>
                ) : rangkuman ? (
                    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
                        <h1 className="text-2xl font-bold text-[#154561]">{rangkuman.judul}</h1>
                        <p className="text-gray-700 mt-4">{rangkuman.isi}</p>
                    </div>
                ) : (
                    <p className="text-center text-gray-600">Rangkuman tidak ditemukan.</p>
                )}
            </div>
            <Footer />
        </div>
    );
}
