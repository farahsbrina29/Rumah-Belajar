import React, { useState } from "react";
import axios from "axios";

export default function AddRangkuman({ nama_submateri, onSuccess, onClose }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(null); // Clear error when file is selected
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Pilih file terlebih dahulu");
      return;
    }

    const formData = new FormData();
    formData.append("file_rangkuman", file);

    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      // Try different possible API endpoints
      const possibleEndpoints = [
        `http://127.0.0.1:8000/api/submateri/${nama_submateri}/rangkuman`,
        `http://127.0.0.1:8000/submateri/${nama_submateri}/rangkuman`,
        `/api/submateri/${nama_ubmateri}/rangkuman`,
        `/submateri/${nama_submateri}/rangkuman`
      ];

      // Use the same base URL pattern as your other API calls
      const baseUrl = window.location.origin; // or use your API base URL
      const endpoint = `/api/submateri/${encodeURIComponent(namaSubmateri)}/rangkuman`;
      
      console.log('Attempting to upload to:', endpoint);
      console.log('Submateri name:', namaSubmateri);
      
      const res = await axios.post(
        endpoint,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Rangkuman berhasil diupload ✅");
      
      // Reset form
      setFile(null);
      
      // Call success callback
      if (onSuccess) onSuccess(res.data);
    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.message || "Gagal upload rangkuman";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pilih File Rangkuman
          </label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          {file && (
            <p className="text-sm text-gray-600 mt-1">
              File dipilih: {file.name}
            </p>
          )}
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="flex gap-3 justify-end">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 disabled:opacity-50"
            >
              Batal
            </button>
          )}
          <button
            type="submit"
            disabled={loading || !file}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Uploading..." : "Upload Rangkuman"}
          </button>
        </div>
      </form>
    </div>
  );
}