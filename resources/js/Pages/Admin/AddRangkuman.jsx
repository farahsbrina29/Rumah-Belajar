import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { ArrowLeft, FileText, Upload, Trash2, Download, X, Plus } from 'lucide-react';
import axios from 'axios';

export default function RangkumanPage({ nama_submateri }) {
  const [submateri, setSubmateri] = useState(null);
  const [rangkuman, setRangkuman] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Upload modal states
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  useEffect(() => {
    if (nama_submateri) {
      fetchRangkuman();
    }
  }, [nama_submateri]);

  const fetchRangkuman = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/submateri/${encodeURIComponent(nama_submateri)}/rangkuman`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
      
      if (data.status === 'success') {
        setSubmateri(data.submateri);
        setRangkuman(Array.isArray(data.rangkuman) ? data.rangkuman : []);
      } else {
        throw new Error(data.message || 'Gagal mengambil data');
      }
    } catch (err) {
      console.error('Error fetching rangkuman:', err);
      setError(err.message || 'Gagal memuat data rangkuman');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus rangkuman ini?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/rangkuman/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal menghapus rangkuman');
      }

      await fetchRangkuman();
      alert('Rangkuman berhasil dihapus');
    } catch (err) {
      console.error('Error deleting rangkuman:', err);
      alert('Gagal menghapus rangkuman: ' + err.message);
    }
  };

  // Upload functions
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadError(null);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setUploadError("Pilih file terlebih dahulu");
      return;
    }

    const formData = new FormData();
    formData.append("file_rangkuman", file);

    try {
      setUploading(true);
      setUploadError(null);

      const token = localStorage.getItem('token');
      const endpoint = `/api/submateri/${encodeURIComponent(nama_submateri)}/rangkuman`;
      
      console.log('Uploading to:', endpoint);

      const response = await axios.post(
        endpoint,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        }
      );

      console.log('Upload successful:', response.data);
      alert("Rangkuman berhasil diupload ✅");
      
      // Reset form
      setFile(null);
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) {
        fileInput.value = '';
      }
      
      // Close modal and refresh data
      setShowUploadModal(false);
      await fetchRangkuman();
      
    } catch (err) {
      console.error('Upload error:', err);
      
      let errorMessage = "Gagal upload rangkuman";
      
      if (err.response) {
        console.log('Error response:', err.response.data);
        errorMessage = err.response.data?.message || 
                      err.response.data?.error || 
                      `Server error: ${err.response.status}`;
      } else if (err.request) {
        errorMessage = "Tidak dapat terhubung ke server";
      } else {
        errorMessage = err.message || "Terjadi kesalahan tidak terduga";
      }
      
      setUploadError(errorMessage);
      alert(`❌ ${errorMessage}`);
    } finally {
      setUploading(false);
    }
  };

  const getFileIcon = (fileName) => {
    if (!fileName) return <FileText className="text-gray-500" size={20} />;
    
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return <FileText className="text-red-500" size={20} />;
      case 'doc':
      case 'docx':
        return <FileText className="text-blue-500" size={20} />;
      default:
        return <FileText className="text-gray-500" size={20} />;
    }
  };

  if (loading) {
    return (
      <>
        <Head title={`Rangkuman - ${nama_submateri}`} />
        <div className="min-h-screen bg-gray-50 p-8">
          <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Memuat data rangkuman...</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head title={`Rangkuman - ${nama_submateri}`} />
      
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft size={20} />
              Kembali
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Rangkuman - {submateri?.nama_submateri || nama_submateri}
              </h1>
              {submateri && (
                <p className="text-gray-600 mt-1">
                  {submateri.jenjang?.nama_jenjang} • {submateri.mata_pelajaran?.nama_pelajaran}
                </p>
              )}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              <p>{error}</p>
              <button 
                onClick={fetchRangkuman}
                className="mt-2 text-sm underline hover:no-underline"
              >
                Coba lagi
              </button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setShowUploadModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              <Plus size={18} />
              Upload Rangkuman
            </button>
          </div>

          {/* Rangkuman List */}
          <div className="space-y-4">
            {rangkuman.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 text-lg font-medium">Belum ada rangkuman</p>
                <p className="text-gray-500 mb-6">Upload rangkuman pertama untuk submateri ini</p>
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Upload Rangkuman
                </button>
              </div>
            ) : (
              <div className="grid gap-4">
                {rangkuman.map((item, index) => (
                  <div key={item.id || index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        {getFileIcon(item.file_rangkuman)}
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-800">
                            {item.file_rangkuman ? item.file_rangkuman.split('/').pop() : 'Unknown file'}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {item.created_at ? new Date(item.created_at).toLocaleDateString('id-ID', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            }) : 'Tanggal tidak tersedia'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {item.file_rangkuman && (
                          <a
                            href={`/storage/${item.file_rangkuman}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 px-3 py-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                            title="Lihat/Download"
                          >
                            <Download size={16} />
                            <span className="text-sm">Lihat</span>
                          </a>
                        )}
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="flex items-center gap-1 px-3 py-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                          title="Hapus"
                        >
                          <Trash2 size={16} />
                          <span className="text-sm">Hapus</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Upload Rangkuman</h2>
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setFile(null);
                  setUploadError(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">
              Submateri: <span className="font-semibold">{nama_submateri}</span>
            </p>
            
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pilih File Rangkuman
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={uploading}
                  required
                />
                {file && (
                  <div className="mt-2 p-2 bg-gray-50 rounded border">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">File dipilih:</span> {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Ukuran: {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Format yang didukung: PDF, DOC, DOCX (Max: 2MB)
                </p>
              </div>

              {uploadError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  <p className="text-sm">{uploadError}</p>
                </div>
              )}

              <div className="flex gap-3 justify-end pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowUploadModal(false);
                    setFile(null);
                    setUploadError(null);
                  }}
                  disabled={uploading}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 disabled:opacity-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={uploading || !file}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  {uploading && (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  )}
                  {uploading ? "Uploading..." : "Upload Rangkuman"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}