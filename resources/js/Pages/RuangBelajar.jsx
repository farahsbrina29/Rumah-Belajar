// resources/js/Pages/RuangBelajar.jsx
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import Navbar from '@/Components/NavbarUser';
import Footer from '@/Components/Footer';

export default function RuangBelajar({ auth, subject }) {
    const subMaterials = [
        {
            id: 1, 
            title: 'materi 1',
            slug: 'materi-1'
        },
        {
            id: 2,
            title: 'materi 2',
            slug: 'materi-2' 
        },
        {
            id: 3,
            title: 'materi 3',
            slug: 'materi-3'
        }
    ];

    return (
        <>
            <Head title={`Ruang Belajar - ${subject}`} />
            <div className="bg-gray-50 text-black min-h-screen">
                <Navbar auth={auth} />
                
                {/* Hero Section */}
                <header className="bg-blue-100 pt-16 pb-6">
                    <div className="bg-gradient-to-b from-blue-200 to-blue-300 w-full flex flex-col justify-center py-4">
                        <div className="container mx-auto px-4">
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <Link href="/">Beranda</Link>
                                <span>/</span>
                                <span className="font-medium">{subject}</span>
                            </div>
                            <h1 className="text-2xl md:text-3xl font-bold text-[#154561] mt-2">
                                {subject} <span role="img" aria-label="buku">{getSubjectEmoji(subject)}</span>
                            </h1>
                        </div>
                    </div>
                </header>

                {/* Content Section */}
                <section className="container mx-auto px-4 py-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold mb-6">Materi Pembelajaran</h2>
                        <div className="space-y-4">
                            {subMaterials.map((material) => (
                                <Link
                                    key={material.id}
                                    href={`/belajar/${subject.toLowerCase()}/${material.slug}`}
                                    className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                                    preserveScroll
                                >
                                    <div className="flex-1">
                                        <h3 className="text-lg font-medium text-gray-900">{material.title}</h3>
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
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
                
                <Footer />
            </div>
        </>
    );
}

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