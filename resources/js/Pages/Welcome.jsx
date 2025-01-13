import { Head } from '@inertiajs/react';
import Navbar from '@/Components/NavbarUser';
import Footer from '@/Components/Footer';
import PopupSemuaKelas from '@/Components/PopupSemuaKelas'; // Import popup Semua Kelas
import PopupPilihJenjang from '@/Components/PopupPilihJenjang'; // Import popup Pilih Jenjang
import { useState } from 'react';

export default function Welcome({ auth }) {
    const [isPopupKelasOpen, setIsPopupKelasOpen] = useState(false);
    const [isPopupJenjangOpen, setIsPopupJenjangOpen] = useState(false);

    const openPopupKelas = () => setIsPopupKelasOpen(true);
    const closePopupKelas = () => setIsPopupKelasOpen(false);

    const openPopupJenjang = () => setIsPopupJenjangOpen(true);
    const closePopupJenjang = () => setIsPopupJenjangOpen(false);

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-50 text-black min-h-screen">
                {/* Navbar */}
                <Navbar auth={auth} />

                {/* Hero Section */}
                <header className="bg-gradient-to-b from-blue-100 to-blue-200 pt-24 pb-16">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                            Mau Belajar Apa Hari Ini?
                        </h1>
                        {/* Search Input */}
                        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
                            <input
                                type="text"
                                placeholder="Masukkan keywords pencarian"
                                className="w-full md:w-2/3 lg:w-1/2 px-4 py-2 rounded border border-gray-300 text-gray-700"
                            />
                            <button
                                onClick={openPopupJenjang}
                                className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Pilih Jenjang
                            </button>
                        </div>

                        {/* Ruang Belajar */}
                        <div className="mt-10">
                            <h2 className="text-xl md:text-2xl font-bold text-gray-800 text-center mb-6">
                                Ruang Belajar
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {/* Hanya menampilkan beberapa kategori */}
                                {[
                                    { name: 'Biologi', icon: '🧬' },
                                    { name: 'PKN', icon: '🛡️' },
                                    { name: 'Fisika', icon: '⚛️' },
                                    { name: 'Matematika', icon: '📊' },
                                ].map((subject, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col items-center bg-white p-4 rounded shadow-md hover:shadow-lg transition"
                                    >
                                        <div className="text-4xl mb-2">{subject.icon}</div>
                                        <p className="text-sm font-semibold text-gray-800">{subject.name}</p>
                                    </div>
                                ))}

                                {/* Tombol Semua */}
                                <button
                                    onClick={openPopupKelas}
                                    className="flex flex-col items-center justify-center bg-blue-100 p-4 rounded shadow-md hover:shadow-lg transition"
                                >
                                    <div className="text-3xl mb-2">📚</div>
                                    <p className="text-sm font-semibold text-blue-700">Semua</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Popup Semua Kelas */}
                <PopupSemuaKelas isOpen={isPopupKelasOpen} onClose={closePopupKelas} />

                {/* Popup Pilih Jenjang */}
                <PopupPilihJenjang isOpen={isPopupJenjangOpen} onClose={closePopupJenjang} />

                {/* Recommendations Section */}
                <section className="bg-blue-900 py-10 text-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-xl md:text-2xl font-bold text-center mb-6">
                            Rekomendasi Belajar Untuk Kamu!
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="bg-blue-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition"
                                >
                                    <div className="text-4xl mb-4 flex justify-center">📄</div>
                                    <h3 className="text-lg font-semibold mb-2 text-center">
                                        Rekomendasi {index + 1}
                                    </h3>
                                    <p className="text-sm text-gray-300 text-center">
                                        Deskripsi singkat rekomendasi {index + 1}.
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <Footer />
            </div>
        </>
    );
}
