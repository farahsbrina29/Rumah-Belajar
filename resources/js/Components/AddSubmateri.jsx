import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddSubmateri = ({ onClose, fetchData }) => {
  const [submateri, setSubmateri] = useState('');
  const [jenjang, setJenjang] = useState('');
  const [mataPelajaran, setMataPelajaran] = useState('');
  const [jenjangList, setJenjangList] = useState([]);
  const [mataPelajaranList, setMataPelajaranList] = useState([]);

  useEffect(() => {
    // Ambil daftar jenjang dari API
    axios.get('/api/jenjang')
      .then(response => setJenjangList(response.data))
      .catch(error => console.error('Error fetching jenjang:', error));
  }, []);

  useEffect(() => {
    if (jenjang) {
      console.log(`Fetching mata pelajaran untuk jenjang_id: ${jenjang}`);
      axios.get(`http://localhost:8000/api/mata_pelajaran_jenjang/${jenjang}`)
        .then(response => {
          console.log("Data mata pelajaran:", response.data);
          setMataPelajaranList(response.data);
        })
        .catch(error => {
          console.error('Error fetching mata pelajaran:', error.response ? error.response.data : error.message);
        });
    } else {
      setMataPelajaranList([]);
    }
  }, [jenjang]);
  
  

  const handleSubmit = () => {
    axios.post('/api/add-submateri', {
        nama_submateri: submateri,
        jenjang_id: jenjang,
        mata_pelajaran_id: mataPelajaran,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then(() => {
        fetchData();
        onClose();
      })
      .catch(error => console.error('Error adding submateri:', error));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Tambah Submateri</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium">Submateri</label>
          <input
            type="text"
            value={submateri}
            onChange={(e) => setSubmateri(e.target.value)}
            placeholder="Masukkan submateri"
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Jenjang</label>
          <select
            value={jenjang}
            onChange={(e) => setJenjang(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Pilih Jenjang</option>
            {jenjangList.map((item) => (
              <option key={item.id} value={item.id}>{item.nama_jenjang}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Mata Pelajaran</label>
          <select
            value={mataPelajaran}
            onChange={(e) => setMataPelajaran(e.target.value)}
            className="w-full p-2 border rounded"
            disabled={!jenjang}
          >
            <option value="">Pilih Mata Pelajaran</option>
            {mataPelajaranList.map((item) => (
              <option key={item.id} value={item.id}>{item.nama_pelajaran}</option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-200"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Lanjut
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSubmateri;
