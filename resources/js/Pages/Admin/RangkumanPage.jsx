import React, { useState } from 'react';
import { Head, usePage, router, Link } from '@inertiajs/react';
import { FileText, Upload, Download, Trash2 } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import AdminNavbar from '@/Components/AdminNavbar';
import 'react-toastify/dist/ReactToastify.css';

export default function RangkumanPage() {
  const { props } = usePage();
  const { nama_submateri, submateri, rangkuman } = props;

  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  // ================= UPLOAD =================
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file) {
      toast.error('Pilih file terlebih dahulu');
      return;
    }

    setUploading(true);

    router.post(
      route('admin.rangkuman.store', nama_submateri),
      { file_rangkuman: file },
      {
        forceFormData: true,
        onSuccess: () => {
          toast.success('Rangkuman berhasil diupload');
          setFile(null);
        },
        onError: () => {
          toast.error('Gagal upload rangkuman');
        },
        onFinish: () => setUploading(false),
      }
    );
  };

  // ================= DOWNLOAD =================
  const handleDownload = () => {
    if (!rangkuman?.[0]) {
      toast.error('File rangkuman tidak tersedia');
      return;
    }

    window.location.href = route(
      'admin.rangkuman.download',
      rangkuman[0].id
    );
  };

  // ================= DELETE =================
  const handleDelete = () => {
    if (!rangkuman?.[0]) return;

    router.delete(
      route('admin.rangkuman.destroy', rangkuman[0].id),
      {
        onSuccess: () => {
          toast.success('Rangkuman berhasil dihapus');
          setIsDeleteModalOpen(false);
        },
        onError: () => {
          toast.error('Gagal menghapus rangkuman');
        },
      }
    );
  };

  return (
    <AdminNavbar>
      <Head title={`Rangkuman - ${submateri?.nama_submateri || nama_submateri}`} />

      {/* 🔹 Breadcrumbs */}
      <div className="text-sm text-blue-900 mb-6 flex items-center space-x-2">
        <Link href="/admin/konten" className="hover:underline">
          Submateri
        </Link>
        <span>›</span>
        <span className="text-gray-600">Tambah Rangkuman</span>
      </div>

      {/* 🔹 Card Section */}
      <div className="min-h-screen bg-white rounded-lg p-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium text-gray-800 mb-4">
              Unggah Rangkuman :
            </h2>

            {rangkuman && rangkuman.length > 0 ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <FileText className="text-blue-500" size={32} />
                  <span className="font-medium text-gray-800">
                    Rangkuman tersedia
                  </span>
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
                    onClick={() => setIsDeleteModalOpen(true)}
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

      {/* ================= MODAL DELETE ================= */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white w-[400px] rounded-lg p-6 shadow-xl">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">
              Yakin ingin menghapus rangkuman ini?
            </h2>

            <p className="text-sm text-gray-600 mb-6">
              Rangkuman yang dihapus tidak dapat dikembalikan.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
              >
                Batal
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} theme="light" />
    </AdminNavbar>
  );
}
