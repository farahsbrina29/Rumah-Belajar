import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddSubmateri = ({ onClose, fetchData }) => {
  const [submateri, setSubmateri] = useState('');
  const [jenjang, setJenjang] = useState('');
  const [mataPelajaran, setMataPelajaran] = useState('');
  const [jenjangList, setJenjangList] = useState([]);
  const [mataPelajaranList, setMataPelajaranList] = useState([]);
  const [loading, setLoading] = useState(false);

 
  useEffect(() => {
    axios.get('/api/jenjang')
      .then(res => {
        setJenjangList(Array.isArray(res.data) ? res.data : []);
      })
      .catch(err => {
        console.error('Gagal mengambil jenjang:', err);
      });
  }, []);

  
  useEffect(() => {
    if (!jenjang) {
      setMataPelajaranList([]);
      setMataPelajaran('');
      return;
    }

    axios.get(`/api/mata_pelajaran_jenjang/${jenjang}`)
      .then(res => {
        setMataPelajaranList(Array.isArray(res.data) ? res.data : []);
      })
      .catch(err => {
        console.error('Gagal mengambil mata pelajaran:', err);
      });
  }, [jenjang]);

  const handleSubmit = async () => {
  if (!submateri || !jenjang || !mataPelajaran) {
    toast.warning('Semua field wajib diisi');
    return;
  }

  setLoading(true);

  try {
    await axios.post('/api/add-submateri', {
      nama_submateri: submateri,
      jenjang_id: jenjang,
      mata_pelajaran_id: mataPelajaran,
    });

    toast.success('Submateri berhasil ditambahkan 🎉');

    if (typeof fetchData === 'function') {
      fetchData();
    }

    if (typeof onClose === 'function') {
      onClose();
    }

    setSubmateri('');
    setJenjang('');
    setMataPelajaran('');
  } catch (error) {
    console.error('ERROR ADD SUBMATERI:', error?.response?.data || error);
    toast.error('Gagal menambahkan submateri ❌');
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-96 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Tambah Submateri</h2>

        <div className="mb-3">
          <label className="block text-sm">Nama Submateri</label>
          <input
            value={submateri}
            onChange={e => setSubmateri(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm">Jenjang</label>
          <select
            value={jenjang}
            onChange={e => setJenjang(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Pilih Jenjang</option>
            {jenjangList.map(j => (
              <option key={j.id} value={j.id}>
                {j.nama_jenjang}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm">Mata Pelajaran</label>
          <select
            value={mataPelajaran}
            onChange={e => setMataPelajaran(e.target.value)}
            className="w-full p-2 border rounded"
            disabled={!jenjang}
          >
            <option value="">Pilih Mata Pelajaran</option>
            {mataPelajaranList.map(mp => (
              <option key={mp.id} value={mp.id}>
                {mp.nama_pelajaran}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 border rounded"
          >
            Batal
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`px-4 py-2 text-white rounded ${
              loading ? 'bg-gray-400' : 'bg-blue-600'
            }`}
          >
            {loading ? 'Menyimpan...' : 'Lanjut'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSubmateri;
