import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import Navbar from "@/components/NavbarUser";
import Footer from "@/components/Footer";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiDownload } from "react-icons/fi";


export default function RangkumanDetail({ auth, nama_submateri }) {
  const [rangkuman, setRangkuman] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRangkuman = async () => {
      if (!nama_submateri) {
        setError("Nama submateri tidak ditemukan.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/rangkuman/submateri/${encodeURIComponent(
            nama_submateri
          )}`
        );

        if (response.data.status === "success") {
          setRangkuman(response.data.data);
        } else {
          setError("Rangkuman tidak ditemukan.");
        }
      } catch (error) {
        setError("Terjadi kesalahan saat mengambil data.");
      } finally {
        setLoading(false);
      }
    };

    fetchRangkuman();
  }, [nama_submateri]);

  const pdfUrl = rangkuman?.file_rangkuman
    ? `/storage/${rangkuman.file_rangkuman}`
    : null;

  
  const SkeletonCard = () => (
  <div className="bg-white shadow-md rounded-lg p-6 animate-pulse">
    <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>

    <div className="h-10 bg-gray-300 rounded w-40 mb-6"></div>

    <div className="h-[600px] bg-gray-200 rounded"></div>
  </div>
);


  return (
  <>
    <Head title="Detail Rangkuman" />

    
    <div className="fixed top-0 left-0 w-full z-50">
      <Navbar auth={auth} />
    </div>

   
    <div className="flex flex-col min-h-screen">
      
      <main className="flex-grow container mx-auto px-4 pt-28 pb-10">
        {loading ? (
          <SkeletonCard />
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : rangkuman ? (
          <div className="bg-white shadow-md rounded-lg p-6">
      
            <nav className="text-sm text-gray-700 mb-4">
              <a
                href="/rangkuman"
                className="hover:text-gray-500 hover:underline"
              >
                Rangkuman
              </a>
              <span className="mx-2">/</span>
              <span className="text-gray-700 font-medium">
                {rangkuman.nama_submateri}
              </span>
            </nav>

            <h2 className="text-xl font-bold mb-4">
              {rangkuman.nama_submateri}
            </h2>


           
            {pdfUrl ? (
              <div className="border rounded-lg overflow-hidden">
                <iframe
                  src={pdfUrl}
                  className="w-full h-[600px]"
                  title="Preview PDF Rangkuman"
                />
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                PDF rangkuman tidak tersedia
              </p>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            Tidak ada rangkuman tersedia.
          </p>
        )}
      </main>

     
      <Footer />
    </div>

    <ToastContainer
      position="top-right"
      autoClose={3000}
      newestOnTop
      theme="light"
    />
  </>
);
}
