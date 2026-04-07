import React, { useState, useEffect, useMemo } from 'react'
import { MaterialReactTable } from 'material-react-table'
import { Trash, Edit, FilePlus, MessageSquarePlus } from 'lucide-react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AdminNavbar from '@/Components/AdminNavbar'
import AddSubmateri from '@/Components/AddSubmateri'
import EditKonten from '@/Components/EditKonten'

const Content = () => {
  const [data, setData] = useState([])
  const [isAddSubmateriOpen, setIsAddSubmateriOpen] = useState(false)
  const [isEditKontenOpen, setIsEditKontenOpen] = useState(false)
  const [selectedKonten, setSelectedKonten] = useState(null)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const res = await fetch('/admin/tabel-konten', {
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
      })

      if (!res.ok) throw new Error('Unauthorized')

      const json = await res.json()
      setData(json.data ?? json)
    } catch (err) {
      toast.error('Gagal mengambil data', {
        toastId: 'fetch-error',
      })
    }
  }

  const confirmDelete = (id) => {
    setDeleteId(id)
    setIsDeleteOpen(true)
  }

  // HANDLE DELETE 
  const handleDelete = async () => {
    try {
      const res = await fetch(`/admin/tabel-konten/${deleteId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'X-CSRF-TOKEN': document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute('content'),
        },
      })

      if (!res.ok) throw new Error()

      setData((prev) => prev.filter((item) => item.id !== deleteId))

      toast.success('Konten berhasil dihapus ', {
        toastId: 'delete-success',
      })
    } catch {
      toast.error('Gagal menghapus konten ', {
        toastId: 'delete-error',
      })
    } finally {
      setIsDeleteOpen(false)
      setDeleteId(null)
    }
  }

  const columns = useMemo(
    () => [
      {
        id: 'actions',
        header: 'Aksi',
        Cell: ({ row }) => {
          const { nama_submateri, id } = row.original

          return (
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setSelectedKonten(row.original)
                  setIsEditKontenOpen(true)
                }}
                className="text-blue-600"
              >
                <Edit size={20} />
              </button>

              <button
                onClick={() => confirmDelete(id)}
                className="text-red-600"
              >
                <Trash size={20} />
              </button>

              <button
                onClick={() => {
                  window.location.href = `/admin/konten/${nama_submateri}/rangkuman`
                }}
                className="text-green-600"
              >
                <FilePlus size={20} />
              </button>

              <button
                onClick={() => {
                  window.location.href = `/admin/konten/${nama_submateri}/latihan`
                }}
                className="text-purple-600"
              >
                <MessageSquarePlus size={20} />
              </button>
            </div>
          )
        },
      },
      { accessorKey: 'nama_submateri', header: 'Submateri' },
      { accessorKey: 'nama_jenjang', header: 'Jenjang' },
      { accessorKey: 'nama_pelajaran', header: 'Pelajaran' },
      { accessorKey: 'judul_konten', header: 'Judul Konten' },
      {
        accessorKey: 'deskripsi',
        header: 'Deskripsi',
        Cell: ({ cell }) => (
          <div className="max-w-[250px] truncate">
            {cell.getValue()}
          </div>
        ),
      },
    ],
    []
  )

  return (
    <AdminNavbar>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        closeOnClick
      />

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

      {/* MODAL DELETE */}
      {isDeleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-lg font-semibold mb-3">
              Yakin ingin menghapus konten?
            </h2>

            <p className="text-sm text-gray-600 mb-4">
              Data yang dihapus tidak dapat dikembalikan.
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
  )
}

export default Content