import React, { useState } from "react";
import { Link, router } from "@inertiajs/react";
import { toast } from "react-toastify";

const AdminSidebar = () => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    router.post("/admin/logout", {}, {
      onSuccess: () => toast.success("Berhasil logout"),
      onError: () => toast.error("Gagal logout"),
    });
  };

  return (
    <>
      <div className="bg-gradient-to-b from-[#2C3141] via-[#19386E] to-[#2C3141] text-white w-64 min-h-screen relative">
        <div className="p-6">
          <img src="/assets/logo final.png" alt="Logo" className="h-12 mx-auto" />
          <h1 className="text-center font-bold mt-4 text-lg">
            RUMAH BELAJAR
          </h1>
        </div>

        <nav className="mt-8 space-y-2 px-4">
          <Link href="/admin/profil" className="block px-4 py-3 rounded-lg hover:bg-white/10">
            Profil
          </Link>

          <Link
            href={route('admin.dashboard')}
            className="block px-4 py-3 rounded-lg hover:bg-white/10"
          >
            Panel
          </Link>


          {/* ✅ INI KUNCINYA */}
          <Link
            href={route('admin.users.index')}
            className="block px-4 py-3 rounded-lg hover:bg-white/10"
          >
            Pengguna
          </Link>

          <Link href="/admin/konten" className="block px-4 py-3 rounded-lg hover:bg-white/10">
            Konten
          </Link>
        </nav>

        <div className="absolute bottom-0 w-full p-4">
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full px-4 py-3 rounded-lg hover:bg-white/10"
          >
            Keluar
          </button>
        </div>
      </div>

      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-lg font-semibold mb-3">Konfirmasi Keluar</h2>
            <p className="text-sm text-gray-600 mb-4">
              Apakah Anda yakin ingin keluar?
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 border rounded"
              >
                Batal
              </button>

              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminSidebar;
