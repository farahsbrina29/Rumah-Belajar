import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Trash, Edit } from 'lucide-react';
import AdminNavbar from '@/Components/AdminNavbar';

const Content = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  // Ambil data dari API saat komponen pertama kali dirender
  useEffect(() => {
    const token = localStorage.getItem('token');
    fetchData(token);
  }, []);

  const fetchData = async (token) => {
    try {
      const response = await fetch('/api/tabel-konten', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const jsonData = await response.json();
      if (!response.ok) throw new Error(jsonData.message || 'Failed to fetch');
      console.log("Data fetched:", jsonData);
      setData(jsonData);
      setError(null);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Gagal mengambil data');
    }
  };

  // Fungsi untuk menghapus data
  const handleDelete = useCallback(async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus baris ini?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/tabel-konten/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error('Failed to delete');
        setData((prevData) => prevData.filter((item) => item.id !== id));
      } catch (err) {
        console.error('Error deleting data:', err);
        setError('Gagal menghapus data');
      }
    }
  }, []);

  // Fungsi untuk menyimpan hasil edit baris menggunakan modal editing bawaan Material React Table
  const handleSaveRowEdits = useCallback(
    async ({ exitEditingMode, row, values }) => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/tabel-konten/${row.original.id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
        if (!response.ok) throw new Error('Failed to update');
        // Perbarui state data
        setData((prevData) =>
          prevData.map((item) =>
            item.id === row.original.id ? { ...item, ...values } : item
          )
        );
        exitEditingMode(); // keluar dari mode editing
      } catch (err) {
        console.error('Error updating data:', err);
        setError('Gagal memperbarui data');
      }
    },
    []
  );

  // Definisi kolom untuk Material React Table (tanpa kolom Judul)
  const columns = useMemo(
    () => [
      {
        accessorKey: 'nama_submateri',
        header: 'Submateri',
      },
      {
        accessorKey: 'nama_jenjang',
        header: 'Jenjang',
      },
      {
        accessorKey: 'judul_konten',
        header: 'Judul Konten',
        enableEditing: true,
      },
      {
        accessorKey: 'deskripsi',
        header: 'Deskripsi',
        enableEditing: true,
      },
      {
        accessorKey: 'nama_pelajaran',
        header: 'Pelajaran',
      },
    ],
    []
  );

  return (
    <AdminNavbar>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Tabel Konten</h1>

        {/* Tampilkan pesan error jika ada */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <MaterialReactTable
          columns={columns}
          data={data}
          editingMode="modal" // Mode editing dengan modal
          enableEditing
          onEditingRowSave={handleSaveRowEdits}
          positionActionsColumn="last" // Tempatkan kolom aksi di akhir
          // Render aksi di tiap baris: tombol edit dan hapus
          renderRowActions={({ row, table }) => (
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => table.setEditingRow(row)}
                className="text-blue-600 hover:text-blue-900"
              >
                <Edit size={20} />
              </button>
              <button
                onClick={() => handleDelete(row.original.id)}
                className="text-red-600 hover:text-red-900"
              >
                <Trash size={20} />
              </button>
            </div>
          )}
          muiTableContainerProps={{ sx: { maxHeight: 500 } }}
        />
      </div>
    </AdminNavbar>
  );
};

export default Content;
