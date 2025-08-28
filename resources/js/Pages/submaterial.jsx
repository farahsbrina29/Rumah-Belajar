import { Head } from '@inertiajs/react'; 
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '@/Components/NavbarUser';
import Footer from '@/Components/Footer';

export default function Submaterial({ auth, nama_pelajaran, nama_jenjang, nama_submateri }) {
    const [data, setData] = useState(null);
    const [activeTab, setActiveTab] = useState("materi");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSubMateri = async () => {
            if (!nama_pelajaran || !nama_jenjang || !nama_submateri) {
                setError("Parameter tidak lengkap");
                setLoading(false);
                return;
            }

            try {
                console.log(`Mengambil submateri: ${nama_pelajaran} - ${nama_jenjang} - ${nama_submateri}`);

                const response = await axios.get(`http://127.0.0.1:8000/api/submaterial`, {
                    params: {
                        nama_pelajaran,
                        nama_jenjang,
                        nama_submateri
                    }
                });

                console.log("Data submateri:", response.data);

                if (response.data && Array.isArray(response.data) && response.data.length > 0) {
                    setData(response.data[0]); // ambil yang pertama
                } else {
                    setError("Submateri tidak ditemukan.");
                }
            } catch (err) {
                console.error("Gagal mengambil data", err);
                setError("Gagal memuat data. Silakan coba lagi nanti.");
            } finally {
                setLoading(false);
            }
        };

        fetchSubMateri();
    }, [nama_pelajaran, nama_jenjang, nama_submateri]);

    if (loading) return <div className="text-center mt-20">Loading...</div>;
    if (error) return <div className="text-center text-red-500 mt-20">{error}</div>;
    if (!data) return <div className="text-center mt-20">Data tidak ditemukan</div>;

    return (
        <>
            <Head title={data.nama_submateri || 'Materi Pembelajaran'} />
            <Navbar auth={auth} />
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white p-4 shadow rounded-lg">
                    <iframe className="w-full h-64 md:h-96" src={data.konten?.[0]?.link_konten} title={data.nama_submateri} allowFullScreen></iframe>
                    <h2 className="text-xl font-bold mt-4">{data.konten?.[0]?.judul_konten}</h2>
                </div>
                
                <div className="mt-6">
                    <div className="flex space-x-4 border-b">
                        {['materi', 'latihan', 'rangkuman'].map(tab => (
                            <button key={tab} className={`py-2 px-4 ${activeTab === tab ? 'border-b-2 border-blue-500' : ''}`} onClick={() => setActiveTab(tab)}>
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>

                    <div className="p-4 bg-gray-50 mt-2 rounded-lg">
                        {activeTab === "materi" && (
                            <div>
                                <h3 className="text-lg font-semibold">Detail Materi</h3>
                                <p>{data.konten?.[0]?.deskripsi || 'Tidak ada deskripsi.'}</p>
                            </div>
                        )}

                        {activeTab === "latihan" && (
                            <div>
                                <h3 className="text-lg font-semibold">Latihan Soal</h3>
                                {data.latihan_soal?.map((soal, index) => (
                                    <div key={index} className="mb-4 border p-4 rounded-lg">
                                        <p><strong>{index + 1}. {soal.pertanyaan}</strong></p>
                                        <ul className="list-disc ml-6">
                                            <li>A. {soal.opsi_a}</li>
                                            <li>B. {soal.opsi_b}</li>
                                            <li>C. {soal.opsi_c}</li>
                                            <li>D. {soal.opsi_d}</li>
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === "rangkuman" && (
                            <div>
                                <h3 className="text-lg font-semibold">Rangkuman</h3>
                                {data.rangkuman && data.rangkuman.length > 0 ? (
                                    <a
                                        href={`/storage/${data.rangkuman[0].file_rangkuman}`}
                                        download
                                        className="text-blue-500 underline"
                                    >
                                        Download Rangkuman
                                    </a>
                                ) : (
                                    <p>Rangkuman tidak tersedia.</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
