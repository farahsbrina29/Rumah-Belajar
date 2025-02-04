import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import Navbar from '@/Components/NavbarUser';
import Footer from '@/Components/Footer';
import { useState } from 'react';

export default function SubMaterial({ auth, subject, materialSlug, material }) {
    const [activeTab, setActiveTab] = useState('materi');

    return (
        <>
            <Head title={`${subject} - ${material.title}`} />
            <div className="bg-gray-50 text-black min-h-screen">
                <Navbar auth={auth} />
                <main className="pt-16">
                    <div className="bg-blue-100 py-6">
                        <div className="container mx-auto px-4">
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <Link href="/">Beranda</Link>
                                <span>/</span>
                                <Link href={`/ruang-belajar/${subject.toLowerCase()}`}>
                                    {subject}
                                </Link>
                                <span>/</span>
                                <span className="font-medium">{material.title}</span>
                            </div>
                        </div>
                    </div>

                    <div className="container mx-auto px-4 py-8">
                        <h1 className="text-2xl font-bold mb-6">{material.title}</h1>

                        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8 max-w-4xl mx-auto">
                            <div className="aspect-w-16 aspect-h-9">
                                <div className="w-full h-0 pb-[50%] relative bg-gray-100">
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

                        <div className="bg-[#1E4C6A] text-white rounded-lg p-4 mb-8">
                            <h3 className="text-lg font-semibold mb-4">Materi Selengkapnya</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <button
                                    onClick={() => setActiveTab('materi')}
                                    className={`flex items-center space-x-2 p-3 rounded-lg transition-colors ${
                                        activeTab === 'materi' ? 'bg-blue-700' : 'hover:bg-blue-700'
                                    }`}
                                >
                                    <span>📚</span>
                                    <span>Detail Materi</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('latihan')}
                                    className={`flex items-center space-x-2 p-3 rounded-lg transition-colors ${
                                        activeTab === 'latihan' ? 'bg-blue-700' : 'hover:bg-blue-700'
                                    }`}
                                >
                                    <span>✍️</span>
                                    <span>Latihan Soal</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('rangkuman')}
                                    className={`flex items-center space-x-2 p-3 rounded-lg transition-colors ${
                                        activeTab === 'rangkuman' ? 'bg-blue-700' : 'hover:bg-blue-700'
                                    }`}
                                >
                                    <span>📋</span>
                                    <span>Rangkuman</span>
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6">
                            {activeTab === 'materi' && (
                                <div className="prose max-w-none">
                                    <h2 className="text-xl font-bold mb-4">Detail Materi</h2>
                                    <div
                                        className="text-gray-600"
                                        dangerouslySetInnerHTML={{ __html: material.description }}
                                    />
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
                                    <div className="prose max-w-none text-gray-600">{material.summary}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}
