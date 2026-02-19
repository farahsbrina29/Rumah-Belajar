import React, { useEffect, useState } from "react";
import axios from "axios";

export default function PopupPilihJenjang({ isOpen, onClose, onSelectJenjang }) {
    const [jenjangList, setJenjangList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isOpen) {
            setLoading(true);
            setError(null);

            axios.get("/api/jenjangg") // Sesuaikan dengan API
                .then((response) => {
                    setJenjangList(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching jenjang:", error);
                    setError("Gagal memuat data jenjang");
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 p-6 max-h-[90vh] overflow-y-auto">
                <h2 className="text-lg font-bold mb-4 text-center">Pilih Jenjang</h2>

                {loading ? (
                    <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                        <p className="mt-2 text-gray-600">Memuat jenjang...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-8 text-red-500">
                        <p>{error}</p>
                        <button 
                            onClick={() => window.location.reload()} 
                            className="mt-2 text-blue-500 hover:underline"
                        >
                            Coba lagi
                        </button>
                    </div>
                ) : jenjangList.length > 0 ? (
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        {jenjangList.map((jenjang) => (
                            <div
                                key={jenjang.id}
                                className="flex flex-col items-center bg-blue-100 p-4 rounded shadow-md hover:shadow-lg hover:bg-blue-200 transition cursor-pointer"
                                onClick={() => {
                                    onSelectJenjang(jenjang.id, jenjang.nama_jenjang); // Kirim ID & nama jenjang
                                    onClose(); // Tutup popup setelah memilih
                                }}
                            >
                                <p className="text-sm font-semibold text-gray-800 text-center">{jenjang.nama_jenjang}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-600">
                        Tidak ada jenjang tersedia
                    </div>
                )}

                <div className="flex justify-center">
                    <button
                        onClick={() => {
                            onSelectJenjang("", "Pilih Jenjang"); 
                            onClose();
                        }}
                        className="bg-[#A8C9F1] text-[#154561] px-12 py-2 rounded-lg font-semibold focus:outline-none hover:bg-[#97b8e0] transition-colors duration-200"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
}
