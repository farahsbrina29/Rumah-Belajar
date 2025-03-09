import { Head, router } from '@inertiajs/react'; // Mengimpor router dari inertia
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '@/Components/NavbarUser';
import Footer from '@/Components/Footer';

export default function RuangBelajar({ auth, idMataPelajaran, idJenjang }) {
    const [subMaterials, setSubMaterials] = useState([]);

    // Mengambil data submateri ketika komponen dimuat
    useEffect(() => {
        const fetchSubMaterials = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/submateri`, {
                    params: { id_mata_pelajaran: idMataPelajaran, id_jenjang: idJenjang },
                });

                if (response.data && Array.isArray(response.data)) {
                    setSubMaterials(response.data);
                } else {
                    console.error("Format data tidak valid");
                    setSubMaterials([]);
                }
            } catch (error) {
                console.error("Gagal mengambil data submateri", error);
                setSubMaterials([]);
            }
        };

        fetchSubMaterials();
    }, [idMataPelajaran, idJenjang]); // Dipanggil setiap kali idMataPelajaran atau idJenjang berubah

    // Navigasi ke halaman submateri
    const handleSubMateriClick = (idSubMateri) => {
        router.visit(`/ruang-belajar/${idMataPelajaran}/${idJenjang}/${idSubMateri}`);
    };

    return (
        <>
            <Head title={`Ruang Belajar - Mata Pelajaran ${idMataPelajaran}`} />
            <div className="bg-gray-50 text-black min-h-screen">
                <Navbar auth={auth} />
                
                <header className="bg-blue-100 pt-16 pb-6">
                    <div className="bg-gradient-to-b from-blue-200 to-blue-300 w-full flex flex-col justify-center py-4">
                        <div className="container mx-auto px-4">
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <span className="cursor-pointer" onClick={() => router.visit('/')}>Beranda</span>
                                <span>/</span>
                                <span className="font-medium">Mata Pelajaran {idMataPelajaran}</span>
                            </div>
                            <h1 className="text-2xl md:text-3xl font-bold text-[#154561] mt-2">
                                Mata Pelajaran {idMataPelajaran}
                            </h1>
                        </div>
                    </div>
                </header>

                <section className="container mx-auto px-4 py-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold mb-6">Materi Pembelajaran</h2>
                        <div className="space-y-4">
                            {subMaterials.length > 0 ? (
                                subMaterials.map((material) => (
                                    <div
                                        key={material.id}
                                        onClick={() => handleSubMateriClick(material.id)}
                                        className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                                    >
                                        <div className="flex-1">
                                            <h3 className="text-lg font-medium">{material.nama_submateri}</h3>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <svg
                                                className="w-6 h-6 text-gray-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5l7 7-7 7"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-600">Belum ada submateri untuk mata pelajaran ini.</p>
                            )}
                        </div>
                    </div>
                </section>
                
                <Footer />
            </div>
        </>
    );
}
