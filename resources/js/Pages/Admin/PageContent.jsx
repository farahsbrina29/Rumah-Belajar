import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Trash, Edit, FilePlus, MessageSquarePlus } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AdminNavbar from '@/Components/AdminNavbar';
import AddSubmateri from '@/Components/AddSubmateri';
import EditKonten from '@/Components/EditKonten';

const Content = () => {
  const [data, setData] = useState([]);
  const [isAddSubmateriOpen, setIsAddSubmateriOpen] = useState(false);
  const [isEditKontenOpen, setIsEditKontenOpen] = useState(false);
  const [selectedKonten, setSelectedKonten] = useState(null);

  // 🔴 state popup delete
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/tabel-konten', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      const json = await res.json();
      if (!res.ok) throw new Error();

      setData(json.data ?? json);
    } catch {
      toast.error('Gagal mengambil data');
    }
  };

  // ================= DELETE =================
  const confirmDelete = (id) => {
    setDeleteId(id);
    setIsDeleteOpen(true);
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/tabel-konten/${deleteId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      if (!res.ok) throw new Error();

      setData((prev) => prev.filter((item) => item.id !== deleteId));
      toast.success('Konten berhasil dihapus');
    } catch {
      toast.error('Gagal menghapus konten');
    } finally {
      setIsDeleteOpen(false);
      setDeleteId(null);
    }
  };

  const columns = useMemo(
    () => [
      {
        id: 'actions',
        header: 'Aksi',
        Cell: ({ row }) => {
          const { nama_submateri } = row.original;

          return (
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setSelectedKonten(row.original);
                  setIsEditKontenOpen(true);
                }}
                className="text-blue-600"
              >
                <Edit size={20} />
              </button>

              <button
                onClick={() => confirmDelete(row.original.id)}
                className="text-red-600"
              >
                <Trash size={20} />
              </button>

              <button
                onClick={() =>
                  (window.location.href = `/admin/konten/${nama_submateri}/rangkuman`)
                }
                className="text-green-600"
              >
                <FilePlus size={20} />
              </button>

              <button
                onClick={() =>
                  (window.location.href = `/admin/konten/${nama_submateri}/latihan`)
                }
                className="text-purple-600"
              >
                <MessageSquarePlus size={20} />
              </button>
            </div>
          );
        },
      },
      { accessorKey: 'nama_submateri', header: 'Submateri' },
      { accessorKey: 'nama_jenjang', header: 'Jenjang' },
      { accessorKey: 'nama_pelajaran', header: 'Pelajaran' },
      { accessorKey: 'judul_konten', header: 'Judul Konten' },
      { accessorKey: 'deskripsi', header: 'Deskripsi' },
    ],
    [],
  );

  return (
    <AdminNavbar>
      {/* ✅ TOAST GLOBAL */}
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Informasi Konten</h1>

        <button
          onClick={() => setIsAddSubmateriOpen(true)}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Tambah Submateri
        </button>

        {isAddSubmateriOpen && (
          <AddSubmateri
            onClose={() => setIsAddSubmateriOpen(false)}
            fetchData={fetchData}
          />
        )}

        {isEditKontenOpen && (
          <EditKonten
            konten={selectedKonten}
            onClose={() => setIsEditKontenOpen(false)}
            fetchData={fetchData}
          />
        )}

        <MaterialReactTable columns={columns} data={data} />
      </div>

      {/* 🔴 POPUP DELETE */}
      {isDeleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="text-lg font-semibold mb-3">
              Yakin ingin menghapus konten?
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Data yang dihapus tidak bisa dikembalikan.
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsDeleteOpen(false)}
                className="px-4 py-2 border rounded"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminNavbar>
  );
};

export default Content;
