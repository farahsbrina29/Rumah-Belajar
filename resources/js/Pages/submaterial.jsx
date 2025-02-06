import React, { useState, useEffect } from "react";
import { usePage } from '@inertiajs/react'; // For accessing data passed from Inertia
import Navbar from "@/components/NavbarUser";
import Footer from "@/components/Footer";
import axios from "axios"; // Assuming you're using axios for data fetching
import { Head, Inertia } from '@inertiajs/react'; // For handling head and navigation with Inertia

export default function SubMaterial({ auth }) {
    const { subject, subject2 } = usePage().props; // Accessing parameters from Inertia page props
    const [material, setMaterial] = useState(null); // State to store material data
    const [activeTab, setActiveTab] = useState('materi');

    // Fetch material data based on the parameters
    useEffect(() => {
        const fetchMaterial = async () => {
            try {
                // Fetch data from the server using subject and subject2
                const response = await axios.get(`/api/ruang-belajar/${subject}/${subject2}`);
                setMaterial(response.data); // Set the fetched material data
            } catch (error) {
                console.error("Error fetching material:", error);
            }
        };

        fetchMaterial();
    }, [subject, subject2]);

    if (!material) {
        return <div>Loading...</div>; // Show loading state while data is being fetched
    }

    return (
        <>
            <Head title={`${subject} - ${material.title}`} />
            <div className="bg-gray-50 text-black min-h-screen">
                <Navbar auth={auth} />
                <main className="pt-16">
                    {/* Header Section */}
                    <div className="bg-blue-100 py-6">
                        <div className="container mx-auto px-4">
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <span className="cursor-pointer" onClick={() => Inertia.visit('/')}>Beranda</span>
                                <span>/</span>
                                <span className="font-medium">{subject}</span>
                                <span>/</span>
                                <span className="font-medium">{material.title}</span>
                            </div>
                        </div>
                    </div>

                    {/* Material Content */}
                    <div className="container mx-auto px-4 py-8">
                        <h1 className="text-2xl font-bold mb-6">{material.title}</h1>
                        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8 max-w-4xl mx-auto">
                            <div className="w-full h-0 pb-[50%] relative bg-gray-100">
                                <iframe
                                    className="absolute inset-0 w-full h-full"
                                    src={`https://www.youtube.com/embed/${material.video_id}`}
                                    title="Material Video"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    </div>

                    {/* Navigation Menu */}
                    <div className="bg-[#1E4C6A] text-white rounded-lg p-4 mb-8">
                        <h3 className="text-lg font-semibold mb-4">Materi Selengkapnya</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Add Navigation Items Here */}
                        </div>
                    </div>

                    {/* Content Sections */}
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
                </main>
                <Footer />
            </div>
        </>
    );
}
