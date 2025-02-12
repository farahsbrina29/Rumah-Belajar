import { Head, router } from '@inertiajs/react';
import Navbar from '@/Components/NavbarUser';
import Footer from '@/Components/Footer';
import PopupSemuaKelas from '@/Components/PopupSemuaKelas';
import PopupPilihJenjang from '@/Components/PopupPilihJenjang';
import ChartJumlahKonten from '@/Components/ChartJumlahKonten';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Welcome({ auth }) {
    const [isPopupKelasOpen, setIsPopupKelasOpen] = useState(false);
    const [isPopupJenjangOpen, setIsPopupJenjangOpen] = useState(false);
    const [selectedJenjang, setSelectedJenjang] = useState("Pilih Jenjang");
    const [idJenjang, setIdJenjang] = useState(null);
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [rekomendasi, setRekomendasi] = useState([]);
    const [loadingRekomendasi, setLoadingRekomendasi] = useState(true);
    const [errorRekomendasi, setErrorRekomendasi] = useState(null);

    const openPopupKelas = () => {
        if (!loading && subjects.length > 0) {
            setIsPopupKelasOpen(true);
        }
    };
    const closePopupKelas = () => setIsPopupKelasOpen(false);
    const openPopupJenjang = () => setIsPopupJenjangOpen(true);
    const closePopupJenjang = () => setIsPopupJenjangOpen(false);

    // Modified handleSelectJenjang to handle "no filter" case
    const handleSelectJenjang = (id, nama) => {
        if (nama === "Semua Jenjang") {
            setSelectedJenjang("Pilih Jenjang");
            setIdJenjang(null);
            localStorage.removeItem('selectedJenjang');
            localStorage.removeItem('idJenjang');
        } else {
            setSelectedJenjang(nama);
            setIdJenjang(id);
            localStorage.setItem('selectedJenjang', nama);
            localStorage.setItem('idJenjang', id);
        }
        closePopupJenjang();
        fetchSubjects(id); // Explicitly fetch subjects when jenjang changes
    };

    // Separate function to fetch subjects
    const fetchSubjects = async (jenjangId) => {
        setLoading(true);
        setError(null);
        
        try {
            const url = jenjangId 
                ? `/api/mata-pelajaran/${jenjangId}`
                : '/api/mata-pelajaran';
                
            const response = await axios.get(url);
            
            if (response.data && Array.isArray(response.data)) {
                setSubjects(response.data);
            } else {
                throw new Error("Format data tidak valid");
            }
        } catch (error) {
            console.error("Gagal mengambil data mata pelajaran", error);
            setError("Gagal memuat mata pelajaran");
            setSubjects([]);
        } finally {
            setLoading(false);
        }
    };

    // Load stored jenjang and fetch subjects on mount
    useEffect(() => {
        const storedJenjang = localStorage.getItem('selectedJenjang');
        const storedIdJenjang = localStorage.getItem('idJenjang');
        
        if (storedJenjang && storedIdJenjang) {
            setSelectedJenjang(storedJenjang);
            setIdJenjang(storedIdJenjang);
            fetchSubjects(storedIdJenjang);
        } else {
            fetchSubjects(null); // Fetch all subjects if no jenjang is selected
        }
    }, []);

    // Load rekomendasi
    useEffect(() => {
        setLoadingRekomendasi(true);
        setErrorRekomendasi(null);
        
        let url = "http://127.0.0.1:8000/api/rekomendasi";
        if (idJenjang) {
            url += `?idJenjang=${idJenjang}`;
        }
        
        axios.get(url)
            .then(response => {
                if (response.data && Array.isArray(response.data)) {
                    setRekomendasi(response.data);
                } else {
                    setErrorRekomendasi("Format data tidak valid");
                    setRekomendasi([]);
                }
            })
            .catch(error => {
                console.error("Error fetching rekomendasi:", error);
                setErrorRekomendasi("Gagal memuat rekomendasi");
                setRekomendasi([]);
            })
            .finally(() => {
                setLoadingRekomendasi(false);
            });
    }, [idJenjang]);

    const subjectIcons = [
        { name: 'Biologi', icon: '🧬' },
        { name: 'PKN', icon: '🛡️' },
        { name: 'Fisika', icon: '⚡' },
        { name: 'Matematika', icon: '📊' },
        { name: 'Bahasa Indonesia', icon: '📚' },
        { name: 'Bahasa Inggris', icon: '🌍' },
        { name: 'Kimia', icon: '🧪' },
        { name: 'Ekonomi', icon: '💵' },
        { name: 'Sosiologi', icon: '💬' },
        { name: 'Geografi', icon: '🧭' },
        { name: 'Sejarah', icon: '📜' },
        { name: 'Penjaskes', icon: '🏃‍♂️' },
        { name: 'Teknologi dan Rekayasa', icon: '🛠️' },
        { name: 'Teknologi Informasi dan Komunikasi', icon: '💻' },
        { name: 'Kesehatan dan Farmasi', icon: '⚕️' },
        { name: 'Agribisnis dan Agriteknologi', icon: '🌾' },
        { name: 'Kemaritiman', icon: '⚓' },
        { name: 'Bisnis Manajemen', icon: '📈' },
        { name: 'Pariwisata', icon: '🌴' },
        { name: 'Seni dan Industri Kreatif', icon: '🎨' },
        { name: 'Energi dan Pertambangan', icon: '⛏️' },
        { name: 'Tunanetra', icon: '🔊' },
        { name: 'Tunarungu', icon: '🔠' },
        { name: 'Tunagrahita', icon: '💡' },
        { name: 'Tunadaksa', icon: '🖥️' },
        { name: 'Tunalaras', icon: '🌟' },
        { name: 'Tunawicara', icon: '✍️' },
        { name: 'Tunaganda', icon: '📖' },
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
                    <div className="bg-gradient-to-b from-blue-200 to-blue-300 w-full flex flex-col justify-center py-4">
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
                    <div className="bg-white rounded-lg p-4 shadow-md max-w-5xl mx-auto mt-4">
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
                                    <span>{selectedJenjang}</span>
                                    <span>▼</span>
                                </button>
                            </div>
                        </div>
                        {error && (
                            <div className="mt-2 text-red-500 text-sm">
                                {error}
                            </div>
                        )}
                    </div>

                    {/* Ruang Belajar Section */}
                    <div className="mt-8 bg-white rounded-lg p-6 shadow-md max-w-5xl mx-auto">
                        <h2 className="text-xl font-bold text-[#154561] mb-6">
                            Ruang Belajar
                        </h2>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                            {loading ? (
                                <div className="col-span-full text-center">Memuat mata pelajaran...</div>
                            ) : error ? (
                                <div className="col-span-full text-center text-red-500">{error}</div>
                            ) : subjects && subjects.length > 0 ? (
                                <>
                                    {subjects.slice(0, 7).map((subject, index) => {
                                        const matchedSubject = subjectIcons.find(s => 
                                            s.name.toLowerCase() === subject.nama_pelajaran.toLowerCase()
                                        );
                                        const icon = matchedSubject ? matchedSubject.icon : '📘';

                                        return (
                                            <div
                                                key={index}
                                                className="flex flex-col items-center cursor-pointer hover:bg-blue-50 p-2 rounded-lg transition-colors"
                                                onClick={() => handleSubjectClick(subject.nama_pelajaran)}
                                            >
                                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                                                    <span className="text-2xl">{icon}</span>
                                                </div>
                                                <p className="text-xs text-center">{subject.nama_pelajaran}</p>
                                            </div>
                                        );
                                    })}
                                    
                                    <div
                                        onClick={loading ? undefined : openPopupKelas}
                                        className={`flex flex-col items-center ${loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-gray-50'} p-2 rounded-lg transition-colors`}
                                    >
                                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                                            <span className="text-2xl">⋯</span>
                                        </div>
                                        <p className="text-xs text-center">Semua</p>
                                    </div>
                                </>
                            ) : (
                                <div className="col-span-full text-center">
                                    Belum ada mata pelajaran tersedia.
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Rekomendasi Section */}
                <section className="bg-blue-100 py-8">
                    <div className="container mx-auto px-4">
                        <div className="bg-[#154561] rounded-lg p-6 shadow-md max-w-5xl mx-auto">
                            <h2 className="text-xl font-bold text-white mb-6">
                                Rekomendasi Belajar Untuk Kamu!
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {loadingRekomendasi ? (
                                    <div className="text-center text-white">Memuat rekomendasi...</div>
                                ) : errorRekomendasi ? (
                                    <div className="text-center text-red-400">{errorRekomendasi}</div>
                                ) : rekomendasi.length > 0 ? (
                                    rekomendasi.map((item, index) => (
                                        <div
                                            key={index}
                                            className="bg-white rounded-lg p-4 flex items-center gap-4"
                                        >
                                            <img src={item.thumbnail} alt={item.judul_konten} className="w-12 h-12 object-cover rounded" />
                                            <div>
                                                <h3 className="font-semibold mb-1">{item.judul_konten}</h3>
                                                <p className="text-sm text-gray-600">
                                                    {item.nama_pelajaran} - {item.nama_jenjang}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center text-white">
                                        Belum ada rekomendasi untuk jenjang terpilih.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Additional Sections */}
                <section className="bg-blue-100 py-8">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                            <div className="bg-white rounded-lg p-6 shadow-md">
                                <h2 className="text-xl font-bold mb-4">Konten</h2>
                                <p className="text-gray-600 mb-4">
                                    Fitur konten
                                </p>
                                <button 
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                    onClick={() => window.location.href = "/konten"}
                                >
                                    Masuk Konten
                                </button>
                            </div>

                            <div className="bg-white rounded-lg p-6 shadow-md">
                                <h2 className="text-xl font-bold mb-4">Rangkuman</h2>
                                <p className="text-gray-600 mb-4">
                                    Fitur rangkuman
                                </p>
                                <button 
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                    onClick={() => window.location.href = "/rangkuman"}
                                >
                                    Masuk Rangkuman
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Grafik Section */}
                <section className="bg-blue-100 py-8">
                    <div className="container mx-auto px-4">
                        <div className="max-w-2xl mx-auto">
                            <ChartJumlahKonten />
                        </div>
                    </div>
                </section>

                {/* Popup Components */}
                <div className="relative z-50">
                    {isPopupKelasOpen && (
                        <PopupSemuaKelas 
                            isOpen={isPopupKelasOpen} 
                            onClose={closePopupKelas} 
                            subjects={subjects}
                        />
                    )}
                    {isPopupJenjangOpen && (
                        <PopupPilihJenjang 
                            isOpen={isPopupJenjangOpen} 
                            onClose={closePopupJenjang} 
                            onSelectJenjang={handleSelectJenjang} 
                        />
                    )}
                </div>

                <Footer />
            </div>
        </>
    );
}
