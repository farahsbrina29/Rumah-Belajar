import { Head, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '@/Components/NavbarUser';
import Footer from '@/Components/Footer';

export default function SubMaterial({ auth, idMataPelajaran, idJenjang, idSubMateri }) {
    const [material, setMaterial] = useState(null);
    const [activeTab, setActiveTab] = useState("materi");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMaterial = async () => {
            try {
                console.log(`Mengambil data submateri dengan id_mata_pelajaran=${idMataPelajaran}, id_jenjang=${idJenjang}, id_submateri=${idSubMateri}`);
                
                const response = await axios.get(`/api/submateri/${idMataPelajaran}/${idJenjang}/${idSubMateri}`);
                
                console.log("Data dari API:", response.data);
                setMaterial(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching material:", error);
                setError("Gagal memuat data. Silakan coba lagi nanti.");
                setLoading(false);
            }
        };
        
        fetchMaterial();
    }, [idMataPelajaran, idJenjang, idSubMateri]);

    const handleBackToList = () => {
        router.visit(`/ruang-belajar/${idMataPelajaran}/${idJenjang}`);
    };

    if (loading) {
        return (
            <div className="bg-gray-50 text-black min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="mb-4">Loading...</div>
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-gray-50 text-black min-h-screen flex items-center justify-center">
                <div className="text-center bg-white p-8 rounded-lg shadow-md">
                    <div className="text-red-500 text-xl mb-4">Error</div>
                    <div>{error}</div>
                </div>
            </div>
        );
    }

    // Pastikan material telah dimuat sebelum mencoba mengakses propertinya
    if (!material) {
        return (
            <div className="bg-gray-50 text-black min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div>Data tidak ditemukan</div>
                </div>
            </div>
        );
    }

    return (
        <>
            <Head title={material.nama_submateri || 'Materi Pembelajaran'} />
            <div className="bg-gray-50 text-black min-h-screen">
                <Navbar auth={auth} />
                
                <header className="bg-blue-100 pt-16 pb-6">
                    <div className="bg-gradient-to-b from-blue-200 to-blue-300 w-full flex flex-col justify-center py-4">
                        <div className="container mx-auto px-4">
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <span className="cursor-pointer" onClick={() => router.visit('/')}>Beranda</span>
                                <span>/</span>
                                <span className="cursor-pointer" onClick={handleBackToList}>Daftar Materi</span>
                                <span>/</span>
                                <span className="font-medium">{material.nama_submateri}</span>
                            </div>
                            <h1 className="text-2xl md:text-3xl font-bold text-[#154561] mt-2">
                                {material.nama_submateri}
                            </h1>
                        </div>
                    </div>
                </header>
                
                <main className="container mx-auto px-4 py-8">
                    <div className="bg-[#1E4C6A] text-white rounded-lg p-4 mb-8">
                        <h3 className="text-lg font-semibold mb-4">Navigasi</h3>
                        <div className="flex flex-wrap gap-2">
                            <button 
                                className={`py-2 px-4 rounded ${activeTab === "materi" ? "bg-blue-500" : "bg-gray-700"}`}
                                onClick={() => setActiveTab("materi")}
                            >Materi</button>
                            <button 
                                className={`py-2 px-4 rounded ${activeTab === "latihan" ? "bg-blue-500" : "bg-gray-700"}`}
                                onClick={() => setActiveTab("latihan")}
                            >Latihan Soal</button>
                            <button 
                                className={`py-2 px-4 rounded ${activeTab === "rangkuman" ? "bg-blue-500" : "bg-gray-700"}`}
                                onClick={() => setActiveTab("rangkuman")}
                            >Rangkuman</button>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        {activeTab === "materi" && (
                            <div className="prose max-w-none">
                                <h2 className="text-xl font-bold mb-4">Detail Materi</h2>
                                {material.konten && material.konten.length > 0 ? (
                                    material.konten.map((konten) => (
                                        <div key={konten.id} className="mb-6">
                                            <h3 className="text-lg font-semibold">{konten.judul_konten}</h3>
                                            <p>{konten.deskripsi}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>Tidak ada konten materi tersedia.</p>
                                )}
                            </div>
                        )}

                        {activeTab === "latihan" && (
                            <div>
                                <h2 className="text-xl font-bold mb-4">Latihan Soal</h2>
                                {material.latihan_soal && material.latihan_soal.length > 0 ? (
                                    material.latihan_soal.map((soal, index) => (
                                        <div key={soal.id} className="p-4 border rounded-lg mb-4">
                                            <p className="font-medium">Soal {index + 1}</p>
                                            <p className="text-gray-600 mb-4">{soal.pertanyaan}</p>
                                            <div className="space-y-2">
                                                {soal.opsi && Object.entries(soal.opsi).map(([key, option]) => (
                                                    <label key={key} className="flex items-center space-x-3">
                                                        <input type="radio" name={`question-${soal.id}`} className="form-radio" />
                                                        <span>{option}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>Tidak ada latihan soal tersedia.</p>
                                )}
                            </div>
                        )}

                        {activeTab === "rangkuman" && (
                            <div>
                                <h2 className="text-xl font-bold mb-4">Rangkuman</h2>
                                {material.rangkuman && material.rangkuman.length > 0 ? (
                                    material.rangkuman.map((file) => (
                                        <div key={file.id} className="mb-4">
                                            <a href={file.file_rangkuman} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                                                Download Rangkuman
                                            </a>
                                        </div>
                                    ))
                                ) : (
                                    <p>Tidak ada rangkuman tersedia.</p>
                                )}
                            </div>
                        )}
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
}