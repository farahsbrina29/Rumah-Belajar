import React, { useState, useEffect } from "react";
import AdminNavbar from "@/Components/AdminNavbar";
import { FaUsers, FaFileAlt, FaBook } from "react-icons/fa";
import ChartJumlahKonten from "@/Components/ChartJumlahKonten";

const Dashboard = () => {
  const [stats, setStats] = useState({
    userCount: 0,
    kontenCount: 0,
    rangkumanCount: 0,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    // Ganti URL sesuai dengan base URL backend Anda
    fetch("/api/dashboard-stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => {
        console.error(err);
        setError("Gagal mengambil data dashboard");
      });
  }, []);

  return (
    <AdminNavbar>
      <div className="flex flex-col flex-grow max-w-6xl mx-auto pt-4 pb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-10 text-center">
          Selamat datang di Admin Dashboard!
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">Total Pengguna</h2>
              <p className="text-xl">{stats.userCount}</p>
            </div>
            <FaUsers className="w-8 h-8 text-blue-500" />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">Total Konten</h2>
              <p className="text-xl">{stats.kontenCount}</p>
            </div>
            <FaFileAlt className="w-8 h-8 text-green-500" />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">Total Rangkuman</h2>
              <p className="text-xl">{stats.rangkumanCount}</p>
            </div>
            <FaBook className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        {/* Grafik di tengah dengan ukuran responsif */}
        <div className="flex justify-center flex-grow">
          <div className="w-2/3">
            <ChartJumlahKonten />
          </div>
        </div>
      </div>
    </AdminNavbar>
  );
};

export default Dashboard;
