import { Head } from '@inertiajs/react';
import Navbar from '@/Components/NavbarUser';
import Footer from '@/Components/Footer';
import PopupSemuaKelas from '@/Components/PopupSemuaKelas';
import PopupPilihJenjang from '@/Components/PopupPilihJenjang';
import { useState } from 'react';

export default function Welcome({ auth }) {
    const [isPopupKelasOpen, setIsPopupKelasOpen] = useState(false);
    const [isPopupJenjangOpen, setIsPopupJenjangOpen] = useState(false);

    const openPopupKelas = () => setIsPopupKelasOpen(true);
    const closePopupKelas = () => setIsPopupKelasOpen(false);

    const openPopupJenjang = () => setIsPopupJenjangOpen(true);
    const closePopupJenjang = () => setIsPopupJenjangOpen(false);

    const subjects = [
        { name: 'Biologi', icon: '🧬' },
        { name: 'PKN', icon: '🛡️' },
        { name: 'Fisika', icon: '⚡' },
        { name: 'Matematika', icon: '📊' },
        { name: 'Bhs. Indonesia', icon: '📚' },
        { name: 'Bhs. Inggris', icon: '🌍' },
        { name: 'Kimia', icon: '🧪' },
    ];

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-50 text-black min-h-screen">
                <Navbar auth={auth} />

                {/* Hero Section */}
                <header className="bg-gradient-to-b from-blue-100 to-blue-200 pt-16 pb-12">
                    {/* Full Width Background */}
                    <div className="bg-[#B9C9DA] w-screen">
                        <div className="px-4 py-8 flex items-center">
                            <h1 className="text-2xl md:text-3xl font-bold text-[#154561]">
                                Mau Belajar Apa Hari Ini?
                            </h1>
                        </div>
                    </div>

                    {/* Search Section */}
                    <div className="bg-white rounded-lg p-4 shadow-md max-w-4xl mx-auto mt-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    placeholder="Masukkan keywords pencarian"
                                    className="w-full px-4 py-2 rounded-md border border-gray-300"
                                />
                            </div>
                            <div className="md:w-1/3">
                                <button
                                    onClick={openPopupJenjang}
                                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 flex justify-between items-center"
                                >
                                    <span>Pilih Jenjang</span>
                                    <span>▼</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Ruang Belajar */}
                    <div className="mt-8 bg-white rounded-lg p-6 shadow-md max-w-4xl mx-auto">
                        <h2 className="text-xl font-bold text-gray-800 mb-6">
                            Ruang Belajar
                        </h2>
                        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                            {subjects.map((subject, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center cursor-pointer"
                                >
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                                        <span className="text-2xl">{subject.icon}</span>
                                    </div>
                                    <p className="text-xs text-center">{subject.name}</p>
                                </div>
                            ))}
                            <div
                                onClick={openPopupKelas}
                                className="flex flex-col items-center cursor-pointer"
                            >
                                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                                    <span className="text-2xl">⋯</span>
                                </div>
                                <p className="text-xs text-center">Semua</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Rekomendasi Section */}
                <section className="bg-[#154561] py-8">
                    <div className="container mx-auto px-4">
                        <h2 className="text-xl font-bold text-white mb-6">
                            Rekomendasi Belajar Untuk Kamu!
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-lg p-4 flex items-center gap-4"
                                >
                                    <div className="text-3xl">📝</div>
                                    <div>
                                        <h3 className="font-semibold mb-1">Rekomendasi {index + 1}</h3>
                                        <p className="text-sm text-gray-600">Deskripsi singkat</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Additional Sections */}
                <section className="py-8">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Kelas Maya */}
                            <div className="bg-white rounded-lg p-6 shadow-md">
                                <h2 className="text-xl font-bold mb-4">Konten</h2>
                                <p className="text-gray-600 mb-4">
                                    Fitur konten
                                </p>
                                <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
                                    Masuk Konten
                                </button>
                            </div>

                            {/* Bank Soal */}
                            <div className="bg-white rounded-lg p-6 shadow-md">
                                <h2 className="text-xl font-bold mb-4">Rangkuman</h2>
                                <p className="text-gray-600 mb-4">
                                    Fitur rangkuman
                                </p>
                                <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
                                    Masuk Rangkuman
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <PopupSemuaKelas isOpen={isPopupKelasOpen} onClose={closePopupKelas} />
                <PopupPilihJenjang isOpen={isPopupJenjangOpen} onClose={closePopupJenjang} />
                <Footer />
            </div>
        </>
    );
}
