import React, { useState } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import { ArrowLeft, FileText, Upload, Download, Trash2 } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import AdminNavbar from '@/Components/AdminNavbar';
import 'react-toastify/dist/ReactToastify.css';

export default function RangkumanPage() {
  const { props } = usePage();
  const { nama_submateri, submateri, rangkuman } = props;

  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file) {
      toast.error('Pilih file terlebih dahulu');
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append('file_rangkuman', file);

    fetch(`/api/submateri/${encodeURIComponent(nama_submateri)}/rangkuman`, {
      method: 'POST',
      body: formData,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
      },
    })
      .then(async (response) => {
        if (response.ok) {
          toast.success('Rangkuman berhasil diupload');
          setFile(null);
          router.reload({ only: ['rangkuman'] });
        } else {
          const errorData = await response.json().catch(() => ({}));
          toast.error(errorData.message || ' Gagal upload rangkuman');
        }
      })
      .catch((error) => {
        console.error('Upload error:', error);
        toast.error('Terjadi kesalahan saat upload');
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const handleDownload = async () => {
    if (!rangkuman?.[0]?.file_rangkuman) {
      toast.error('File rangkuman tidak tersedia');
      return;
    }

    const fileName = rangkuman[0].file_rangkuman.split('/').pop();
    const fileUrl = `/storage/${rangkuman[0].file_rangkuman}`;
    
    try {
      await downloadViaEndpoint(rangkuman[0].id, fileName);
    } catch {
      try {
        await downloadViaFetch(fileUrl, fileName);
      } catch {
        downloadViaNewTab(fileUrl);
      }
    }
  };

  const downloadViaEndpoint = async (rangkumanId, fileName) => {
    const response = await fetch(`/api/rangkuman/${rangkumanId}/download`, {
      method: 'GET',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
      },
    });

    if (!response.ok) throw new Error('Endpoint download tidak tersedia');

    const blob = await response.blob();
    downloadBlob(blob, fileName);
    toast.success('File berhasil didownload');
  };

  const downloadViaFetch = async (fileUrl, fileName) => {
    const response = await fetch(fileUrl);
    if (!response.ok) throw new Error('File tidak dapat diakses');

    const blob = await response.blob();
    downloadBlob(blob, fileName);
    toast.success('File berhasil didownload');
  };

  const downloadViaNewTab = (fileUrl) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.target = '_blank';
    link.download = '';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.info('📄 File dibuka/didownload di tab baru');
  };

  const downloadBlob = (blob, fileName) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const showDeleteConfirmation = () => {
    if (!rangkuman?.[0]) return;

    const confirmDelete = () => {
      toast.dismiss();
      fetch(`/api/rangkuman/${rangkuman[0].id}`, {
        method: 'DELETE',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
          'Content-Type': 'application/json',
        },
      })
        .then(async (response) => {
          if (response.ok) {
            toast.success('Rangkuman berhasil dihapus');
            router.reload({ only: ['rangkuman'] });
          } else {
            const errorData = await response.json().catch(() => ({}));
            toast.error(errorData.message || 'Gagal menghapus rangkuman');
          }
        })
        .catch((error) => {
          console.error('Delete error:', error);
          toast.error('Terjadi kesalahan saat menghapus');
        });
    };

    const cancelDelete = () => toast.dismiss();

    toast.warning(
      <div className="space-y-3">
        <p className="font-medium text-gray-800">Konfirmasi Hapus</p>
        <p className="text-sm text-gray-600">
          Apakah Anda yakin ingin menghapus rangkuman ini? Tindakan ini tidak dapat dibatalkan.
        </p>
        <div className="flex gap-2 pt-2">
          <button
            onClick={confirmDelete}
            className="px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors font-medium"
          >
            Ya, Hapus
          </button>
          <button
            onClick={cancelDelete}
            className="px-4 py-2 bg-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-400 transition-colors font-medium"
          >
            Batal
          </button>
        </div>
      </div>,
      { autoClose: false, closeOnClick: false, draggable: false, position: 'top-center' }
    );
  };

  return (
    <AdminNavbar>
      <Head title={`Rangkuman - ${submateri?.nama_submateri || nama_submateri}`} />

      <div className="min-h-screen bg-white rounded-lg p-8">
        {/* Header langsung ke kiri */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => window.history.back()}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Tambah Rangkuman</h1>
            <p className="text-gray-600 text-sm mt-1">
              {submateri?.nama_submateri || nama_submateri.replace(/-/g, ' ')}
            </p>
          </div>
        </div>

        {/* Rangkuman Section */}
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium text-gray-800 mb-4">Unggah Rangkuman :</h2>

            {rangkuman && rangkuman.length > 0 ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <FileText className="text-blue-500" size={32} />
                  <span className="font-medium text-gray-800">Rangkuman tersedia</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  File: {rangkuman[0].file_rangkuman?.split('/').pop()}
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Download size={16} />
                    Download
                  </button>
                  <button
                    onClick={showDeleteConfirmation}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Trash2 size={16} />
                    Hapus
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto text-gray-400 mb-3" size={32} />
                  <p className="text-gray-600 text-sm mb-4">
                    {file ? file.name : 'Tidak ada file yang diunggah'}
                  </p>

                  <label className="cursor-pointer">
                    <span className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-block">
                      Pilih File
                    </span>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                      required
                    />
                  </label>

                  <p className="text-xs text-gray-500 mt-3">
                    Format: PDF, DOC, DOCX | Maksimal: 2MB
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={uploading || !file}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  {uploading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      Mengupload...
                    </>
                  ) : (
                    <>
                      <Upload size={16} />
                      Upload Rangkuman
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName="shadow-lg"
      />
    </AdminNavbar>
  );
}
