import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { toast } from 'react-toastify';

const EditKonten = ({ onClose, fetchData, konten }) => {
  const cleanValue = (val) => (val === '-' || val == null ? '' : val);

  const { data, setData, post, processing, errors } = useForm({
    judul_konten: cleanValue(konten?.judul_konten),
    deskripsi: cleanValue(konten?.deskripsi),
    jenis_konten: konten?.jenis_konten || '',
    link_konten: cleanValue(konten?.link_konten),
    thumbnail: null,
    _method: 'PUT', // 👈 method spoofing
  });

  const handleSubmit = (e) => {
  e.preventDefault();

  if (
    !data.judul_konten ||
    !data.deskripsi ||
    (data.jenis_konten !== 'lainnya' && !data.link_konten)
  ) {
    toast.warning('Semua field wajib diisi');
    return;
  }

  post(`/admin/tabel-konten/${konten.id}`, {
    forceFormData: true,
    onSuccess: () => {
      toast.success('Konten berhasil diperbarui');
      fetchData();
      onClose();
    },
    onError: () => {
      toast.error('Gagal menyimpan perubahan');
    },
  });
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Edit Konten</h2>

        <input
          value={data.judul_konten}
          onChange={(e) => setData('judul_konten', e.target.value)}
          className="w-full p-2 border rounded mb-3"
          placeholder="Judul Konten"
        />

        <textarea
          value={data.deskripsi}
          onChange={(e) => setData('deskripsi', e.target.value)}
          className="w-full p-2 border rounded mb-3"
          placeholder="Deskripsi"
        />

        <select
          value={data.jenis_konten}
          onChange={(e) => setData('jenis_konten', e.target.value)}
          className="w-full p-2 border rounded mb-3"
        >
          <option value="">Pilih jenis konten</option>
          <option value="video">Video</option>
          <option value="lainnya">Lainnya</option>
        </select>

        {data.jenis_konten !== 'lainnya' && (
          <input
            value={data.link_konten}
            onChange={(e) => setData('link_konten', e.target.value)}
            className="w-full p-2 border rounded mb-3"
            placeholder="Link Konten"
          />
        )}

        <input
          type="file"
          onChange={(e) => setData('thumbnail', e.target.files[0])}
          className="w-full p-2 border rounded mb-4"
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Batal
          </button>
          <button
            onClick={handleSubmit}
            disabled={processing}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {processing ? 'Menyimpan...' : 'Simpan'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditKonten;
