import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { router } from '@inertiajs/react';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';


export default function PopupSemuaKelas({ isOpen, onClose }) {
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
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
        'Tunadaksa': '🖥️',
        'Tunalaras': '🌟',
        'Tunawicara': '✍️',
        'Tunaganda': '📖',
    };

    useEffect(() => {
        if (!isOpen) return;
        
        let isMounted = true;
        
        const fetchSubjects = async () => {
            if (!isMounted) return;
            
            setLoading(true);
            setError(null);
            setSubjects([]);

            try {
                const storedJenjang = localStorage.getItem('selectedJenjang');
                const storedIdJenjang = localStorage.getItem('idJenjang');

                // Jika "Pilih Jenjang" atau tidak ada jenjang yang dipilih, ambil semua mata pelajaran
                if (!storedJenjang || storedJenjang === "Pilih Jenjang") {
                    const response = await axios.get('/api/mata-pelajaran');
                    if (!isMounted) return;
                    if (response.data && Array.isArray(response.data)) {
                        // Hapus duplikasi untuk tampilan semua mata pelajaran
                        const uniqueSubjects = response.data.filter((subject, index, self) =>
                            index === self.findIndex((s) => s.nama_pelajaran === subject.nama_pelajaran)
                        );
                        setSubjects(uniqueSubjects);
                    }
                } 
                // Jika ada jenjang yang dipilih, ambil mata pelajaran sesuai jenjang
                else if (storedIdJenjang) {
                    const response = await axios.get(`/api/mata-pelajaran/${storedIdJenjang}`);
                    if (!isMounted) return;
                    if (response.data && Array.isArray(response.data)) {
                        setSubjects(response.data);
                    }
                }
            } catch (error) {
                if (!isMounted) return;
                console.error("Gagal mengambil data mata pelajaran:", error);
                setError("Gagal memuat daftar mata pelajaran");
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchSubjects();
        
        return () => {
            isMounted = false;
        };
    }, [isOpen]);

    const handleSubjectClick = (namaPelajaran) => {
    const selectedJenjang = localStorage.getItem('selectedJenjang');

    if (!selectedJenjang || selectedJenjang === 'Pilih Jenjang') {
        toast.warning('Silahkan pilih jenjang terlebih dahulu');
        return;
    }

    onClose();

    router.visit(
        `/ruang-belajar/${encodeURIComponent(namaPelajaran)}/${encodeURIComponent(selectedJenjang)}`
    );
};



    if (!isOpen) return null;

return (
    <>
        {/* TOAST CONTAINER */}
        <ToastContainer
            position="top-right"
            autoClose={3000}
            theme="colored"
            pauseOnHover
        />

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 max-h-[90vh] overflow-y-auto">
                <div className="mb-4">
                    <h2 className="text-lg font-bold text-[#154561] text-center">
                        Semua Kelas
                    </h2>
                </div>

                {loading ? (
                    <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                        <p className="mt-2 text-gray-600">Memuat mata pelajaran...</p>
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
                ) : subjects.length === 0 ? (
                    <div className="text-center py-8 text-gray-600">
                        Tidak ada mata pelajaran tersedia
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3 mb-6">
                        {subjects.map((subject, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center bg-blue-100 p-3 rounded shadow-md hover:bg-blue-200 cursor-pointer text-sm transition-colors duration-200"
                                onClick={() => handleSubjectClick(subject.nama_pelajaran)}
                            >
                                <div className="text-3xl mb-2">
                                    {subjectIcons[subject.nama_pelajaran] || '📘'}
                                </div>
                                <p className="text-sm text-gray-800 text-center">
                                    {subject.nama_pelajaran}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                <button
                    onClick={onClose}
                    className="bg-[#A8C9F1] text-[#154561] px-6 py-2 rounded-lg font-semibold w-full hover:bg-[#97b8e0] transition-colors duration-200"
                >
                    Tutup
                </button>
            </div>
        </div>
    </>
);

}