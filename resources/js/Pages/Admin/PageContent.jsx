import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Trash, Edit, FilePlus, MessageSquarePlus } from 'lucide-react';
import AdminNavbar from '@/Components/AdminNavbar';
import AddSubmateri from '@/Components/AddSubmateri';
import EditKonten from '@/Components/EditKonten';

const Content = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isAddSubmateriOpen, setIsAddSubmateriOpen] = useState(false);
  const [isEditKontenOpen, setIsEditKontenOpen] = useState(false);
  const [selectedKonten, setSelectedKonten] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/tabel-konten', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      const jsonData = await response.json();
      if (!response.ok) throw new Error(jsonData.message || 'Failed to fetch');

      setData(jsonData.data ?? jsonData);
      setError(null);
    } catch (err) {
      setError('Gagal mengambil data');
    }
  };

  const handleDelete = useCallback(async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus baris ini?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/tabel-konten/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });

        if (!response.ok) throw new Error('Failed to delete');
        setData((prevData) => prevData.filter((item) => item.id !== id));
      } catch (err) {
        setError('Gagal menghapus data');
      }
    }
  }, []);

  const columns = useMemo(
    () => [
      { accessorKey: 'nama_submateri', header: 'Submateri' },
      { accessorKey: 'nama_jenjang', header: 'Jenjang' },
      { accessorKey: 'nama_pelajaran', header: 'Pelajaran' },
      { accessorKey: 'judul_konten', header: 'Judul Konten', enableEditing: true },
      { accessorKey: 'deskripsi', header: 'Deskripsi', enableEditing: true },
      { accessorKey: 'jenis_konten', header: 'Jenis Konten', enableEditing: true },
      {
        accessorKey: 'thumbnail',
        header: 'Thumbnail',
        Cell: ({ cell }) =>
          cell.getValue() && cell.getValue() !== '-' ? (
            <img
              src={cell.getValue()}
              alt="Thumbnail"
              style={{ width: '50px', height: 'auto' }}
            />
          ) : (
            '-'
          ),
      },
      {
        accessorKey: 'link_konten',
        header: 'Link Konten',
        Cell: ({ cell }) =>
          cell.getValue() && cell.getValue() !== '-' ? (
            <a href={cell.getValue()} target="_blank" rel="noopener noreferrer">
              {cell.getValue()}
            </a>
          ) : (
            '-'
          ),
      },
      {
        id: 'actions',
        header: 'Aksi',
        Cell: ({ row }) => {
          const { nama_submateri } = row.original;

          return (
            <div style={{ display: 'flex', gap: '1rem' }}>
              {/* Edit */}
              <button
                onClick={() => {
                  setSelectedKonten(row.original);
                  setIsEditKontenOpen(true);
                }}
                className="text-blue-600 hover:text-blue-900"
              >
                <Edit size={20} />
              </button>

              {/* Hapus */}
              <button
                onClick={() => handleDelete(row.original.id)}
                className="text-red-600 hover:text-red-900"
              >
                <Trash size={20} />
              </button>

              {/* Tambah Rangkuman */}
              <button
                onClick={() =>
                  (window.location.href = `/admin/konten/${nama_submateri}/rangkuman`)
                }
                className="text-green-600 hover:text-green-900"
                title="Tambah Rangkuman"
              >
                <FilePlus size={20} />
              </button>

              {/* Tambah Pertanyaan */}
              <button
                onClick={() =>
                  (window.location.href = `/admin/konten/${nama_submateri}/pertanyaan`)
                }
                className="text-purple-600 hover:text-purple-900"
                title="Tambah Pertanyaan"
              >
                <MessageSquarePlus size={20} />
              </button>
            </div>
          );
        },
      },
    ],
    [handleDelete],
  );

  return (
    <AdminNavbar>
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-4">Informasi Konten</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

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
    </AdminNavbar>
  );
};

export default Content;
