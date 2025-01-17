import { Head, router } from '@inertiajs/react';
import Navbar from '@/Components/NavbarUser';
import Footer from '@/Components/Footer';
import PopupSemuaKelas from '@/Components/PopupSemuaKelas';
import PopupPilihJenjang from '@/Components/PopupPilihJenjang';
import ChartJumlahKonten from '@/Components/ChartJumlahKonten';
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

    const handleSubjectClick = (subjectName) => {
        router.visit(`/ruang-belajar/${subjectName}`);
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-50 text-black min-h-screen">
                <Navbar auth={auth} />

                {/* Hero Section */}
                <header className="bg-blue-100 pt-16 pb-6">
                    {/* Full Width Background */}
                    <div className="bg-gradient-to-b from-blue-200 to-blue-300 w-full flex flex-col justify-center py-4">
                        {/* Ucapan Selamat Datang */}
                        {auth?.user && (
                            <div className="px-4 py-2 w-full">
                                <h1 className="text-sm md:text-lg font-semibold text-[#154561] text-left">
                                    <span role="img" aria-label="tangan melambai">👋</span> Halo, {auth.user.name}!
                                </h1>
                            </div>
                        )}
                        <div className="px-4 py-2">
                            <h1 className="text-2xl md:text-3xl font-bold text-[#154561] text-left">
                                Mau Belajar Apa Hari Ini? <span role="img" aria-label="roket">🚀</span>
                            </h1>
                        </div>
                    </div>

                    {/* Search Section */}
                    <div className="bg-white rounded-lg p-4 shadow-md max-w-4xl mx-auto mt-4">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    placeholder="Masukkan keywords pencarian"
                                    className="w-full px-4 py-2 rounded-md border border-gray-300"
                                />
                            </div>
                            <div className="sm:w-1/3">
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
                        <h2 className="text-xl font-bold text-[#154561] mb-6">
                            Ruang Belajar
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                            {subjects.map((subject, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center cursor-pointer hover:bg-blue-50 p-2 rounded-lg transition-colors"
                                    onClick={() => handleSubjectClick(subject.name)}
                                >
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                                        <span className="text-2xl">{subject.icon}</span>
                                    </div>
                                    <p className="text-xs text-center">{subject.name}</p>
                                </div>
                            ))}
                            <div
                                onClick={openPopupKelas}
                                className="flex flex-col items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
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
                <section className="bg-blue-100 py-8">
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

                {/* Grafik Jumlah Konten */}
                <section className="bg-blue-100 py-8">
                    <div className="container mx-auto px-4">
                        <ChartJumlahKonten />
                    </div>
                </section>

                <PopupSemuaKelas isOpen={isPopupKelasOpen} onClose={closePopupKelas} />
                <PopupPilihJenjang isOpen={isPopupJenjangOpen} onClose={closePopupJenjang} />
                <Footer />
            </div>
        </>
    );
}