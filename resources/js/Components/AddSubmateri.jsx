import React, { useState } from 'react';

const AddSubmateri = ({ onClose, fetchData }) => {
  const [submateri, setSubmateri] = useState('');
  const [jenjang, setJenjang] = useState('');
  const [mataPelajaran, setMataPelajaran] = useState('');

  const handleSubmit = () => {
    console.log('Submateri:', submateri);
    console.log('Jenjang:', jenjang);
    console.log('Mata Pelajaran:', mataPelajaran);
    // Setelah data diproses, panggil fetchData untuk memperbarui data
    fetchData(localStorage.getItem('token'));
    onClose(); // Tutup modal setelah submit
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
            <option value="sd">SD</option>
            <option value="smp">SMP</option>
            <option value="sma">SMA</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Mata Pelajaran</label>
          <select
            value={mataPelajaran}
            onChange={(e) => setMataPelajaran(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="matematika">Matematika</option>
            <option value="bahasa">Bahasa Indonesia</option>
            <option value="ipa">IPA</option>
          </select>
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose} // Pastikan onClose dipanggil saat batal
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
