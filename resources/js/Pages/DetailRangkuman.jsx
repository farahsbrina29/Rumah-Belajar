import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import Navbar from "@/components/NavbarUser";
import Footer from "@/components/Footer";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  // ====== LOGIKA DOWNLOAD ======
  const handleDownload = async () => {
    if (!rangkuman?.file_rangkuman) {
      toast.error("File rangkuman tidak tersedia");
      return;
    }

    const fileName = rangkuman.file_rangkuman.split("/").pop();
    const fileUrl = `/storage/${rangkuman.file_rangkuman}`;

    try {
      await downloadViaEndpoint(rangkuman.id, fileName);
    } catch {
      try {
        await downloadViaFetch(fileUrl, fileName);
      } catch {
        downloadViaNewTab(fileUrl);
      }
    }
  };

  const downloadViaEndpoint = async (rangkumanId, fileName) => {
    const response = await fetch(`/api/rangkuman/${rangkumanId}/download`, {
      method: "GET",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRF-TOKEN":
          document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute("content") || "",
      },
      credentials: "same-origin",
    });

    if (!response.ok) throw new Error("Endpoint download tidak tersedia");

    const blob = await response.blob();
    downloadBlob(blob, fileName);
    toast.success("File berhasil didownload");
  };

  const downloadViaFetch = async (fileUrl, fileName) => {
    const response = await fetch(fileUrl, { credentials: "same-origin" });
    if (!response.ok) throw new Error("File tidak dapat diakses");

    const blob = await response.blob();
    downloadBlob(blob, fileName);
    toast.success("File berhasil didownload");
  };

  const downloadViaNewTab = (fileUrl) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.target = "_blank";
    link.download = "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.info("📄 File dibuka/didownload di tab baru");
  };

  const downloadBlob = (blob, fileName) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName || "rangkuman";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };
  // ====== END LOGIKA DOWNLOAD ======

  return (
    <>
      <Head title="Detail Rangkuman" />
      {/* NAVBAR FIXED */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar auth={auth} />
      </div>

      {/* WRAPPER FLEX */}
      <div className="flex flex-col min-h-screen">
        {/* Tambah padding-top agar konten tidak ketutup navbar */}
        <main className="flex-grow container mx-auto px-4 py-24">
          {loading ? (
            <p className="text-center text-gray-500">Memuat data...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : rangkuman ? (
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">
                {rangkuman.nama_submateri}
              </h2>
              {rangkuman.file_rangkuman ? (
                <p className="text-gray-700 mb-4">
                  File Rangkuman: {rangkuman.file_rangkuman.split("/").pop()}
                </p>
              ) : (
                <p className="text-red-500 mb-4">
                  ⚠️ File rangkuman belum tersedia
                </p>
              )}

              <button
                onClick={handleDownload}
                disabled={!rangkuman.file_rangkuman}
                className={`px-4 py-2 rounded text-white ${
                  rangkuman.file_rangkuman
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Unduh Rangkuman
              </button>
            </div>
          ) : (
            <p className="text-center text-gray-500">
              Tidak ada rangkuman tersedia.
            </p>
          )}
        </main>

        {/* FOOTER FIXED */}
        <div className="fixed bottom-0 left-0 w-full">
          <Footer />
        </div>
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
