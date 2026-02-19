import { useForm } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function AddSubmateri({ onClose }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    nama_submateri: '',
    id_jenjang: '',
    id_mata_pelajaran: '',
  })

  const [jenjangList, setJenjangList] = useState([])
  const [mataPelajaranList, setMataPelajaranList] = useState([])

  // 🔹 Ambil jenjang
  useEffect(() => {
    fetch('/jenjang')
      .then(res => res.json())
      .then(setJenjangList)
      .catch(() => toast.error('Gagal memuat jenjang'))
  }, [])

  // 🔹 Ambil mata pelajaran berdasarkan jenjang
  useEffect(() => {
    if (!data.id_jenjang) {
      setMataPelajaranList([])
      return
    }

    fetch(`/mata_pelajaran_jenjang/${data.id_jenjang}`)
      .then(res => res.json())
      .then(setMataPelajaranList)
      .catch(() => toast.error('Gagal memuat mata pelajaran'))
  }, [data.id_jenjang])

  const submit = (e) => {
    e.preventDefault()

    post('/add-submateri', {
      preserveScroll: true,

      onSuccess: () => {
        toast.success('Submateri berhasil ditambahkan 🎉')
        reset()
        onClose?.()
      },

      onError: () => {
        toast.error('Gagal menambahkan submateri ❌')
      },
    })
  }

  return (
    <>
      {/* 🔔 Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <form
          onSubmit={submit}
          className="bg-white w-96 p-6 rounded-lg shadow"
        >
          <h2 className="text-xl font-semibold mb-4">
            Tambah Submateri
          </h2>

          <input
            type="text"
            value={data.nama_submateri}
            onChange={e => setData('nama_submateri', e.target.value)}
            placeholder="Nama Submateri"
            className="w-full mb-2 p-2 border rounded"
          />
          {errors.nama_submateri && (
            <p className="text-red-500 text-sm">
              {errors.nama_submateri}
            </p>
          )}

          <select
            value={data.id_jenjang}
            onChange={e => setData('id_jenjang', e.target.value)}
            className="w-full mb-2 p-2 border rounded"
          >
            <option value="">Pilih Jenjang</option>
            {jenjangList.map(j => (
              <option key={j.id} value={j.id}>
                {j.nama_jenjang}
              </option>
            ))}
          </select>
          {errors.id_jenjang && (
            <p className="text-red-500 text-sm">
              {errors.id_jenjang}
            </p>
          )}

          <select
            value={data.id_mata_pelajaran}
            onChange={e => setData('id_mata_pelajaran', e.target.value)}
            disabled={!data.id_jenjang}
            className="w-full mb-4 p-2 border rounded"
          >
            <option value="">Pilih Mata Pelajaran</option>
            {mataPelajaranList.map(mp => (
              <option key={mp.id} value={mp.id}>
                {mp.nama_pelajaran}
              </option>
            ))}
          </select>
          {errors.id_mata_pelajaran && (
            <p className="text-red-500 text-sm">
              {errors.id_mata_pelajaran}
            </p>
          )}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Batal
            </button>

            <button
              type="submit"
              disabled={processing}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {processing ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
