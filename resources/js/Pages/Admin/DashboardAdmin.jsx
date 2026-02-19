import AdminNavbar from "@/Components/AdminNavbar";
import { FaUsers, FaFileAlt, FaBook } from "react-icons/fa";
import ChartJumlahKonten from "@/Components/ChartJumlahKonten";
import ChartUserRole from "@/Components/ChartUserRole";
import { usePage } from "@inertiajs/react";

export default function DashboardAdmin() {
  const { auth, stats, roleDistribution, jumlahKonten, error } = usePage().props;

  return (
    <AdminNavbar>
      <div className="flex flex-col flex-grow max-w-6xl mx-auto pt-4 pb-10">

        {/* Welcome Container */}
        <div className="bg-gradient-to-br from-[#2C3141] to-[#19386E] p-6 rounded-lg shadow-lg border border-white/10 backdrop-blur-sm mb-10">
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Selamat datang di Admin Panel!
            </h1>
            <p className="text-gray-400">
              Login sebagai:{" "}
              <span className="text-cyan-400">
                {auth?.user?.email ?? "admin@email.com"}
              </span>
            </p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard
            title="Total Pengguna"
            value={stats.userCount}
            icon={<FaUsers className="w-6 h-6 text-blue-400" />}
            iconBg="bg-blue-500/20"
          />

          <StatCard
            title="Total Konten"
            value={stats.kontenCount}
            icon={<FaFileAlt className="w-6 h-6 text-emerald-400" />}
            iconBg="bg-emerald-500/20"
          />

          <StatCard
            title="Total Rangkuman"
            value={stats.rangkumanCount}
            icon={<FaBook className="w-6 h-6 text-purple-400" />}
            iconBg="bg-purple-500/20"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartJumlahKonten data={jumlahKonten} />
          <ChartUserRole data={roleDistribution} />
        </div>
      </div>
    </AdminNavbar>
  );
}

/* ---------- Reusable Card ---------- */
function StatCard({ title, value, icon, iconBg }) {
  return (
    <div className="bg-gradient-to-br from-[#2C3141] to-[#19386E] p-6 rounded-lg shadow-lg border border-white/10 backdrop-blur-sm">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-gray-400 text-sm font-medium mb-2">
            {title}
          </h2>
          <p className="text-2xl font-bold text-white">
            {value}
          </p>
        </div>
        <div className={`${iconBg} p-3 rounded-lg`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
