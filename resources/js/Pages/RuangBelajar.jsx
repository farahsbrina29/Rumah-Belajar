import { Head } from '@inertiajs/react';
import Navbar from '@/Components/NavbarUser';
import Footer from '@/Components/Footer';

export default function RuangBelajar({ auth, subject }) {
    return (
        <>
            <Head title={`Ruang Belajar - ${subject}`} />
            <div className="bg-gray-50 text-black min-h-screen">
                <Navbar auth={auth} />

                {/* Hero Section */}
                <header className="bg-blue-100 pt-16 pb-6">
                    <div className="bg-gradient-to-b from-blue-200 to-blue-300 w-full flex flex-col justify-center py-4">
                        <div className="px-4 py-2">
                            <h1 className="text-2xl md:text-3xl font-bold text-[#154561] text-left">
                                Ruang Belajar {subject} <span role="img" aria-label="buku">{getSubjectEmoji(subject)}</span>
                            </h1>
                        </div>
                    </div>
                </header>

                {/* Content Section */}
                <section className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Materi */}
                        <div className="bg-white rounded-lg p-6 shadow-md">
                            <h2 className="text-xl font-bold mb-4">Materi</h2>
                            <p className="text-gray-600 mb-4">
                                Pelajari materi {subject} secara lengkap
                            </p>
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
                                Lihat Materi
                            </button>
                        </div>

                        {/* Latihan Soal */}
                        <div className="bg-white rounded-lg p-6 shadow-md">
                            <h2 className="text-xl font-bold mb-4">Latihan Soal</h2>
                            <p className="text-gray-600 mb-4">
                                Uji pemahaman dengan latihan soal
                            </p>
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
                                Mulai Latihan
                            </button>
                        </div>

                        {/* Rangkuman */}
                        <div className="bg-white rounded-lg p-6 shadow-md">
                            <h2 className="text-xl font-bold mb-4">Rangkuman</h2>
                            <p className="text-gray-600 mb-4">
                                Pelajari rangkuman materi
                            </p>
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
                                Lihat Rangkuman
                            </button>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}

// Helper function to get emoji based on subject
function getSubjectEmoji(subject) {
    const emojiMap = {
        'Biologi': '🧬',
        'PKN': '🛡️',
        'Fisika': '⚡',
        'Matematika': '📊',
        'Bhs. Indonesia': '📚',
        'Bhs. Inggris': '🌍',
        'Kimia': '🧪'
    };
    return emojiMap[subject] || '📚';
}