import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { router } from '@inertiajs/react';

export default function PopupSemuaKelas({ isOpen, onClose }) {
    const [subjects, setSubjects] = useState([]);
    const [idJenjang, setIdJenjang] = useState(null);
    const [selectedJenjang, setSelectedJenjang] = useState(null);

    // Data mata pelajaran dengan ikon
    const subjectIcons = [
        { name: 'Biologi', icon: '🧬' },
        { name: 'PKN', icon: '🛡️' },
        { name: 'Fisika', icon: '⚡' },
        { name: 'Matematika', icon: '📊' },
        { name: 'Bahasa Indonesia', icon: '📚' },
        { name: 'Bahasa Inggris', icon: '🌍' },
        { name: 'Kimia', icon: '🧪' },
        { name: 'Ekonomi', icon: '💵' },
        { name: 'Sosiologi', icon: '💬' },
        { name: 'Geografi', icon: '🌍' },
        { name: 'Sejarah', icon: '📜' },
        { name: 'Penjaskes', icon: '🏃‍♂️' },
    ];

    // Ambil data jenjang dari localStorage ketika komponen pertama kali dimuat
    useEffect(() => {
        const storedJenjang = localStorage.getItem('selectedJenjang');
        const storedIdJenjang = localStorage.getItem('idJenjang');
        
        if (storedJenjang && storedIdJenjang) {
            setSelectedJenjang(storedJenjang);
            setIdJenjang(storedIdJenjang);
        }
    }, []);

    // Fetch daftar mata pelajaran berdasarkan id_jenjang
    useEffect(() => {
        if (idJenjang) {
            axios.get(`/api/mata-pelajaran/${idJenjang}`)
                .then(response => {
                    console.log("Data Mata Pelajaran:", response.data); // Debugging
                    setSubjects(response.data); // Simpan data ke state subjects
                })
                .catch(error => {
                    console.error("Gagal mengambil data mata pelajaran", error);
                });
        }
    }, [idJenjang]);

    // Fungsi untuk menangani klik pelajaran
    const handleSubjectClick = (subjectName) => {
        onClose(); // Tutup popup
        router.visit(`/ruang-belajar/${subjectName}`); // Navigasi ke halaman mata pelajaran
    };

    // Default ikon buku jika mata pelajaran tidak memiliki ikon
    const defaultIcon = '📘';

    // Fungsi untuk mengambil ikon berdasarkan nama mata pelajaran
    const getIconForSubject = (subjectName) => {
        const subject = subjectIcons.find(item => item.name === subjectName);
        return subject ? subject.icon : defaultIcon; // Jika ditemukan, gunakan ikon, jika tidak, gunakan ikon default
    };

    // Menutup popup jika data tidak ada
    if (!subjects.length) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white rounded-lg shadow-lg w-80 md:w-96 lg:w-1/2 p-6">
                    <h2 className="text-lg font-bold text-[#154561] mb-4 text-center">Memuat data...</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-80 md:w-96 lg:w-1/3 p-6">
                <h2 className="text-lg font-bold text-[#154561] mb-4 text-center">Semua Kelas</h2>
                {/* Grid untuk semua kategori */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    {subjects.map((subject, index) => {
                        // Mengambil ikon berdasarkan nama mata pelajaran
                        const icon = getIconForSubject(subject.nama_pelajaran);
                        return (
                            <div
                                key={index}
                                className="flex flex-col items-center bg-blue-100 p-4 rounded shadow-md hover:shadow-lg hover:bg-blue-200 transition cursor-pointer"
                                onClick={() => handleSubjectClick(subject.nama_pelajaran)}
                            >
                                <div className="text-4xl mb-2">{icon}</div>
                                <p className="text-sm font-semibold text-gray-800">{subject.nama_pelajaran}</p>
                            </div>
                        );
                    })}
                </div>
                {/* Tombol Tutup */}
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
