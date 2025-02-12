import React, { useState, useEffect } from "react";
import AdminNavbar from "@/Components/AdminNavbar";
import { FaUsers, FaFileAlt, FaBook } from "react-icons/fa";
import ChartJumlahKonten from "@/Components/ChartJumlahKonten";
import ChartUserRole from "@/Components/ChartUserRole";
import { usePage } from "@inertiajs/react";

const Dashboard = () => {
  const { auth } = usePage().props;
  const [stats, setStats] = useState({
    userCount: 0,
    kontenCount: 0,
    rangkumanCount: 0,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
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
        {/* Welcome Container */}
        <div className="bg-gradient-to-br from-[#2C3141] to-[#19386E] p-6 rounded-lg shadow-lg border border-white/10 backdrop-blur-sm mb-10">
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Selamat datang di Admin Dashboard!
            </h1>
            <p className="text-gray-400">
              Login sebagai: <span className="text-cyan-400">{auth.user?.email || 'admin@email.com'}</span>
            </p>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg backdrop-blur-sm mb-4">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Total Pengguna Card */}
          <div className="bg-gradient-to-br from-[#2C3141] to-[#19386E] p-6 rounded-lg shadow-lg border border-white/10 backdrop-blur-sm">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-gray-400 text-sm font-medium mb-2">Total Pengguna</h2>
                <p className="text-2xl font-bold text-white">{stats.userCount}</p>
              </div>
              <div className="bg-blue-500/20 p-3 rounded-lg">
                <FaUsers className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>

          {/* Total Konten Card */}
          <div className="bg-gradient-to-br from-[#2C3141] to-[#19386E] p-6 rounded-lg shadow-lg border border-white/10 backdrop-blur-sm">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-gray-400 text-sm font-medium mb-2">Total Konten</h2>
                <p className="text-2xl font-bold text-white">{stats.kontenCount}</p>
              </div>
              <div className="bg-emerald-500/20 p-3 rounded-lg">
                <FaFileAlt className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
          </div>

          {/* Total Rangkuman Card */}
          <div className="bg-gradient-to-br from-[#2C3141] to-[#19386E] p-6 rounded-lg shadow-lg border border-white/10 backdrop-blur-sm">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-gray-400 text-sm font-medium mb-2">Total Rangkuman</h2>
                <p className="text-2xl font-bold text-white">{stats.rangkumanCount}</p>
              </div>
              <div className="bg-purple-500/20 p-3 rounded-lg">
                <FaBook className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Jumlah Konten Chart */}
          <div className="w-full">
            <ChartJumlahKonten />
          </div>
          
          {/* User Role Distribution Chart */}
          <div className="w-full">
            <ChartUserRole />
          </div>
        </div>
      </div>
    </AdminNavbar>
  );
};

export default Dashboard;