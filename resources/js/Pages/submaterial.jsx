import { Head } from '@inertiajs/react'; 
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Download } from "lucide-react";
import Navbar from '@/Components/NavbarUser';
import Footer from '@/Components/Footer';

export default function Submaterial({ auth, nama_pelajaran, nama_jenjang, nama_submateri }) {
    const [data, setData] = useState(null);
    const [activeTab, setActiveTab] = useState("detail");
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

    const getYoutubeEmbedUrl = (url) => {
      if (!url) return null;

      // youtu.be
      if (url.includes("youtu.be")) {
          const videoId = url.split("youtu.be/")[1].split("?")[0];
          return `https://www.youtube.com/embed/${videoId}`;
      }

      // youtube.com/watch?v=
      if (url.includes("watch?v=")) {
          const videoId = url.split("watch?v=")[1].split("&")[0];
          return `https://www.youtube.com/embed/${videoId}`;
      }

      return null;
  };



    return (
        <>
            <Head title={data.nama_submateri || 'Materi Pembelajaran'} />
            <Navbar auth={auth} />
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white p-4 shadow rounded-lg">
                    <iframe
                    className="w-full h-64 md:h-96"
                    src={getYoutubeEmbedUrl(data.konten?.[0]?.link_konten)}
                    title="Video Pembelajaran"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    />


                    <h2 className="text-xl font-bold mt-4">{data.konten?.[0]?.judul_konten}</h2>
                </div>
                
                <div className="mt-6">
                    <div className="flex space-x-4 border-b">
                        {['detail', 'latihan', 'rangkuman'].map(tab => (
                            <button
                                key={tab}
                                className={`py-2 px-4 ${activeTab === tab ? 'border-b-2 border-blue-500' : ''}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>

                    <div className="p-4 bg-gray-50 mt-2 rounded-lg">
                        {activeTab === "detail" && (
                            <div>
                                <h3 className="text-lg font-semibold">Detail Materi</h3>
                                <p>{data.konten?.[0]?.deskripsi || 'Tidak ada deskripsi.'}</p>
                            </div>
                        )}

                        {activeTab === "latihan" && (
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Latihan Soal</h3>
                                {data.latihan_soal?.map((soal, index) => (
                                    <LatihanCard key={index} soal={soal} index={index} />
                                ))}
                            </div>
                        )}

                        {activeTab === "rangkuman" && (
                            <div>
                                <h3 className="text-lg font-semibold ">Rangkuman</h3>
                                {data.rangkuman && data.rangkuman.length > 0 ? (
                                <a
                                    href={`/storage/${data.rangkuman[0].file_rangkuman}`}
                                    download
                                    className="flex items-center justify-center gap-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-fit"
                                >
                                    <Download size={18} />
                                    <span>Download Rangkuman</span>
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

// 🔹 Komponen Kartu Latihan
function LatihanCard({ soal, index }) {
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const handleSelect = (opsi) => {
    setSelected(opsi);

    if (opsi === soal.jawaban_benar) {
      setFeedback({ correct: true, message: "✅ Jawaban kamu benar!" });
    } else {
      setFeedback({
        correct: false,
        message: `❌ Jawaban salah. Jawaban yang benar adalah: ${soal.jawaban_benar}`,
      });
    }
  };

  const opsiList = [
    { key: "A", text: soal.opsi_a },
    { key: "B", text: soal.opsi_b },
    { key: "C", text: soal.opsi_c },
    { key: "D", text: soal.opsi_d },
  ];

  return (
    <div className="mb-6 border p-4 rounded-lg">
      <p className="font-medium mb-3">
        {index + 1}. {soal.pertanyaan}
      </p>

      <div className="space-y-2">
        {opsiList.map((opsi) => (
          <label
            key={opsi.key}
            className={`block p-2 border rounded cursor-pointer ${
              selected === opsi.key
                ? "bg-blue-100 border-blue-500"
                : "hover:bg-gray-100"
            }`}
          >
            <input
              type="radio"
              name={`soal-${index}`}
              value={opsi.key}
              checked={selected === opsi.key}
              onChange={() => handleSelect(opsi.key)}
              className="mr-2"
            />
            {opsi.key}. {opsi.text}
          </label>
        ))}
      </div>

      {feedback && (
        <div
          className={`mt-3 p-2 rounded ${
            feedback.correct
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {feedback.message}
        </div>
      )}
    </div>
  );
}
