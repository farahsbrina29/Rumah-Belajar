import React, { useEffect, useState } from "react";
import axios from "axios";

export default function PopupPilihJenjang({ isOpen, onClose, onSelectJenjang }) {
    const [jenjangList, setJenjangList] = useState([]);
    
    useEffect(() => {
        if (isOpen) {
            axios.get("http://localhost:8000/api/jenjang") // Sesuaikan dengan API
                .then((response) => {
                    setJenjangList(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching jenjang:", error);
                });
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 p-6">
                <h2 className="text-lg font-bold mb-4 text-center">Pilih Jenjang</h2>
                <div className="grid grid-cols-3 gap-4 mb-6">
                    {jenjangList.length > 0 ? (
                        jenjangList.map((jenjang) => (
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
                        ))
                    ) : (
                        <p className="text-center text-gray-500 col-span-3">Memuat data...</p>
                    )}
                </div>
                <div className="flex justify-center">
                    <button
                        onClick={onClose}
                        className="bg-[#A8C9F1] text-[#154561] px-12 py-2 rounded-lg font-semibold focus:outline-none"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
}
