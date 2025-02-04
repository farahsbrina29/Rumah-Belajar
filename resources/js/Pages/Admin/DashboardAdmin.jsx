import React from "react";
import AdminNavbar from "@/Components/AdminNavbar";
import ChartJumlahKonten from "@/Components/ChartJumlahKonten";
import { FaUsers, FaFileAlt, FaBook } from "react-icons/fa";

const Dashboard = () => {
  return (
    <AdminNavbar>
      {/* Tambahkan flex flex-col agar layout tetap proporsional */}
      <div className="flex flex-col flex-grow max-w-6xl mx-auto pt-4 pb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-10 text-center">
          Selamat datang di Admin Dashboard!
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">Total Pengguna</h2>
              <p className="text-xl">1000</p>
            </div>
            <FaUsers className="w-8 h-8 text-blue-500" />
          </div>
          <div className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">Total Konten</h2>
              <p className="text-xl">250</p>
            </div>
            <FaFileAlt className="w-8 h-8 text-green-500" />
          </div>
          <div className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">Total Rangkuman</h2>
              <p className="text-xl">75</p>
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
