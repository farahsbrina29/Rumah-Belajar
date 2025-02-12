import React, { useState } from 'react';

const EditKonten = ({ onClose, fetchData, konten }) => {
  const [judul, setJudul] = useState(konten?.judul_konten || '');
  const [deskripsi, setDeskripsi] = useState(konten?.deskripsi || '');
  const [jenisKonten, setJenisKonten] = useState(konten?.jenis_konten || 'video');
  const [thumbnail, setThumbnail] = useState(null);
  const [linkKonten, setLinkKonten] = useState(konten?.link_konten || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleThumbnailUpload = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!judul || !deskripsi || !linkKonten) {
      alert('Semua field harus diisi!');
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('judul_konten', judul);
      formData.append('deskripsi', deskripsi);
      formData.append('jenis_konten', jenisKonten);
      formData.append('link_konten', linkKonten);
      if (thumbnail) {
        formData.append('thumbnail', thumbnail);
      }

      const response = await fetch(`/api/tabel-konten/${konten.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error('Gagal memperbarui konten');

      fetchData();
      onClose();
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Edit Konten</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium">Judul Konten</label>
          <input
            type="text"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            placeholder="Masukkan judul konten"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Deskripsi</label>
          <textarea
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            placeholder="Masukkan deskripsi"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Jenis Konten</label>
          <select
            value={jenisKonten}
            onChange={(e) => setJenisKonten(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="video">Video</option>
            <option value="lainnya">Lainnya</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Upload Thumbnail</label>
          <input type="file" onChange={handleThumbnailUpload} className="w-full p-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Link Konten</label>
          <input
            type="text"
            value={linkKonten}
            onChange={(e) => setLinkKonten(e.target.value)}
            placeholder="Masukkan link konten"
            className="w-full p-2 border rounded"
          />
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
            className={`px-4 py-2 ${isLoading ? 'bg-gray-500' : 'bg-blue-600'} text-white rounded hover:bg-blue-700`}
            disabled={isLoading}
          >
            {isLoading ? 'Mengirim...' : 'Simpan'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditKonten;