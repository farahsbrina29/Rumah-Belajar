import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { router } from '@inertiajs/react';

export default function PopupSemuaKelas({ isOpen, onClose }) {
    const [subjects, setSubjects] = useState([]);
    const [idJenjang, setIdJenjang] = useState(null);
    const [selectedJenjang, setSelectedJenjang] = useState(null);
    
    const subjectIcons = {
        'Biologi': '🧬',
        'PKN': '🛡️',
        'Fisika': '⚡',
        'Matematika': '📊',
        'Bahasa Indonesia': '📚',
        'Bahasa Inggris': '🌍',
        'Kimia': '🧪',
        'Ekonomi': '💵',
        'Sosiologi': '💬',
        'Geografi': '🧭',
        'Sejarah': '📜',
        'Penjaskes': '🏃‍♂️',
        'Teknologi dan Rekayasa': '🛠️',
        'Teknologi Informasi dan Komunikasi': '💻',
        'Kesehatan dan Farmasi': '⚕️',
        'Agribisnis dan Agriteknologi': '🌾',
        'Kemaritiman': '⚓',
        'Bisnis Manajemen': '📈',
        'Pariwisata': '🌴',
        'Seni dan Industri Kreatif': '🎨',
        'Energi dan Pertambangan': '⛏️',
        'Tunanetra': '🔊',
        'Tunarungu': '🔠', 
        'Tunagrahita': '💡', 
        'Tunadaksa': '🖥️' ,
        'Tunalaras': '🌟',
        'Tunawicara': '✍️' ,
        'Tunaganda': '📖',
    };

    // Ambil data jenjang dari localStorage ketika komponen pertama kali dimuat
    useEffect(() => {
        const storedJenjang = localStorage.getItem('selectedJenjang');
        const storedIdJenjang = localStorage.getItem('idJenjang');
        if (storedIdJenjang) setIdJenjang(storedIdJenjang);
    }, []);

    // Fetch daftar mata pelajaran berdasarkan id_jenjang
    useEffect(() => {
        if (idJenjang) {
            axios.get(`/api/mata-pelajaran/${idJenjang}`)
                .then(response => setSubjects(response.data))
                .catch(error => console.error("Gagal mengambil data", error));
        }
    }, [idJenjang]);

    // Fungsi untuk menangani klik pelajaran
    const handleSubjectClick = (subjectName) => {
        onClose();
        router.visit(`/ruang-belajar/${subjectName}`);
    };

    if (!isOpen || !subjects.length) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 p-6">
                <h2 className="text-lg font-bold text-[#154561] mb-4 text-center">Semua Kelas</h2>
                <div className="grid grid-cols-3 md:grid-cols-3 gap-3 mb-6">
                    {subjects.map((subject, index) => (
                        <div key={index} className="flex flex-col items-center bg-blue-100 p-3 rounded shadow-md hover:bg-blue-200 cursor-pointer text-sm"
                            onClick={() => handleSubjectClick(subject.nama_pelajaran)}>
                            <div className="text-3xl">{subjectIcons[subject.nama_pelajaran] || '📘'}</div>
                            <p className="text-sm text-gray-800 text-center">{subject.nama_pelajaran}</p>
                        </div>
                    ))}
                </div>
                <button onClick={onClose} className="bg-[#A8C9F1] text-[#154561] px-6 py-2 rounded-lg font-semibold w-full">Tutup</button>
            </div>
        </div>
    );
}
