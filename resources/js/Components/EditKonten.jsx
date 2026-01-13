import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditKonten = ({ onClose, fetchData, konten }) => {
  // 🔹 helper untuk membersihkan nilai "-" dari backend
  const cleanValue = (val) => (val === '-' || val == null ? '' : val);

  const [judul, setJudul] = useState(cleanValue(konten?.judul_konten));
  const [deskripsi, setDeskripsi] = useState(cleanValue(konten?.deskripsi));
  const [jenisKonten, setJenisKonten] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [linkKonten, setLinkKonten] = useState(cleanValue(konten?.link_konten));
  const [isLoading, setIsLoading] = useState(false);

  const handleThumbnailUpload = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleJenisChange = (e) => {
    const value = e.target.value;
    setJenisKonten(value);

    if (value === 'lainnya') {
      setLinkKonten('');
    }
  };

  const handleSubmit = async () => {
    if (!judul || !deskripsi || (jenisKonten !== 'lainnya' && !linkKonten)) {
      toast.warning('Semua field wajib diisi');
      return;
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();

      formData.append('_method', 'PUT');
      formData.append('judul_konten', judul);
      formData.append('deskripsi', deskripsi);
      formData.append('jenis_konten', jenisKonten);
      formData.append(
        'link_konten',
        jenisKonten === 'lainnya' ? '-' : linkKonten
      );

      if (thumbnail) {
        formData.append('thumbnail', thumbnail);
      }

      const response = await axios.post(
        `/api/tabel-konten/${konten.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status !== 200) {
        throw new Error('Gagal memperbarui konten');
      }

      toast.success('Konten berhasil diperbarui');

      fetchData();
      onClose();
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Terjadi kesalahan saat menyimpan'
      );
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
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Deskripsi</label>
          <textarea
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Jenis Konten</label>
          <select
            value={jenisKonten}
            onChange={handleJenisChange}
            className="w-full p-2 border rounded"
          >
            <option value="" disabled>
              Pilih jenis konten
            </option>
            <option value="video">Video</option>
            <option value="lainnya">Lainnya</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Upload Thumbnail</label>
          <input
            type="file"
            onChange={handleThumbnailUpload}
            className="w-full p-2 border rounded"
          />
        </div>

        {jenisKonten !== 'lainnya' && (
          <div className="mb-4">
            <label className="block text-sm font-medium">Link Konten</label>
            <input
              type="text"
              value={linkKonten}
              onChange={(e) => setLinkKonten(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        )}

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Batal
          </button>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`px-4 py-2 text-white rounded ${
              isLoading ? 'bg-gray-500' : 'bg-blue-600'
            }`}
          >
            {isLoading ? 'Menyimpan...' : 'Simpan'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditKonten;
