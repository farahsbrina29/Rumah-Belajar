// resources/js/Pages/SubMaterial.jsx

import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import Navbar from '@/Components/NavbarUser';
import Footer from '@/Components/Footer';
import { useState } from 'react';

export default function SubMaterial({ auth, subject, materialSlug }) {
    const [activeTab, setActiveTab] = useState('materi');

    // Simulate fetching material data - in a real app, this could come from an API or database
    const getMaterialData = () => {
        // This is mock data - replace with actual data source
        const materialsData = {
            'listrik-statis-kapasitor': {
                title: 'Listrik Statis Kapasitor',
                video_id: 'xyz123',
                description: '<p>Materi tentang listrik statis dan kapasitor...</p>',
                exercises: [
                    {
                        id: 1,
                        question: 'Apa yang dimaksud dengan kapasitor?',
                        options: ['Opsi A', 'Opsi B', 'Opsi C', 'Opsi D'],
                        answer: 'A'
                    }
                ],
                summary: 'Rangkuman tentang listrik statis dan kapasitor...'
            },
            // Add other materials as needed
        };

        return materialsData[materialSlug] || {
            title: materialSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
            video_id: 'default123',
            description: 'Detail materi akan ditampilkan di sini...',
            exercises: [],
            summary: 'Rangkuman materi akan ditampilkan di sini...'
        };
    };

    const material = getMaterialData();

    return (
        <>
            <Head title={`${subject} - ${material.title}`} />
            <div className="bg-gray-50 text-black min-h-screen">
                <Navbar auth={auth} />

                {/* Breadcrumb */}
                <div className="bg-blue-100 pt-16 pb-6">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Link href="/">Home</Link>
                            <span>/</span>
                            <Link href={`/belajar/${subject.toLowerCase()}`}>
                                {subject}
                            </Link>
                            <span>/</span>
                            <span className="font-medium">{material.title}</span>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="container mx-auto px-4 py-8">
                    {/* Video Section */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                        <div className="aspect-w-16 aspect-h-9">
                            <div className="w-full h-0 pb-[56.25%] relative bg-gray-100">
                                <iframe
                                    className="absolute inset-0 w-full h-full"
                                    src={`https://www.youtube.com/embed/${material.video_id}`}
                                    title={material.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="bg-white rounded-lg shadow-md">
                        <div className="border-b">
                            <nav className="flex space-x-8 px-6" aria-label="Tabs">
                                <button
                                    onClick={() => setActiveTab('materi')}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                        activeTab === 'materi'
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    Detail Materi
                                </button>
                                <button
                                    onClick={() => setActiveTab('latihan')}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                        activeTab === 'latihan'
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    Latihan Soal
                                </button>
                                <button
                                    onClick={() => setActiveTab('rangkuman')}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                        activeTab === 'rangkuman'
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    Rangkuman
                                </button>
                            </nav>
                        </div>

                        <div className="p-6">
                            {activeTab === 'materi' && (
                                <div className="prose max-w-none">
                                    <h2 className="text-xl font-bold mb-4">Detail Materi</h2>
                                    <div className="text-gray-600" dangerouslySetInnerHTML={{ __html: material.description }} />
                                </div>
                            )}

                            {activeTab === 'latihan' && (
                                <div>
                                    <h2 className="text-xl font-bold mb-4">Latihan Soal</h2>
                                    <div className="space-y-6">
                                        {material.exercises.map((exercise, index) => (
                                            <div key={exercise.id} className="p-4 border rounded-lg">
                                                <p className="font-medium mb-4">Soal {index + 1}</p>
                                                <p className="text-gray-600 mb-4">{exercise.question}</p>
                                                <div className="space-y-2">
                                                    {exercise.options.map((option, optIndex) => (
                                                        <label key={optIndex} className="flex items-center space-x-3">
                                                            <input
                                                                type="radio"
                                                                name={`question-${exercise.id}`}
                                                                className="form-radio"
                                                            />
                                                            <span>{option}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'rangkuman' && (
                                <div>
                                    <h2 className="text-xl font-bold mb-4">Rangkuman</h2>
                                    <div className="prose max-w-none text-gray-600">
                                        {material.summary}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
}