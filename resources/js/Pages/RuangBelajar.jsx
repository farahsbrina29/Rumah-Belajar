import { Head, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '@/Components/NavbarUser';
import Footer from '@/Components/Footer';

export default function RuangBelajar({ auth, nama_pelajaran, nama_jenjang }) {
    const [subMaterials, setSubMaterials] = useState([]);
    const [namaPelajaran, setNamaPelajaran] = useState(nama_pelajaran || '');

    useEffect(() => {
        const fetchSubMaterials = async () => {
            if (!nama_pelajaran || !nama_jenjang) {
                console.error("Parameter tidak lengkap");
                setSubMaterials([]);
                return;
            }
            
            try {
                console.log(`Mengambil data dengan nama_pelajaran=${nama_pelajaran}, nama_jenjang=${nama_jenjang}`);
                
                const response = await axios.get(`http://127.0.0.1:8000/api/submateri`, {
                    params: { 
                        nama_pelajaran, 
                        nama_jenjang 
                    },
                });
                
                console.log("Data dari API:", response.data);
                
                if (response.data && Array.isArray(response.data)) {
                    setSubMaterials(response.data.filter(item => item.nama_submateri !== null));
                    if (response.data.length > 0) {
                        setNamaPelajaran(response.data[0]?.nama_pelajaran || nama_pelajaran);
                    }
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
    }, [nama_pelajaran, nama_jenjang]);

    const handleSubMateriClick = (nama_submateri) => {
        router.visit(`/konten/${nama_pelajaran}/${nama_jenjang}/${nama_submateri}`);
    };

    return (
        <>
            <Head title={`Ruang Belajar - ${namaPelajaran || 'Loading...'}`} />
            <div className="bg-gray-50 text-black min-h-screen">
                <Navbar auth={auth} />
                
                <header className="bg-blue-100 pt-16 pb-6">
                    <div className="bg-gradient-to-b from-blue-200 to-blue-300 w-full flex flex-col justify-center py-4">
                        <div className="container mx-auto px-4">
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <span className="cursor-pointer" onClick={() => router.visit('/')}>Beranda</span>
                                <span>/</span>
                                <span className="font-medium">{namaPelajaran || 'Loading...'}</span>
                            </div>
                            <h1 className="text-2xl md:text-3xl font-bold text-[#154561] mt-2">
                                 {namaPelajaran || 'Loading...'}
                            </h1>
                        </div>
                    </div>
                </header>

                <section className="container mx-auto px-4 py-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold mb-6">Materi Pembelajaran</h2>

                        {subMaterials.length > 0 ? (
                            <div className="space-y-4">
                                {subMaterials.map((material) => (
                                    <div
                                        key={material.nama_submateri}
                                        onClick={() => handleSubMateriClick(material.nama_submateri)}
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
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-600">Belum ada submateri untuk mata pelajaran ini.</p>
                        )}
                    </div>
                </section>
                
                <Footer />
            </div>
        </>
    );
}
